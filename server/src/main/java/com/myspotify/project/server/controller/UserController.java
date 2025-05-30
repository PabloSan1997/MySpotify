package com.myspotify.project.server.controller;


import com.myspotify.project.server.models.dtos.LoginDto;
import com.myspotify.project.server.models.dtos.RegisterDto;
import com.myspotify.project.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(userService.login(loginDto));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto){
        return ResponseEntity.ok(userService.register(registerDto));
    }

    @GetMapping("/viewadmin")
    public ResponseEntity<?> viewAdmin(){
        return ResponseEntity.ok(userService.viewAdmin());
    }
    @GetMapping("/viewuserinfo")
    public ResponseEntity<?> viewUserinfo(){
        return ResponseEntity.ok(userService.findUserInfo());
    }

    @PostMapping("/addimageprefile")
    public ResponseEntity<?> saveImageperfil(@RequestParam("image") MultipartFile fileimage){
        return ResponseEntity.status(201).body(userService.saveImage(fileimage));
    }
}
