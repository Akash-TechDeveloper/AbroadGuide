package com.abroadguide.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "budgets")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;

    @Column(name = "total_budget", nullable = false)
    private Double totalBudget;

    @Column(length = 10)
    private String currency; // USD, EUR, GBP, etc.

    @Column(name = "tuition_allocation")
    private Double tuitionAllocation;

    @Column(name = "rent_allocation")
    private Double rentAllocation;

    @Column(name = "food_allocation")
    private Double foodAllocation;

    @Column(name = "transport_allocation")
    private Double transportAllocation;

    @Column(name = "utilities_allocation")
    private Double utilitiesAllocation;

    @Column(name = "insurance_allocation")
    private Double insuranceAllocation;

    @Column(name = "misc_allocation")
    private Double miscAllocation;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
