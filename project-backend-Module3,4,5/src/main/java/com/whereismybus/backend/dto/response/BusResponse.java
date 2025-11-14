package com.whereismybus.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusResponse {

    private Long id;
    private String busNumber;
    private String model;
    private Integer capacity;
    private String status;
    private Double currentLatitude;
    private Double currentLongitude;
    private String routeNumber;
    private String driverName;
}
