package com.abroadguide.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class BudgetRequest {

    @NotNull(message = "Total budget is required")
    @Positive(message = "Total budget must be positive")
    private Double totalBudget;

    private String currency; // defaults to USD

    // Optional custom allocations — if null, auto-calculated
    private Double tuitionAllocation;
    private Double rentAllocation;
    private Double foodAllocation;
    private Double transportAllocation;
    private Double utilitiesAllocation;
    private Double insuranceAllocation;
    private Double miscAllocation;

    private String notes;
}
