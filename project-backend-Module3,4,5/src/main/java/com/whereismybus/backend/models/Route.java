package com.whereismybus.backend.models;

import com.whereismybus.backend.enums.RouteStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "routes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Route extends BaseEntity {

    @Column(name = "route_number", nullable = false, unique = true)
    private String routeNumber;

    @Column(nullable = false)
    private String name;

    @Column(name = "start_location")
    private String startLocation;

    @Column(name = "end_location")
    private String endLocation;

    @Column(name = "total_distance")
    private Double totalDistance;

    @Column(name = "estimated_duration")
    private Integer estimatedDuration; // in minutes

    @Enumerated(EnumType.STRING)
    private RouteStatus status = RouteStatus.NOT_STARTED;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RouteStop> stops = new ArrayList<>();
}
