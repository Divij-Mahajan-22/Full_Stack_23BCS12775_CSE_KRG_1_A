package com.whereismybus.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateRouteRequest {

    @NotBlank(message = "Route number is required")
    private String routeNumber;

    @NotBlank(message = "Route name is required")
    private String name;

    @NotBlank(message = "Start location is required")
    private String startLocation;

    @NotBlank(message = "End location is required")
    private String endLocation;

    private Double totalDistance;

    private Integer estimatedDuration;
}
