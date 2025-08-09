package com.abroadguide.authgateway.repository;

import com.abroadguide.authgateway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    // Optional: Optional<User> findByRole(String role); // Add if role-based queries are needed
}