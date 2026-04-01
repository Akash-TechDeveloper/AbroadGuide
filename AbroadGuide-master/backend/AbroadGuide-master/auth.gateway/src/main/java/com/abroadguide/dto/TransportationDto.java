package com.abroadguide.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TransportationDto {
    private Long id;
    private Long universityId;
    private String universityName;
    private String city;
    private Double monthlyPassCost;
    private String currency;
    private Boolean studentDiscountAvailable;
    private Double studentDiscountPercentage;
    private Double estimatedStudentCost; // Calculated field
    private String transitTypes;
    private String bikeSharingInfo;
    private String airportPickupInfo;
    private LocalDateTime createdAt;
}
