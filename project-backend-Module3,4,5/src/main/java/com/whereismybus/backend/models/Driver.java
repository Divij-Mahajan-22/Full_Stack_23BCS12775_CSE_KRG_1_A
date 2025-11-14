package com.whereismybus.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "drivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Driver extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "rating")
    private Double rating = 5.0;

    @Column(name = "total_trips")
    private Integer totalTrips = 0;

    @Column(name = "is_available")
    private Boolean isAvailable = true;

    @OneToOne(mappedBy = "driver")
    private Bus assignedBus;
}
