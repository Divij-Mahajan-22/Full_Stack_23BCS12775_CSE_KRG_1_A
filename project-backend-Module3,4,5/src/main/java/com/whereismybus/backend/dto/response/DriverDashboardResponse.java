package com.whereismybus.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverDashboardResponse {

    private String driverName;
    private String assignedBusNumber;
    private String currentRoute;
    private String routeStatus;
    private Double rating;
    private Integer totalTrips;
    private Integer tripsToday;
}
