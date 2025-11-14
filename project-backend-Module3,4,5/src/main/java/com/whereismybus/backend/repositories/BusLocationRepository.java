package com.whereismybus.backend.repositories;

import com.whereismybus.backend.models.BusLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BusLocationRepository extends JpaRepository<BusLocation, Long> {

    List<BusLocation> findByBusIdOrderByTimestampDesc(Long busId);

    Optional<BusLocation> findFirstByBusIdOrderByTimestampDesc(Long busId);

    List<BusLocation> findByBusIdAndTimestampBetween(Long busId, LocalDateTime start, LocalDateTime end);
}
