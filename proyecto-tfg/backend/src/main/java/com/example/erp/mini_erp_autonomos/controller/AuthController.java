package com.example.erp.mini_erp_autonomos.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public Authentication me(Authentication auth) {
        return auth;
    }
}
