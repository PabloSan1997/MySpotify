package com.myspotify.project.server.services.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.myspotify.project.server.security.dto.UserSecurity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service
public class JwtService {

    @Value("${secret.key.jwt}")
    private String secretkey;

    public String generateToken(UserSecurity userSecurity) throws JsonProcessingException {
        List<String> authoritiesname = userSecurity.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
        String authoritiesJson = new ObjectMapper().writeValueAsString(authoritiesname);
        Claims claims = Jwts.claims()
                .add("nickname", userSecurity.getUsername())
                .add("username", userSecurity.getUsername())
                .add("authorities", authoritiesJson)
                .build();
        return Jwts.builder().signWith(getKey())
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .subject(userSecurity.getUsername())
                .issuedAt(new Date())
                .claims(claims).compact();
    }

    public UserSecurity validationToken(String token) throws JsonProcessingException {
        Claims claims = Jwts.parser().verifyWith(getKey()).build()
                .parseSignedClaims(token).getPayload();

        String username = claims.getSubject();
        String nickname = (String) claims.get("nickname");
        List<String> authoritiesName = List.of(
                new ObjectMapper().readValue(claims.get("authorities").toString(), String[].class)
        );
        Collection<? extends GrantedAuthority> authorities = authoritiesName.stream()
                .map(SimpleGrantedAuthority::new).toList();

        var usersecurity = new UserSecurity();
        usersecurity.setNickname(nickname);
        usersecurity.setEnabled(true);
        usersecurity.setAuthorities(authorities);
        usersecurity.setUsername(username);

        return usersecurity;
    }

    private SecretKey getKey(){
        byte[] key = Decoders.BASE64URL.decode(secretkey);
        return Keys.hmacShaKeyFor(key);
    }
}
