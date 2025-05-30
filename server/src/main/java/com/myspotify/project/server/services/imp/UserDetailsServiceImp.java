package com.myspotify.project.server.services.imp;

import com.myspotify.project.server.models.Users;
import com.myspotify.project.server.repositories.UserRepository;
import com.myspotify.project.server.security.dto.UserSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class UserDetailsServiceImp implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException(""));
        UserSecurity userSecurity = new UserSecurity();
        Collection<? extends GrantedAuthority> authorities = users.getRoles().stream()
                .map(p -> new SimpleGrantedAuthority("ROLE_"+p.getName())).toList();

        userSecurity.setUsername(username);
        userSecurity.setAuthorities(authorities);
        userSecurity.setEnabled(true);
        userSecurity.setPassword(users.getPassword());
        userSecurity.setNickname(users.getNickname());

        return userSecurity;
    }
}
