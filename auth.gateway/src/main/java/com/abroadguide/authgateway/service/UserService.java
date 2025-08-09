package com.abroadguide.authgateway.service;

import com.abroadguide.authgateway.model.User;
import com.abroadguide.authgateway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User updateUserRole(String email, String role) {
        User user = getUserByEmail(email);
        if (user != null) {
            user.setRole(role);
            return userRepository.save(user);
        }
        return null;
    }
}