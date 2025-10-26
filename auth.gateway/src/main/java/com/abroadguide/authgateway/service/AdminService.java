package com.abroadguide.authgateway.service;

import com.abroadguide.authgateway.model.Admin;
import com.abroadguide.authgateway.repository.AdminRepository;
import com.abroadguide.authgateway.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired private AdminRepository adminRepository;
    @Autowired private BCryptPasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    public Admin saveAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public String authenticate(String email, String rawPassword) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new SecurityException("Invalid credentials"));
        if (!passwordEncoder.matches(rawPassword, admin.getPassword())) {
            throw new SecurityException("Invalid credentials");
        }
        return jwtUtil.generateToken(admin);
    }
}