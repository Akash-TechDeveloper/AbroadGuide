package com.abroadguide.service;

import com.abroadguide.dto.TransportationDto;
import com.abroadguide.exception.ResourceNotFoundException;
import com.abroadguide.model.TransportationInfo;
import com.abroadguide.model.University;
import com.abroadguide.repository.TransportationRepository;
import com.abroadguide.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransportationService {

    @Autowired
    private TransportationRepository transportationRepository;

    @Autowired
    private UniversityRepository universityRepository;

    public TransportationDto createInfo(Long universityId, TransportationDto request) {
        University uni = universityRepository.findById(universityId)
                .orElseThrow(() -> new ResourceNotFoundException("University", "id", universityId));

        TransportationInfo info = TransportationInfo.builder()
                .university(uni)
                .city(request.getCity() != null ? request.getCity() : uni.getCity())
                .monthlyPassCost(request.getMonthlyPassCost())
                .currency(request.getCurrency())
                .studentDiscountAvailable(request.getStudentDiscountAvailable())
                .studentDiscountPercentage(request.getStudentDiscountPercentage())
                .transitTypes(request.getTransitTypes())
                .bikeSharingInfo(request.getBikeSharingInfo())
                .airportPickupInfo(request.getAirportPickupInfo())
                .build();

        info = transportationRepository.save(info);
        return mapToDto(info);
    }

    public TransportationDto getByUniversity(Long universityId) {
        TransportationInfo info = transportationRepository.findByUniversityId(universityId)
                .orElseThrow(() -> new ResourceNotFoundException("TransportationInfo", "universityId", universityId));
        return mapToDto(info);
    }

    // Transit Route Planner Mock
    public String planRoute(String from, String to) {
        // Here we would typically integrate with Google Maps API or a local transit API
        return "Route plan from " + from + " to " + to + ": Take Bus 42, transfer to Subway Line 1. Estimated time: 25 mins. Cost: $2.50";
    }

    private TransportationDto mapToDto(TransportationInfo info) {
        Double estimatedCost = info.getMonthlyPassCost();
        if (Boolean.TRUE.equals(info.getStudentDiscountAvailable()) && info.getStudentDiscountPercentage() != null) {
            estimatedCost = estimatedCost * (1 - (info.getStudentDiscountPercentage() / 100.0));
        }

        return TransportationDto.builder()
                .id(info.getId())
                .universityId(info.getUniversity().getId())
                .universityName(info.getUniversity().getName())
                .city(info.getCity())
                .monthlyPassCost(info.getMonthlyPassCost())
                .currency(info.getCurrency())
                .studentDiscountAvailable(info.getStudentDiscountAvailable())
                .studentDiscountPercentage(info.getStudentDiscountPercentage())
                .estimatedStudentCost(Math.round(estimatedCost * 100.0) / 100.0)
                .transitTypes(info.getTransitTypes())
                .bikeSharingInfo(info.getBikeSharingInfo())
                .airportPickupInfo(info.getAirportPickupInfo())
                .createdAt(info.getCreatedAt())
                .build();
    }
}
