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

    // Study-abroad specific fields
    @Column(name = "preferred_country", length = 100)
    private String preferredCountry;

    @Column(name = "preferred_city", length = 100)
    private String preferredCity;

    @Column
    private Double gpa;

    @Column(name = "test_score")
    private Double testScore;

    @Column(name = "test_type", length = 20)
    private String testType; // SAT, GRE, GMAT

    @Column(name = "language_proficiency", length = 20)
    private String languageProficiency; // IELTS, TOEFL, DUOLINGO

    @Column(name = "language_score")
    private Double languageScore;

    @Column(name = "program_type", length = 20)
    private String programType; // BACHELORS, MASTERS, PHD

    @Column(length = 100)
    private String nationality;

    // Phase 2 Recommendation Inputs
    @Column(name = "research_experience")
    private Boolean researchExperience;

    @Column(name = "scholarship_eligibility")
    private Boolean scholarshipEligibility;

    @Column(name = "funding_sources", length = 200)
    private String fundingSources;

    @Column(name = "preferred_city_size", length = 20)
    private String preferredCitySize; // SMALL, MEDIUM, LARGE

    @Column(name = "preferred_climate", length = 20)
    private String preferredClimate; // TROPICAL, TEMPERATE, COLD

    @Column(name = "preferred_language", length = 50)
    private String preferredLanguage;

    @Column(name = "preferred_campus_life", length = 50)
    private String preferredCampusLife;

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