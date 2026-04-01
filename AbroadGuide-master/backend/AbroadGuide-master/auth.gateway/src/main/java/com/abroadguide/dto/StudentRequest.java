package com.abroadguide.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class StudentRequest {

    @NotBlank(message = "Student ID is required")
    private String studentId;

    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String address;
    private Integer enrollmentYear;
    private String major;
    private Double totalBudget;

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