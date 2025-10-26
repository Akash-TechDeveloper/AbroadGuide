package com.abroadguide.authgateway.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "university")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class University {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String country;
}