package com.whereismybus.backend.repositories;

import com.whereismybus.backend.models.Bus;
import com.whereismybus.backend.enums.BusStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {

    Optional<Bus> findByBusNumber(String busNumber);

    List<Bus> findByStatus(BusStatus status);

    List<Bus> findByRouteId(Long routeId);

    boolean existsByBusNumber(String busNumber);
}
