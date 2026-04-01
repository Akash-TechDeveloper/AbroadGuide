package com.abroadguide.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DiningDto {
    private Long id;
    private Long universityId;
    private String universityName;
    private String name;
    private String type;
    private Double averageCost;
    private String currency;
    private String description;
    private Double distanceToCampusKm;
    private Double rating;
    private Boolean studentDiscount;
    private LocalDateTime createdAt;
}
