package com.abroadguide.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UniversityRequest {

    @NotBlank(message = "University name is required")
    private String name;

    @NotBlank(message = "Country is required")
    private String country;

    private String city;
    private String description;
    private Integer ranking;
    private String type;
    private String websiteUrl;
    private Double acceptanceRate;
    private Double averageTuitionUsd;
    private Double averageLivingCostUsd;
    private String programsOffered;
    private String languageOfInstruction;
    private String applicationDeadline;
    private String requirements;
    private String contactEmail;
    private String logoUrl;
}
