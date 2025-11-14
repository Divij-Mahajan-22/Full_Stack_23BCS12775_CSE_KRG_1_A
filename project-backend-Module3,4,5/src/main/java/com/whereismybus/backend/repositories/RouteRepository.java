package com.whereismybus.backend.repositories;

import com.whereismybus.backend.models.Route;
import com.whereismybus.backend.enums.RouteStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    Optional<Route> findByRouteNumber(String routeNumber);

    List<Route> findByStatus(RouteStatus status);

    List<Route> findByIsActive(Boolean isActive);

    boolean existsByRouteNumber(String routeNumber);
}
