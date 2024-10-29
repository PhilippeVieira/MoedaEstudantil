package com.example.MoedaEstudantil.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*"); // Permite qualquer origem
        config.addAllowedHeader("*"); // Permite qualquer header
        config.addAllowedMethod("*"); // Permite qualquer método (GET, POST, etc)
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
