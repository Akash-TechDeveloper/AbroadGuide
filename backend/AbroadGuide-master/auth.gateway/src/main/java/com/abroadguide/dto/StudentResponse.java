package com.abroadguide.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.Map;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StudentResponse {
    private Long id;
    private String studentId;
    private String email;
    private String fullName;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String address;
    private Integer enrollmentYear;
    private String major;
    private Double totalBudget;
    private Map<String, Double> budgetAllocation;
}