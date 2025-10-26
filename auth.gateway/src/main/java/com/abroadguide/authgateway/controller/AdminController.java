package com.abroadguide.authgateway.controller;

import com.abroadguide.authgateway.model.Admin;
import com.abroadguide.authgateway.model.Student;
import com.abroadguide.authgateway.service.AdminService;
import com.abroadguide.authgateway.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private AdminService adminService;
    @Autowired private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<Admin> register(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.saveAdmin(admin));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> creds) {
        String token = adminService.authenticate(creds.get("email"), creds.get("password"));
        return ResponseEntity.ok(Map.of("token", "Bearer " + token));
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        student.setId(id);
        return ResponseEntity.ok(studentService.saveStudent(student));
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/students/routes")
    public ResponseEntity<String> addRoute(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok("Route added: " + payload.get("route"));
    }
}