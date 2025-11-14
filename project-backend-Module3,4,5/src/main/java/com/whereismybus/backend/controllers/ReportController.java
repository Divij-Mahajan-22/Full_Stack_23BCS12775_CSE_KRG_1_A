package com.whereismybus.backend.controllers;

import com.whereismybus.backend.dto.request.SubmitReportRequest;
import com.whereismybus.backend.dto.response.ReportResponse;
import com.whereismybus.backend.services.ReportService;
import com.whereismybus.backend.utils.ResponseUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitReport(@Valid @RequestBody SubmitReportRequest request) {
        ReportResponse response = reportService.submitReport(request);
        return ResponseUtil.created(response, "Report submitted successfully");
    }

    @GetMapping("/bus/{busId}")
    public ResponseEntity<Map<String, Object>> getReportsByBus(@PathVariable Long busId) {
        List<ReportResponse> reports = reportService.getReportsByBus(busId);
        return ResponseUtil.success(reports, "Reports fetched successfully");
    }

    @GetMapping("/my-reports")
    public ResponseEntity<Map<String, Object>> getUserReports() {
        List<ReportResponse> reports = reportService.getUserReports();
        return ResponseUtil.success(reports, "Your reports fetched successfully");
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getPendingReports() {
        List<ReportResponse> reports = reportService.getPendingReports();
        return ResponseUtil.success(reports, "Pending reports fetched successfully");
    }

    @PutMapping("/{reportId}/verify")
    public ResponseEntity<Map<String, Object>> verifyReport(@PathVariable Long reportId) {
        ReportResponse response = reportService.verifyReport(reportId);
        return ResponseUtil.success(response, "Report verified successfully");
    }

    @PutMapping("/{reportId}/validate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> validateReport(
            @PathVariable Long reportId,
            @RequestParam Boolean approved,
            @RequestParam(required = false) Integer points
    ) {
        ReportResponse response = reportService.validateReport(reportId, approved, points);
        return ResponseUtil.success(response, "Report validated successfully");
    }
}
