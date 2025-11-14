package com.whereismybus.backend.services;

import com.whereismybus.backend.dto.request.LoginRequest;
import com.whereismybus.backend.dto.request.RegisterRequest;
import com.whereismybus.backend.dto.response.AuthResponse;
import com.whereismybus.backend.exceptions.BadRequestException;
import com.whereismybus.backend.exceptions.UnauthorizedException;
import com.whereismybus.backend.models.User;
import com.whereismybus.backend.repositories.UserRepository;
import com.whereismybus.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        user.setTrustScore(100);
        user.setIsActive(true);

        User savedUser = userRepository.save(user);

        // Generate tokens
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(savedUser.getEmail());

        return new AuthResponse(
                token,
                refreshToken,
                savedUser.getEmail(),
                savedUser.getName(),
                savedUser.getRole().name(),
                savedUser.getId()
        );
    }

    public AuthResponse login(LoginRequest request) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Get user details
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

            // Check if user is active
            if (!user.getIsActive()) {
                throw new UnauthorizedException("Account is disabled");
            }

            // Generate tokens
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

            return new AuthResponse(
                    token,
                    refreshToken,
                    user.getEmail(),
                    user.getName(),
                    user.getRole().name(),
                    user.getId()
            );

        } catch (Exception e) {
            throw new UnauthorizedException("Invalid email or password");
        }
    }
}
