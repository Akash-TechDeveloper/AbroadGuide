package com.abroadguide.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "universities")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 100)
    private String country;

    @Column(length = 100)
    private String city;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "world_ranking")
    private Integer ranking;

    @Column(length = 20)
    private String type; // PUBLIC, PRIVATE

    @Column(name = "website_url", length = 300)
    private String websiteUrl;

    @Column(name = "acceptance_rate")
    private Double acceptanceRate;

    @Column(name = "average_tuition_usd")
    private Double averageTuitionUsd;

    @Column(name = "average_living_cost_usd")
    private Double averageLivingCostUsd;

    @Column(name = "programs_offered", columnDefinition = "TEXT")
    private String programsOffered;

    @Column(name = "language_of_instruction", length = 50)
    private String languageOfInstruction;

    @Column(name = "application_deadline", length = 100)
    private String applicationDeadline;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(name = "contact_email", length = 150)
    private String contactEmail;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
