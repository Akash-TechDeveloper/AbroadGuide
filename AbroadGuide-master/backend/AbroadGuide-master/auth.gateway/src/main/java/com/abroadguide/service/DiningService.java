package com.abroadguide.service;

import com.abroadguide.dto.DiningDto;
import com.abroadguide.exception.ResourceNotFoundException;
import com.abroadguide.model.DiningOption;
import com.abroadguide.model.University;
import com.abroadguide.repository.DiningRepository;
import com.abroadguide.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiningService {

    @Autowired
    private DiningRepository diningRepository;

    @Autowired
    private UniversityRepository universityRepository;

    public DiningDto createDiningOption(Long universityId, DiningDto request) {
        University uni = universityRepository.findById(universityId)
                .orElseThrow(() -> new ResourceNotFoundException("University", "id", universityId));

        DiningOption dining = DiningOption.builder()
                .university(uni)
                .name(request.getName())
                .type(request.getType())
                .averageCost(request.getAverageCost())
                .currency(request.getCurrency())
                .description(request.getDescription())
                .distanceToCampusKm(request.getDistanceToCampusKm())
                .rating(request.getRating())
                .studentDiscount(request.getStudentDiscount())
                .build();

        dining = diningRepository.save(dining);
        return mapToDto(dining);
    }

    public List<DiningDto> getDiningByUniversity(Long universityId, String type) {
        List<DiningOption> options;
        if (type != null && !type.isEmpty()) {
            options = diningRepository.findByUniversityIdAndType(universityId, type);
        } else {
            options = diningRepository.findByUniversityId(universityId);
        }
        return options.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public DiningDto getDiningById(Long id) {
        DiningOption dining = diningRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DiningOption", "id", id));
        return mapToDto(dining);
    }

    private DiningDto mapToDto(DiningOption dining) {
        return DiningDto.builder()
                .id(dining.getId())
                .universityId(dining.getUniversity().getId())
                .universityName(dining.getUniversity().getName())
                .name(dining.getName())
                .type(dining.getType())
                .averageCost(dining.getAverageCost())
                .currency(dining.getCurrency())
                .description(dining.getDescription())
                .distanceToCampusKm(dining.getDistanceToCampusKm())
                .rating(dining.getRating())
                .studentDiscount(dining.getStudentDiscount())
                .createdAt(dining.getCreatedAt())
                .build();
    }
}
