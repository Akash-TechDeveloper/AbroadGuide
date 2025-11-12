package com.abroadguide.controller;

import com.abroadguide.dto.UserResponse;
import com.abroadguide.model.Role;
import com.abroadguide.service.StudentService;
import com.abroadguide.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        List<UserResponse> allUsers = userService.getAllUsers();
        dashboard.put("totalUsers", allUsers.size());
        dashboard.put("totalStudents", userService.getUsersByRole(Role.STUDENT).size());
        dashboard.put("totalAdmins", userService.getUsersByRole(Role.ADMIN).size());
        dashboard.put("recentUsers", allUsers.stream().limit(5).toList());

        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/users/stats")
    public ResponseEntity<Map<String, Long>> getUserStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", (long) userService.getAllUsers().size());
        stats.put("admins", (long) userService.getUsersByRole(Role.ADMIN).size());
        stats.put("students", (long) userService.getUsersByRole(Role.STUDENT).size());
        stats.put("regularUsers", (long) userService.getUsersByRole(Role.USER).size());
        return ResponseEntity.ok(stats);
    }
}