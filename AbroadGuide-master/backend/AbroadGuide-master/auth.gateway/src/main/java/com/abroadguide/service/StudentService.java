package com.abroadguide.service;

import com.abroadguide.dto.StudentRequest;
import com.abroadguide.dto.StudentResponse;
import com.abroadguide.exception.DuplicateResourceException;
import com.abroadguide.exception.ResourceNotFoundException;
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
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (studentRepository.findByUserId(userId).isPresent()) {
            throw new DuplicateResourceException("Student profile already exists for this user");
        }

        if (studentRepository.existsByStudentId(request.getStudentId())) {
            throw new DuplicateResourceException("Student", "studentId", request.getStudentId());
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
                .preferredCountry(request.getPreferredCountry())
                .preferredCity(request.getPreferredCity())
                .gpa(request.getGpa())
                .testScore(request.getTestScore())
                .testType(request.getTestType())
                .languageProficiency(request.getLanguageProficiency())
                .languageScore(request.getLanguageScore())
                .programType(request.getProgramType())
                .nationality(request.getNationality())
                .researchExperience(request.getResearchExperience())
                .scholarshipEligibility(request.getScholarshipEligibility())
                .fundingSources(request.getFundingSources())
                .preferredCitySize(request.getPreferredCitySize())
                .preferredClimate(request.getPreferredClimate())
                .preferredLanguage(request.getPreferredLanguage())
                .preferredCampusLife(request.getPreferredCampusLife())
                .build();

        student = studentRepository.save(student);
        return mapToStudentResponse(student);
    }

    /**
     * Self-registration: a student creates their own profile using their JWT identity.
     */
    @Transactional
    public StudentResponse createOwnProfile(StudentRequest request) {
        User currentUser = userService.getCurrentUser();

        if (studentRepository.findByUserId(currentUser.getId()).isPresent()) {
            throw new DuplicateResourceException("Student profile already exists for your account");
        }

        if (studentRepository.existsByStudentId(request.getStudentId())) {
            throw new DuplicateResourceException("Student", "studentId", request.getStudentId());
        }

        Student student = Student.builder()
                .user(currentUser)
                .studentId(request.getStudentId())
                .dateOfBirth(request.getDateOfBirth())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .enrollmentYear(request.getEnrollmentYear())
                .major(request.getMajor())
                .totalBudget(request.getTotalBudget())
                .preferredCountry(request.getPreferredCountry())
                .preferredCity(request.getPreferredCity())
                .gpa(request.getGpa())
                .testScore(request.getTestScore())
                .testType(request.getTestType())
                .languageProficiency(request.getLanguageProficiency())
                .languageScore(request.getLanguageScore())
                .programType(request.getProgramType())
                .nationality(request.getNationality())
                .researchExperience(request.getResearchExperience())
                .scholarshipEligibility(request.getScholarshipEligibility())
                .fundingSources(request.getFundingSources())
                .preferredCitySize(request.getPreferredCitySize())
                .preferredClimate(request.getPreferredClimate())
                .preferredLanguage(request.getPreferredLanguage())
                .preferredCampusLife(request.getPreferredCampusLife())
                .build();

        student = studentRepository.save(student);
        return mapToStudentResponse(student);
    }

    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        checkStudentAccess(student);
        return mapToStudentResponse(student);
    }

    public StudentResponse getStudentByUserId(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "userId", userId));

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
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        checkStudentAccess(student);

        if (request.getStudentId() != null) student.setStudentId(request.getStudentId());
        if (request.getDateOfBirth() != null) student.setDateOfBirth(request.getDateOfBirth());
        if (request.getPhoneNumber() != null) student.setPhoneNumber(request.getPhoneNumber());
        if (request.getAddress() != null) student.setAddress(request.getAddress());
        if (request.getEnrollmentYear() != null) student.setEnrollmentYear(request.getEnrollmentYear());
        if (request.getMajor() != null) student.setMajor(request.getMajor());
        if (request.getTotalBudget() != null) student.setTotalBudget(request.getTotalBudget());
        if (request.getPreferredCountry() != null) student.setPreferredCountry(request.getPreferredCountry());
        if (request.getPreferredCity() != null) student.setPreferredCity(request.getPreferredCity());
        if (request.getGpa() != null) student.setGpa(request.getGpa());
        if (request.getTestScore() != null) student.setTestScore(request.getTestScore());
        if (request.getTestType() != null) student.setTestType(request.getTestType());
        if (request.getLanguageProficiency() != null) student.setLanguageProficiency(request.getLanguageProficiency());
        if (request.getLanguageScore() != null) student.setLanguageScore(request.getLanguageScore());
        if (request.getProgramType() != null) student.setProgramType(request.getProgramType());
        if (request.getNationality() != null) student.setNationality(request.getNationality());
        
        // Phase 2
        if (request.getResearchExperience() != null) student.setResearchExperience(request.getResearchExperience());
        if (request.getScholarshipEligibility() != null) student.setScholarshipEligibility(request.getScholarshipEligibility());
        if (request.getFundingSources() != null) student.setFundingSources(request.getFundingSources());
        if (request.getPreferredCitySize() != null) student.setPreferredCitySize(request.getPreferredCitySize());
        if (request.getPreferredClimate() != null) student.setPreferredClimate(request.getPreferredClimate());
        if (request.getPreferredLanguage() != null) student.setPreferredLanguage(request.getPreferredLanguage());
        if (request.getPreferredCampusLife() != null) student.setPreferredCampusLife(request.getPreferredCampusLife());

        student = studentRepository.save(student);
        return mapToStudentResponse(student);
    }

    @Transactional
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student", "id", id);
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
                .preferredCountry(student.getPreferredCountry())
                .preferredCity(student.getPreferredCity())
                .gpa(student.getGpa())
                .testScore(student.getTestScore())
                .testType(student.getTestType())
                .languageProficiency(student.getLanguageProficiency())
                .languageScore(student.getLanguageScore())
                .programType(student.getProgramType())
                .nationality(student.getNationality())
                .researchExperience(student.getResearchExperience())
                .scholarshipEligibility(student.getScholarshipEligibility())
                .fundingSources(student.getFundingSources())
                .preferredCitySize(student.getPreferredCitySize())
                .preferredClimate(student.getPreferredClimate())
                .preferredLanguage(student.getPreferredLanguage())
                .preferredCampusLife(student.getPreferredCampusLife())
                .build();

        if (student.getTotalBudget() != null) {
            response.setBudgetAllocation(calculateBudgetAllocation(student.getTotalBudget()));
        }

        return response;
    }
}