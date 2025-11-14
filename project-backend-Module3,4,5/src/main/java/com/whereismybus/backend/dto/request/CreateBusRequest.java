package com.whereismybus.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateBusRequest {

    @NotBlank(message = "Bus number is required")
    private String busNumber;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Capacity is required")
    private Integer capacity;

    private Long routeId;

    private Long driverId;
}
