package com.example.erp.mini_erp_autonomos.config;

import com.example.erp.mini_erp_autonomos.model.Usuario;
import com.example.erp.mini_erp_autonomos.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initUsuarios(UsuarioRepository usuarioRepository, PasswordEncoder encoder) {
        return args -> {
            if (usuarioRepository.count() == 0) {
                Usuario admin = new Usuario(
                        "admin",
                        encoder.encode("admin123"),
                        "ROLE_ADMIN"
                );
                usuarioRepository.save(admin);
            }
        };
    }
}

