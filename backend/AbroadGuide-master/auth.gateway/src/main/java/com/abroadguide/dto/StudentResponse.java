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

    // Study-abroad fields
    private String preferredCountry;
    private String preferredCity;
    private Double gpa;
    private Double testScore;
    private String testType;
    private String languageProficiency;
    private Double languageScore;
    private String programType;
    private String nationality;

    // Phase 2 Recommendation Inputs
    private Boolean researchExperience;
    private Boolean scholarshipEligibility;
    private String fundingSources;
    private String preferredCitySize;
    private String preferredClimate;
    private String preferredLanguage;
    private String preferredCampusLife;
}