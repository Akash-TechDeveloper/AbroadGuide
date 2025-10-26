package com.abroadguide.authgateway.repository;

import com.abroadguide.authgateway.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByAdminId(Long adminId);
}