package com.whereismybus.backend.controllers;

import com.whereismybus.backend.dto.response.UserResponse;
import com.whereismybus.backend.models.User;
import com.whereismybus.backend.services.UserService;
import com.whereismybus.backend.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getCurrentUserProfile() {
        UserResponse response = userService.getCurrentUserProfile();
        return ResponseUtil.success(response, "Profile fetched successfully");
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DRIVER')")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Long userId) {
        UserResponse response = userService.getUserById(userId);
        return ResponseUtil.success(response, "User fetched successfully");
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseUtil.success(users, "Users fetched successfully");
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable Long userId, @RequestBody User updateData) {
        UserResponse response = userService.updateUser(userId, updateData);
        return ResponseUtil.success(response, "User updated successfully");
    }

    @PutMapping("/{userId}/trust-score")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> updateTrustScore(@PathVariable Long userId, @RequestParam Integer score) {
        UserResponse response = userService.updateTrustScore(userId, score);
        return ResponseUtil.success(response, "Trust score updated successfully");
    }
}
