package com.abroadguide.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BudgetResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private Double totalBudget;
    private String currency;
    private Double tuitionAllocation;
    private Double rentAllocation;
    private Double foodAllocation;
    private Double transportAllocation;
    private Double utilitiesAllocation;
    private Double insuranceAllocation;
    private Double miscAllocation;
    private Double totalAllocated;
    private Double remaining;
    private String notes;
    private Map<String, String> suggestions;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
