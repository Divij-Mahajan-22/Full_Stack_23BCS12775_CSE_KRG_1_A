package com.whereismybus.backend.repositories;

import com.whereismybus.backend.models.Report;
import com.whereismybus.backend.enums.ReportStatus;
import com.whereismybus.backend.enums.ReportType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByUserId(Long userId);

    List<Report> findByBusId(Long busId);

    List<Report> findByStatus(ReportStatus status);

    List<Report> findByType(ReportType type);

    List<Report> findByBusIdAndStatus(Long busId, ReportStatus status);
}
