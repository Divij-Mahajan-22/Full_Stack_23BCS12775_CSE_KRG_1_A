package com.whereismybus.backend.controllers;

import com.whereismybus.backend.dto.request.LoginRequest;
import com.whereismybus.backend.dto.request.RegisterRequest;
import com.whereismybus.backend.dto.response.AuthResponse;
import com.whereismybus.backend.services.AuthService;
import com.whereismybus.backend.utils.ResponseUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseUtil.created(response, "User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseUtil.success(response, "Login successful");
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> test() {
        return ResponseUtil.success("Auth service is working", "Test successful");
    }
}
