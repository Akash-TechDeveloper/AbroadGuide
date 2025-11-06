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
}