package com.myspotify.project.server.services.imp;

import com.myspotify.project.server.exceptions.MyBadRequestException;
import com.myspotify.project.server.models.Roles;
import com.myspotify.project.server.models.Users;
import com.myspotify.project.server.models.dtos.*;
import com.myspotify.project.server.repositories.FireBaseRepository;
import com.myspotify.project.server.repositories.RoleRepository;
import com.myspotify.project.server.repositories.UserRepository;
import com.myspotify.project.server.security.dto.UserSecurity;
import com.myspotify.project.server.services.UserService;
import com.myspotify.project.server.services.utils.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.prefs.BackingStoreException;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private FireBaseRepository fireBaseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @Override
    @Transactional
    public TokenDto login(LoginDto loginDto) {
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(username, password);

        try {
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            UserSecurity userSecurity = (UserSecurity) authentication.getPrincipal();
            String token = jwtService.generateToken(userSecurity);
            return new TokenDto(token);
        } catch (Exception ingore) {
            throw new MyBadRequestException("Username o password incorrectos");
        }
    }

    @Override
    @Transactional
    public TokenDto register(RegisterDto registerDto) {
        if (userRepository.findByUsername(registerDto.getUsername()).isPresent())
            throw new MyBadRequestException("Username ocupado");
        String username = registerDto.getUsername();
        String password = passwordEncoder.encode(registerDto.getPassword());
        String nickname = registerDto.getNickname();

        Roles roles = roleRepository.findByName("USER").orElseThrow(RuntimeException::new);


        Users newuser = Users.builder()
                .nickname(nickname).password(password)
                .urlImage("")
                .roles(List.of(roles))
                .username(username).build();
        Users saveuser = userRepository.save(newuser);
        var logindto = LoginDto.builder()
                .username(saveuser.getUsername()).password(registerDto.getPassword()).build();
        return login(logindto);
    }

    @Override
    @Transactional
    public ViewUserInfo findUserInfo() {
        Users users = getAuthenticationUser();

        return ViewUserInfo.builder().nickname(users.getNickname())
                .username(users.getUsername())
                .urlImage(users.getUrlImage()).build();
    }

    @Override
    @Transactional
    public ViewAdmin viewAdmin() {
        List<Roles> roles = getAuthenticationUser().getRoles();
        Optional<Roles> viewrole = roles.stream().filter(r -> r.getName().equals("ADMIN")).findFirst();
        return new ViewAdmin(viewrole.isPresent());
    }

    @Override
    @Transactional
    public ViewUserInfo saveImage(MultipartFile imagefile) {
        Users users = getAuthenticationUser();
        fireBaseRepository.deleteFile(users.getImagefilename(), false);
        try{
            FileDto fileDto = fireBaseRepository.saveFile(imagefile, false);
            users.setUrlImage(fileDto.getUrlfile());
            users.setImagefilename(fileDto.getIdfirebase());
            return findUserInfo();
        }catch (Exception e){
            throw new MyBadRequestException(e.getMessage());
        }
    }

    private Users getAuthenticationUser() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("No existe usuario registrado"));
    }
}
