package com.whereismybus.backend.dto.request;

import com.whereismybus.backend.enums.ReportType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubmitReportRequest {

    @NotNull(message = "Bus ID is required")
    private Long busId;

    @NotNull(message = "Report type is required")
    private ReportType type;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    private String locationName;

    private String description;

    private String photoUrl;
}
