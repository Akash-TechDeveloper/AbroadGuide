package com.abroadguide.controller;

import com.abroadguide.dto.UniversityRequest;
import com.abroadguide.dto.UniversityResponse;
import com.abroadguide.service.UniversityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/universities")
@CrossOrigin(origins = "*")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UniversityResponse> createUniversity(
            @Valid @RequestBody UniversityRequest request) {
        UniversityResponse response = universityService.createUniversity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<UniversityResponse>> getAllUniversities() {
        List<UniversityResponse> universities = universityService.getAllUniversities();
        return ResponseEntity.ok(universities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UniversityResponse> getUniversityById(@PathVariable Long id) {
        UniversityResponse response = universityService.getUniversityById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UniversityResponse>> searchUniversities(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double maxTuition,
            @RequestParam(required = false) Integer maxRanking) {
        List<UniversityResponse> results = universityService.searchUniversities(
                country, name, maxTuition, maxRanking);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/match/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<UniversityResponse>> matchUniversities(
            @PathVariable Long studentId) {
        List<UniversityResponse> matches = universityService.matchUniversitiesForStudent(studentId);
        return ResponseEntity.ok(matches);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UniversityResponse> updateUniversity(
            @PathVariable Long id,
            @Valid @RequestBody UniversityRequest request) {
        UniversityResponse response = universityService.updateUniversity(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUniversity(@PathVariable Long id) {
        universityService.deleteUniversity(id);
        return ResponseEntity.noContent().build();
    }
}
