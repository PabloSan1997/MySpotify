package com.myspotify.project.server.security.filter;


import com.myspotify.project.server.security.dto.UserSecurity;
import com.myspotify.project.server.services.utils.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    private final JwtService jwtService;

    public JwtValidationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        super(authenticationManager);
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader("Authorization");
        if(header == null || !header.startsWith("Bearer ")){
            chain.doFilter(request, response);
            return;
        }

        String token = header.replace("Bearer ", "");

        try{
            UserSecurity userSecurity = jwtService.validationToken(token);
            Authentication authenticationToken = new UsernamePasswordAuthenticationToken(
                    userSecurity.getUsername(),
                    null,
                    userSecurity.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }catch (Exception ingore){}
        chain.doFilter(request, response);
    }
}
