package com.whereismybus.backend.services;

import com.whereismybus.backend.dto.response.UserResponse;
import com.whereismybus.backend.exceptions.ResourceNotFoundException;
import com.whereismybus.backend.models.User;
import com.whereismybus.backend.repositories.UserRepository;
import com.whereismybus.backend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse getCurrentUserProfile() {
        User user = SecurityUtils.getCurrentUser();
        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }
        return mapToResponse(user);
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return mapToResponse(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public UserResponse updateUser(Long userId, User updateData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (updateData.getName() != null) user.setName(updateData.getName());
        if (updateData.getPhone() != null) user.setPhone(updateData.getPhone());
        if (updateData.getProfileImage() != null) user.setProfileImage(updateData.getProfileImage());

        User updated = userRepository.save(user);
        return mapToResponse(updated);
    }

    public UserResponse updateTrustScore(Long userId, Integer score) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setTrustScore(score);
        User updated = userRepository.save(user);
        return mapToResponse(updated);
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getPhone(),
                user.getRole().name(),
                user.getTrustScore(),
                user.getIsActive(),
                user.getProfileImage()
        );
    }
}
