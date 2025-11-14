package com.whereismybus.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {

    private Long id;
    private String userName;
    private String busNumber;
    private String type;
    private String status;
    private Double latitude;
    private Double longitude;
    private String locationName;
    private String description;
    private String photoUrl;
    private Integer verificationCount;
    private Integer pointsAwarded;
    private LocalDateTime createdAt;
}
