package com.abroadguide.repository;

import com.abroadguide.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Optional<Budget> findByStudentId(Long studentId);

    Optional<Budget> findByStudentUserId(Long userId);

    boolean existsByStudentId(Long studentId);
}
