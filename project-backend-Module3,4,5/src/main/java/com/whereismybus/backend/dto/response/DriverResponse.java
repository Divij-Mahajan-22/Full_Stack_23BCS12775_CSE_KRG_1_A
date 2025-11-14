package com.whereismybus.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverResponse {

    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String licenseNumber;
    private Integer experienceYears;
    private Double rating;
    private Integer totalTrips;
    private Boolean isAvailable;
    private String assignedBusNumber;
}
