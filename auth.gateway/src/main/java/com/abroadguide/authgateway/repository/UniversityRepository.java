package com.abroadguide.authgateway.repository;

import com.abroadguide.authgateway.model.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, Long> {
}