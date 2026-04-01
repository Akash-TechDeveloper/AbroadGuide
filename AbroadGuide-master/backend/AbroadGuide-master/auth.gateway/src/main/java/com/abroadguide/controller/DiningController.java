package com.abroadguide.controller;

import com.abroadguide.dto.DiningDto;
import com.abroadguide.service.DiningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dining")
@CrossOrigin(origins = "*")
public class DiningController {

    @Autowired
    private DiningService diningService;

    @PostMapping("/university/{universityId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DiningDto> createDining(
            @PathVariable Long universityId,
            @RequestBody DiningDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diningService.createDiningOption(universityId, request));
    }

    @GetMapping("/university/{universityId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<DiningDto>> getByUniversity(
            @PathVariable Long universityId,
            @RequestParam(required = false) String type) { // allowed types: HALAL, VEGAN, etc.
        return ResponseEntity.ok(diningService.getDiningByUniversity(universityId, type));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<DiningDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(diningService.getDiningById(id));
    }
}
