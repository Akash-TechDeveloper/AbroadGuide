package com.abroadguide.service;

import com.abroadguide.dto.StudentRequest;
import com.abroadguide.dto.StudentResponse;
import com.abroadguide.model.Student;
import com.abroadguide.model.User;
import com.abroadguide.repository.StudentRepository;
import com.abroadguide.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public StudentResponse createStudent(Long userId, StudentRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (studentRepository.findByUserId(userId).isPresent()) {
            throw new RuntimeException("Student profile already exists for this user");
        }

        if (studentRepository.existsByStudentId(request.getStudentId())) {
            throw new RuntimeException("Student ID already exists");
        }

        Student student = Student.builder()
                .user(user)
                .studentId(request.getStudentId())
                .dateOfBirth(request.getDateOfBirth())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .enrollmentYear(request.getEnrollmentYear())
                .major(request.getMajor())
                .totalBudget(request.getTotalBudget())
                .build();

        student = studentRepository.save(student);
        return mapToStudentResponse(student);
    }

    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        // Check access permissions
        checkStudentAccess(student);

        return mapToStudentResponse(student);
    }

    public StudentResponse getStudentByUserId(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found for user id: " + userId));

        checkStudentAccess(student);

        return mapToStudentResponse(student);
    }

    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapToStudentResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        checkStudentAccess(student);

        // Update fields
        if (request.getStudentId() != null) {
            student.setStudentId(request.getStudentId());
        }
        if (request.getDateOfBirth() != null) {
            student.setDateOfBirth(request.getDateOfBirth());
        }
        if (request.getPhoneNumber() != null) {
            student.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getAddress() != null) {
            student.setAddress(request.getAddress());
        }
        if (request.getEnrollmentYear() != null) {
            student.setEnrollmentYear(request.getEnrollmentYear());
        }
        if (request.getMajor() != null) {
            student.setMajor(request.getMajor());
        }
        if (request.getTotalBudget() != null) {
            student.setTotalBudget(request.getTotalBudget());
        }

        student = studentRepository.save(student);
        return mapToStudentResponse(student);
    }

    @Transactional
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    public Map<String, Double> calculateBudgetAllocation(Double totalBudget) {
        Map<String, Double> allocation = new HashMap<>();
        allocation.put("rent", totalBudget * 0.40);
        allocation.put("food", totalBudget * 0.20);
        allocation.put("transport", totalBudget * 0.10);
        allocation.put("utilities", totalBudget * 0.10);
        allocation.put("miscellaneous", totalBudget * 0.20);
        return allocation;
    }

    private void checkStudentAccess(Student student) {
        User currentUser = userService.getCurrentUser();

        // Admin can access all
        if (currentUser.getRole().name().equals("ADMIN")) {
            return;
        }

        // Student can only access their own profile
        if (currentUser.getRole().name().equals("STUDENT")) {
            if (!student.getUser().getId().equals(currentUser.getId())) {
                throw new AccessDeniedException("You can only access your own student profile");
            }
        }
    }

    private StudentResponse mapToStudentResponse(Student student) {
        StudentResponse response = StudentResponse.builder()
                .id(student.getId())
                .studentId(student.getStudentId())
                .email(student.getEmail())
                .fullName(student.getFullName())
                .dateOfBirth(student.getDateOfBirth())
                .phoneNumber(student.getPhoneNumber())
                .address(student.getAddress())
                .enrollmentYear(student.getEnrollmentYear())
                .major(student.getMajor())
                .totalBudget(student.getTotalBudget())
                .build();

        if (student.getTotalBudget() != null) {
            response.setBudgetAllocation(calculateBudgetAllocation(student.getTotalBudget()));
        }

        return response;
    }
}