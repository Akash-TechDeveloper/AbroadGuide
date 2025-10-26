package com.abroadguide.authgateway.controller;

import com.abroadguide.authgateway.model.Student;
import com.abroadguide.authgateway.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admins")
public class StudentController {

    @Autowired private StudentService studentService;

    @PostMapping
    public ResponseEntity<Student> create(@RequestBody Student s) {
        return ResponseEntity.ok(studentService.saveStudent(s));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> get(@PathVariable Long id) {
        Student s = studentService.getStudentById(id);
        return s != null ? ResponseEntity.ok(s) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @RequestBody Student s) {
        s.setId(id);
        return ResponseEntity.ok(studentService.saveStudent(s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/profile")
    public ResponseEntity<Map<String, Object>> profile(@RequestBody Student s) {
        Student saved = studentService.saveStudent(s);
        Map<String, Object> resp = new HashMap<>();
        resp.put("student", saved);
        if (saved.getTotalBudget() != null) {
            resp.put("budgetAllocation", studentService.allocateBudget(saved.getTotalBudget()));
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable Long id) {
        Student s = studentService.getStudentById(id);
        Map<String, Object> resp = new HashMap<>();
        resp.put("student", s);
        if (s.getTotalBudget() != null) {
            resp.put("budgetAllocation", studentService.allocateBudget(s.getTotalBudget()));
        }
        return ResponseEntity.ok(resp);
    }
}