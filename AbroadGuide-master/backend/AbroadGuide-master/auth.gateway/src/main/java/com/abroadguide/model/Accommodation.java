package com.abroadguide.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "accommodations")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id", nullable = false)
    private University university;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 50)
    private String type; // DORM, APARTMENT, HOMESTAY, ROOMSHARE

    @Column(name = "price_per_month", nullable = false)
    private Double pricePerMonth;

    @Column(length = 10)
    private String currency;

    @Column(name = "distance_to_campus_km")
    private Double distanceToCampusKm;

    @Column(name = "safety_rating")
    private Double safetyRating; // 1 to 5 scale

    @Column(columnDefinition = "TEXT")
    private String amenities; // comma separated list

    @Column(name = "contact_info", length = 300)
    private String contactInfo;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "virtual_tour_url", length = 500)
    private String virtualTourUrl;

    @Column(name = "roommate_matching_available")
    private Boolean roommateMatchingAvailable;

    @Column(name = "verified_listing")
    private Boolean verifiedListing;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
