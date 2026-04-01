package com.abroadguide.repository;

import com.abroadguide.model.DiningOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiningRepository extends JpaRepository<DiningOption, Long> {
    List<DiningOption> findByUniversityId(Long universityId);
    List<DiningOption> findByUniversityIdAndType(Long universityId, String type);
}
