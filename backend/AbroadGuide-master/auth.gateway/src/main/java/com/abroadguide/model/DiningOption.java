package com.abroadguide.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "dining_options")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DiningOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id", nullable = false)
    private University university;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 50)
    private String type; // HALAL, VEGAN, KOSHER, MEAL_PLAN, GROCERY, GENERAL

    @Column(name = "average_cost")
    private Double averageCost;

    @Column(length = 10)
    private String currency;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "distance_to_campus_km")
    private Double distanceToCampusKm;

    @Column
    private Double rating; // 1 to 5 scale

    @Column(name = "student_discount")
    private Boolean studentDiscount;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
