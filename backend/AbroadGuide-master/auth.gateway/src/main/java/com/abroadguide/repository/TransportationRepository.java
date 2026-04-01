package com.abroadguide.repository;

import com.abroadguide.model.TransportationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransportationRepository extends JpaRepository<TransportationInfo, Long> {
    Optional<TransportationInfo> findByUniversityId(Long universityId);
    Optional<TransportationInfo> findByCityIgnoreCase(String city);
}
