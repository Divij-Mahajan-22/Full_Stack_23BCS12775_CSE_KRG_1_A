package com.whereismybus.backend.services;

import com.whereismybus.backend.dto.request.SubmitReportRequest;
import com.whereismybus.backend.dto.response.ReportResponse;
import com.whereismybus.backend.enums.ReportStatus;
import com.whereismybus.backend.exceptions.ResourceNotFoundException;
import com.whereismybus.backend.models.Bus;
import com.whereismybus.backend.models.Report;
import com.whereismybus.backend.models.User;
import com.whereismybus.backend.repositories.BusRepository;
import com.whereismybus.backend.repositories.ReportRepository;
import com.whereismybus.backend.repositories.UserRepository;
import com.whereismybus.backend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private UserRepository userRepository;

    public ReportResponse submitReport(SubmitReportRequest request) {
        User currentUser = SecurityUtils.getCurrentUser();
        if (currentUser == null) {
            throw new ResourceNotFoundException("User not found");
        }

        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", request.getBusId()));

        Report report = new Report();
        report.setUser(currentUser);
        report.setBus(bus);
        report.setType(request.getType());
        report.setStatus(ReportStatus.PENDING);
        report.setLatitude(request.getLatitude());
        report.setLongitude(request.getLongitude());
        report.setLocationName(request.getLocationName());
        report.setDescription(request.getDescription());
        report.setPhotoUrl(request.getPhotoUrl());
        report.setVerificationCount(0);
        report.setPointsAwarded(0);

        Report saved = reportRepository.save(report);
        return mapToResponse(saved);
    }

    public List<ReportResponse> getReportsByBus(Long busId) {
        return reportRepository.findByBusId(busId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getPendingReports() {
        return reportRepository.findByStatus(ReportStatus.PENDING).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getUserReports() {
        User currentUser = SecurityUtils.getCurrentUser();
        if (currentUser == null) {
            throw new ResourceNotFoundException("User not found");
        }

        return reportRepository.findByUserId(currentUser.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ReportResponse verifyReport(Long reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report", "id", reportId));

        report.setVerificationCount(report.getVerificationCount() + 1);

        // Auto-verify if threshold reached (e.g., 3 verifications)
        if (report.getVerificationCount() >= 3) {
            report.setStatus(ReportStatus.VERIFIED);
        }

        Report updated = reportRepository.save(report);
        return mapToResponse(updated);
    }

    public ReportResponse validateReport(Long reportId, Boolean approved, Integer points) {
        User currentUser = SecurityUtils.getCurrentUser();
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report", "id", reportId));

        if (approved) {
            report.setStatus(ReportStatus.VERIFIED);
            report.setPointsAwarded(points != null ? points : 10);
            report.setValidatedBy(currentUser);

            // Award points to user (update trust score)
            User reporter = report.getUser();
            reporter.setTrustScore(reporter.getTrustScore() + report.getPointsAwarded());
            userRepository.save(reporter);
        } else {
            report.setStatus(ReportStatus.REJECTED);
        }

        Report updated = reportRepository.save(report);
        return mapToResponse(updated);
    }

    private ReportResponse mapToResponse(Report report) {
        return new ReportResponse(
                report.getId(),
                report.getUser().getName(),
                report.getBus().getBusNumber(),
                report.getType().name(),
                report.getStatus().name(),
                report.getLatitude(),
                report.getLongitude(),
                report.getLocationName(),
                report.getDescription(),
                report.getPhotoUrl(),
                report.getVerificationCount(),
                report.getPointsAwarded(),
                report.getCreatedAt()
        );
    }
}
