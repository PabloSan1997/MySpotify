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
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
                .authorizeHttpRequests(getMatcherRegistryCustomizer())
                .addFilter(new JwtValidationFilter(authenticationManager(), jwtService))
                .cors(c -> c.configurationSource(corsConfigurationSource()))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    CommandLineRunner commandLineRunner(InitService initService){
        return args -> {
            initService.init();
        };
    }


    private static Customizer<AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry> getMatcherRegistryCustomizer() {
        return a -> a
                .requestMatchers(
                        HttpMethod.GET,
                        "/api/user/viewadmin",
                        "/api/user/viewuserinfo",
                        "/api/category",
                        "/api/category/**",
                        "/api/artist",
                        "/api/artist/**",
                        "/api/album",
                        "/api/album/**",
                        "/api/search/**",
                        "/api/search"
                ).hasRole("USER")
                .requestMatchers(
                        HttpMethod.POST,
                        "/api/user/addimageprefile"
                ).hasRole("USER")
                .requestMatchers(
                        HttpMethod.POST,
                        "/api/category",
                        "/api/artist"
                ).hasRole("ADMIN")
                .requestMatchers(
                        HttpMethod.DELETE,
                        "/api/category/{id}",
                        "/api/artist/{id}",
                        "/api/album/{id}",
                        "/api/album/song/{idalbum}"
                ).hasRole("ADMIN")
                .requestMatchers(
                        HttpMethod.POST,
                        "/api/user/login",
                        "/api/user/register"
                ).permitAll()
                .requestMatchers(
                        "/", "index.html", "/assets", "/assets/**", "myspotilogo.svg"
                ).permitAll()
                .anyRequest().authenticated();
    }

}
