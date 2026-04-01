package com.abroadguide.controller;

import com.abroadguide.dto.TransportationDto;
import com.abroadguide.service.TransportationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transportation")
@CrossOrigin(origins = "*")
public class TransportationController {

    @Autowired
    private TransportationService transportationService;

    @PostMapping("/university/{universityId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TransportationDto> createTransportation(
            @PathVariable Long universityId,
            @RequestBody TransportationDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(transportationService.createInfo(universityId, request));
    }

    @GetMapping("/university/{universityId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<TransportationDto> getByUniversity(@PathVariable Long universityId) {
        return ResponseEntity.ok(transportationService.getByUniversity(universityId));
    }

    @GetMapping("/route")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<String> planRoute(
            @RequestParam String origin,
            @RequestParam String destination) {
        return ResponseEntity.ok(transportationService.planRoute(origin, destination));
    }
}
