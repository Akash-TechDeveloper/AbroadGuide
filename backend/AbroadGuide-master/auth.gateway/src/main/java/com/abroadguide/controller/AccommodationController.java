package com.abroadguide.controller;

import com.abroadguide.dto.AccommodationDto;
import com.abroadguide.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
@CrossOrigin(origins = "*")
public class AccommodationController {

    @Autowired
    private AccommodationService accommodationService;

    @PostMapping("/university/{universityId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AccommodationDto> createAccommodation(
            @PathVariable Long universityId,
            @RequestBody AccommodationDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accommodationService.createAccommodation(universityId, request));
    }

    @GetMapping("/university/{universityId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<AccommodationDto>> getByUniversity(
            @PathVariable Long universityId,
            @RequestParam(required = false) Double maxPrice) {
        return ResponseEntity.ok(accommodationService.getAccommodationsByUniversity(universityId, maxPrice));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<AccommodationDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(accommodationService.getAccommodationById(id));
    }

    @GetMapping("/{id}/roommates/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<String>> matchRoommates(
            @PathVariable Long id,
            @PathVariable Long studentId) {
        return ResponseEntity.ok(accommodationService.getRoommateMatches(id, studentId));
    }
}
