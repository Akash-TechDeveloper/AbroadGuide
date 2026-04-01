package com.abroadguide.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AccommodationDto {
    private Long id;
    private Long universityId;
    private String universityName;
    private String name;
    private String type;
    private Double pricePerMonth;
    private String currency;
    private Double distanceToCampusKm;
    private Double safetyRating;
    private String amenities;
    private String contactInfo;
    private String imageUrl;
    private String virtualTourUrl;
    private Boolean roommateMatchingAvailable;
    private Boolean verifiedListing;
    private LocalDateTime createdAt;
}
