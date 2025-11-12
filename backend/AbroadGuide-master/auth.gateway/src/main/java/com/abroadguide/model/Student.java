package com.abroadguide.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;

@Entity
@Table(name = "students")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;

    @Column(name = "student_id", unique = true, length = 50)
    private String studentId;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(length = 100)
    private String address;

    @Column(name = "enrollment_year")
    private Integer enrollmentYear;

    @Column(length = 100)
    private String major;

    @Column(name = "total_budget")
    private Double totalBudget;

    // Transient field to expose user email
    @Transient
    public String getEmail() {
        return user != null ? user.getEmail() : null;
    }

    @Transient
    public String getFullName() {
        return user != null ? user.getFullName() : null;
    }
}