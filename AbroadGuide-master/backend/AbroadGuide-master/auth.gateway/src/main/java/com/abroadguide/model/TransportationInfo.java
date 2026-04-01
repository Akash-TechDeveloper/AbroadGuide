package com.abroadguide.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "transportation_info")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TransportationInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id", nullable = false)
    private University university;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(name = "monthly_pass_cost")
    private Double monthlyPassCost;

    @Column(length = 10)
    private String currency;

    @Column(name = "student_discount_available")
    private Boolean studentDiscountAvailable;

    @Column(name = "student_discount_percentage")
    private Double studentDiscountPercentage;

    @Column(name = "transit_types", length = 300)
    private String transitTypes; // e.g., "Bus, Subway, Tram"

    @Column(name = "bike_sharing_info", columnDefinition = "TEXT")
    private String bikeSharingInfo;

    @Column(name = "airport_pickup_info", columnDefinition = "TEXT")
    private String airportPickupInfo;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
