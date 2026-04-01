package com.abroadguide.repository;

import com.abroadguide.model.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByUniversityIdOrderByDistanceToCampusKmAsc(Long universityId);
    List<Accommodation> findByUniversityIdAndPricePerMonthLessThanEqualOrderByPricePerMonthAsc(Long universityId, Double maxPrice);
    List<Accommodation> findByType(String type);
}
