package com.whereismybus.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddStopRequest {

    @NotBlank(message = "Stop name is required")
    private String stopName;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    @NotNull(message = "Stop sequence is required")
    private Integer stopSequence;

    private String estimatedArrivalTime;
}
