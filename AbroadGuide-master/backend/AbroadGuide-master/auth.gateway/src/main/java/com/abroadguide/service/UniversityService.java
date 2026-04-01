package com.abroadguide.service;

import com.abroadguide.dto.UniversityRequest;
import com.abroadguide.dto.UniversityResponse;
import com.abroadguide.exception.DuplicateResourceException;
import com.abroadguide.exception.ResourceNotFoundException;
import com.abroadguide.model.Student;
import com.abroadguide.model.University;
import com.abroadguide.repository.StudentRepository;
import com.abroadguide.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UniversityService {

    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public UniversityResponse createUniversity(UniversityRequest request) {
        if (universityRepository.existsByNameAndCountry(request.getName(), request.getCountry())) {
            throw new DuplicateResourceException("University", "name+country",
                    request.getName() + ", " + request.getCountry());
        }

        University university = University.builder()
                .name(request.getName())
                .country(request.getCountry())
                .city(request.getCity())
                .description(request.getDescription())
                .ranking(request.getRanking())
                .type(request.getType())
                .websiteUrl(request.getWebsiteUrl())
                .acceptanceRate(request.getAcceptanceRate())
                .averageTuitionUsd(request.getAverageTuitionUsd())
                .averageLivingCostUsd(request.getAverageLivingCostUsd())
                .programsOffered(request.getProgramsOffered())
                .languageOfInstruction(request.getLanguageOfInstruction())
                .applicationDeadline(request.getApplicationDeadline())
                .requirements(request.getRequirements())
                .contactEmail(request.getContactEmail())
                .logoUrl(request.getLogoUrl())
                .build();

        university = universityRepository.save(university);
        return mapToResponse(university);
    }

    public UniversityResponse getUniversityById(Long id) {
        University university = universityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("University", "id", id));
        return mapToResponse(university);
    }

    public List<UniversityResponse> getAllUniversities() {
        return universityRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<UniversityResponse> searchUniversities(String country, String name,
                                                        Double maxTuition, Integer maxRanking) {
        return universityRepository.searchUniversities(country, name, maxTuition, maxRanking)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Match universities to a student's profile based on budget, preferred country, and program type.
     */
    public List<UniversityResponse> matchUniversitiesForStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        String country = student.getPreferredCountry();
        Double budget = student.getTotalBudget();

        // Search universities matching the student's preferred country and budget
        return universityRepository.searchUniversities(country, null, budget, null)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public UniversityResponse updateUniversity(Long id, UniversityRequest request) {
        University university = universityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("University", "id", id));

        if (request.getName() != null) university.setName(request.getName());
        if (request.getCountry() != null) university.setCountry(request.getCountry());
        if (request.getCity() != null) university.setCity(request.getCity());
        if (request.getDescription() != null) university.setDescription(request.getDescription());
        if (request.getRanking() != null) university.setRanking(request.getRanking());
        if (request.getType() != null) university.setType(request.getType());
        if (request.getWebsiteUrl() != null) university.setWebsiteUrl(request.getWebsiteUrl());
        if (request.getAcceptanceRate() != null) university.setAcceptanceRate(request.getAcceptanceRate());
        if (request.getAverageTuitionUsd() != null) university.setAverageTuitionUsd(request.getAverageTuitionUsd());
        if (request.getAverageLivingCostUsd() != null) university.setAverageLivingCostUsd(request.getAverageLivingCostUsd());
        if (request.getProgramsOffered() != null) university.setProgramsOffered(request.getProgramsOffered());
        if (request.getLanguageOfInstruction() != null) university.setLanguageOfInstruction(request.getLanguageOfInstruction());
        if (request.getApplicationDeadline() != null) university.setApplicationDeadline(request.getApplicationDeadline());
        if (request.getRequirements() != null) university.setRequirements(request.getRequirements());
        if (request.getContactEmail() != null) university.setContactEmail(request.getContactEmail());
        if (request.getLogoUrl() != null) university.setLogoUrl(request.getLogoUrl());

        university = universityRepository.save(university);
        return mapToResponse(university);
    }

    @Transactional
    public void deleteUniversity(Long id) {
        if (!universityRepository.existsById(id)) {
            throw new ResourceNotFoundException("University", "id", id);
        }
        universityRepository.deleteById(id);
    }

    private UniversityResponse mapToResponse(University u) {
        Double estimatedYearlyCost = null;
        if (u.getAverageTuitionUsd() != null && u.getAverageLivingCostUsd() != null) {
            estimatedYearlyCost = u.getAverageTuitionUsd() + (u.getAverageLivingCostUsd() * 12);
        }

        return UniversityResponse.builder()
                .id(u.getId())
                .name(u.getName())
                .country(u.getCountry())
                .city(u.getCity())
                .description(u.getDescription())
                .ranking(u.getRanking())
                .type(u.getType())
                .websiteUrl(u.getWebsiteUrl())
                .acceptanceRate(u.getAcceptanceRate())
                .averageTuitionUsd(u.getAverageTuitionUsd())
                .averageLivingCostUsd(u.getAverageLivingCostUsd())
                .programsOffered(u.getProgramsOffered())
                .languageOfInstruction(u.getLanguageOfInstruction())
                .applicationDeadline(u.getApplicationDeadline())
                .requirements(u.getRequirements())
                .contactEmail(u.getContactEmail())
                .logoUrl(u.getLogoUrl())
                .estimatedYearlyCost(estimatedYearlyCost)
                .createdAt(u.getCreatedAt())
                .build();
    }
}
