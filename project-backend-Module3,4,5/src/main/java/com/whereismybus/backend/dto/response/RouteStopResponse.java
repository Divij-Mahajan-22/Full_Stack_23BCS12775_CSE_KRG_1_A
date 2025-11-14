package com.whereismybus.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteStopResponse {

    private Long id;
    private String stopName;
    private Double latitude;
    private Double longitude;
    private Integer stopSequence;
    private String estimatedArrivalTime;
}
