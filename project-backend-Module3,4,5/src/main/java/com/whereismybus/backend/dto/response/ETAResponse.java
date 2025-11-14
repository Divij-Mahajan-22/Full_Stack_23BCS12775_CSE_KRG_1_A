package com.whereismybus.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ETAResponse {

    private Long stopId;
    private String stopName;
    private Double distanceKm;
    private Integer etaMinutes;
    private String estimatedArrival;
}
