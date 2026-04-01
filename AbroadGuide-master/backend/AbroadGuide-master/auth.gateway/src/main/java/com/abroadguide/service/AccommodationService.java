package com.abroadguide.service;

import com.abroadguide.dto.AccommodationDto;
import com.abroadguide.exception.ResourceNotFoundException;
import com.abroadguide.model.Accommodation;
import com.abroadguide.model.University;
import com.abroadguide.repository.AccommodationRepository;
import com.abroadguide.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccommodationService {

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private UniversityRepository universityRepository;

    public AccommodationDto createAccommodation(Long universityId, AccommodationDto request) {
        University uni = universityRepository.findById(universityId)
                .orElseThrow(() -> new ResourceNotFoundException("University", "id", universityId));

        Accommodation acc = Accommodation.builder()
                .university(uni)
                .name(request.getName())
                .type(request.getType())
                .pricePerMonth(request.getPricePerMonth())
                .currency(request.getCurrency())
                .distanceToCampusKm(request.getDistanceToCampusKm())
                .safetyRating(request.getSafetyRating())
                .amenities(request.getAmenities())
                .contactInfo(request.getContactInfo())
                .imageUrl(request.getImageUrl())
                .virtualTourUrl(request.getVirtualTourUrl())
                .roommateMatchingAvailable(request.getRoommateMatchingAvailable())
                .verifiedListing(request.getVerifiedListing())
                .build();

        acc = accommodationRepository.save(acc);
        return mapToDto(acc);
    }

    public List<AccommodationDto> getAccommodationsByUniversity(Long universityId, Double maxPrice) {
        List<Accommodation> accommodations;
        if (maxPrice != null) {
            accommodations = accommodationRepository.findByUniversityIdAndPricePerMonthLessThanEqualOrderByPricePerMonthAsc(universityId, maxPrice);
        } else {
            accommodations = accommodationRepository.findByUniversityIdOrderByDistanceToCampusKmAsc(universityId);
        }
        return accommodations.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public AccommodationDto getAccommodationById(Long id) {
        Accommodation acc = accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation", "id", id));
        return mapToDto(acc);
    }

    // Roommate matching simulation
    public List<String> getRoommateMatches(Long accommodationId, Long studentId) {
        Accommodation acc = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation", "id", accommodationId));

        if (!Boolean.TRUE.equals(acc.getRoommateMatchingAvailable())) {
            throw new RuntimeException("Roommate matching is not available for this listing");
        }

        // Mock response: Returns names of other students looking for shared places
        return List.of("Alex Johnson (Matching Score: 90%)", "Maria Garcia (Matching Score: 85%)", "Wei Chen (Matching Score: 78%)");
    }

    private AccommodationDto mapToDto(Accommodation acc) {
        return AccommodationDto.builder()
                .id(acc.getId())
                .universityId(acc.getUniversity().getId())
                .universityName(acc.getUniversity().getName())
                .name(acc.getName())
                .type(acc.getType())
                .pricePerMonth(acc.getPricePerMonth())
                .currency(acc.getCurrency())
                .distanceToCampusKm(acc.getDistanceToCampusKm())
                .safetyRating(acc.getSafetyRating())
                .amenities(acc.getAmenities())
                .contactInfo(acc.getContactInfo())
                .imageUrl(acc.getImageUrl())
                .virtualTourUrl(acc.getVirtualTourUrl())
                .roommateMatchingAvailable(acc.getRoommateMatchingAvailable())
                .verifiedListing(acc.getVerifiedListing())
                .createdAt(acc.getCreatedAt())
                .build();
    }
}
