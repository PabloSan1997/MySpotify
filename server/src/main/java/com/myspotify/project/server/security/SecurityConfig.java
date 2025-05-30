package com.myspotify.project.server.security;

import com.myspotify.project.server.security.filter.JwtValidationFilter;
import com.myspotify.project.server.services.utils.InitService;
import com.myspotify.project.server.services.utils.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, JwtService jwtService) throws Exception{
        http.csrf(c->c.disable())
                .authorizeHttpRequests(a -> a
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/user/viewadmin",
                                "/api/user/viewuserinfo"
                        ).hasRole("USER")
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/user/addimageprefile"
                        ).hasRole("USER")
                        .requestMatchers(
                            HttpMethod.POST,
                                "/api/user/login",
                                "/api/user/register"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilter(new JwtValidationFilter(authenticationManager(), jwtService))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }


    @Bean
    CommandLineRunner commandLineRunner(InitService initService){
        return args -> {
            initService.init();
        };
    }
}
