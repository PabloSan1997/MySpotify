package com.myspotify.project.server.services;


import com.myspotify.project.server.models.dtos.*;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    TokenDto login(LoginDto loginDto);
    TokenDto register(RegisterDto registerDto);
    ViewUserInfo findUserInfo();
    ViewAdmin viewAdmin();
    ViewUserInfo saveImage(MultipartFile imagefile);
}
