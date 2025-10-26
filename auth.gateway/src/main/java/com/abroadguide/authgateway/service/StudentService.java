package com.abroadguide.authgateway.service;

import com.abroadguide.authgateway.model.Admin;
import com.abroadguide.authgateway.model.Student;
import com.abroadguide.authgateway.repository.AdminRepository;
import com.abroadguide.authgateway.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.Map;

@Service
public class StudentService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private AdminRepository adminRepository;

    public Student saveStudent(Student student) {
        Admin admin = getAuthenticatedAdmin();
        String role = admin.getRole().name();

        if ("ADMIN".equals(role)) {
            // admin can manage any student
        } else if ("STUDENT".equals(role) && (student.getAdmin() == null ||
                !student.getAdmin().getId().equals(admin.getId()))) {
            throw new AccessDeniedException("Students can only edit own profile");
        } else if ("UNIVERSITY".equals(role) && !isUnderUserInstitution(student.getUniversityId(), admin)) {
            throw new AccessDeniedException("University can only manage own students");
        }

        if (student.getAdmin() == null) student.setAdmin(admin);
        return studentRepository.save(student);
    }

    public Student getStudentById(Long id) {
        Admin admin = getAuthenticatedAdmin();
        String role = admin.getRole().name();
        Student s = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));

        if ("ADMIN".equals(role)) {
            // admin sees everything
        } else if ("STUDENT".equals(role) && !s.getAdmin().getId().equals(admin.getId())) {
            throw new AccessDeniedException("Students can only view own profile");
        } else if ("UNIVERSITY".equals(role) && !isUnderUserInstitution(s.getUniversityId(), admin)) {
            throw new AccessDeniedException("University can only view own students");
        }
        return s;
    }

    public void deleteStudent(Long id) {
        Student s = getStudentById(id);
        studentRepository.delete(s);
    }

    private Admin getAuthenticatedAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));
    }

    private boolean isUnderUserInstitution(Long universityId, Admin admin) {
        // placeholder – implement real logic if needed
        return true;
    }

    public Map<String, Double> allocateBudget(double total) {
        Map<String, Double> map = new HashMap<>();
        map.put("rent", total * 0.40);
        map.put("food", total * 0.20);
        map.put("transport", total * 0.10);
        map.put("misc", total * 0.30);
        return map;
    }
}