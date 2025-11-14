package com.whereismybus.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteResponse {

    private Long id;
    private String routeNumber;
    private String name;
    private String startLocation;
    private String endLocation;
    private Double totalDistance;
    private Integer estimatedDuration;
    private String status;
    private Boolean isActive;
    private List<RouteStopResponse> stops;
}
