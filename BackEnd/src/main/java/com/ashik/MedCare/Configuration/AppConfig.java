package com.ashik.MedCare.Configuration;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class AppConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.sessionManagement((sessionManage)->
                sessionManage.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                        .authorizeHttpRequests((authReq)->
                                authReq.requestMatchers("/api/protect/**").authenticated()
                                        .anyRequest().permitAll())
                                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
                                        .csrf(AbstractHttpConfigurer::disable)
                                                .cors((cor)->cor.configurationSource(
                                                        new CorsConfigurationSource() {
                                                            @Override
                                                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                                                                CorsConfiguration cfg = new CorsConfiguration();
                                                                cfg.setAllowedOrigins(
                                                                        List.of("http://localhost:3000/","*","https://medcare-testing.netlify.app/")
                                                                );

//                                                                cfg.setAllowedOrigins(Collections.singletonList("*"));

                                                                cfg.setAllowedMethods(Collections.singletonList("*"));
                                                                cfg.setAllowCredentials(true);
                                                                cfg.setAllowedHeaders(Collections.singletonList("*"));
                                                                cfg.setExposedHeaders(List.of("Authorization"));
                                                                cfg.setMaxAge(3600L);


                                                                return cfg;
                                                            }
                                                        }
                                                ))
        ;



       return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return  new BCryptPasswordEncoder();
    }

}
