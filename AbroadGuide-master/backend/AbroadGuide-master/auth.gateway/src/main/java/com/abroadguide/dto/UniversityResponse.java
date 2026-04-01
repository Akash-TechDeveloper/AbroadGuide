package com.abroadguide.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UniversityResponse {
    private Long id;
    private String name;
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
    private Double estimatedYearlyCost; // tuition + living cost
    private LocalDateTime createdAt;
}
