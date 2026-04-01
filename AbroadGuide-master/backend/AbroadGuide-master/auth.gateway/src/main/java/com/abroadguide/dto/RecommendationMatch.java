package com.abroadguide.dto;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecommendationMatch {
    private UniversityResponse university;
    private Double matchScore;
    private Double acceptanceProbability;
    private List<String> matchedFactors;
    private List<String> missingFactors;
    private String financialAidOpportunities;
    private String applicationTimeline;
}
