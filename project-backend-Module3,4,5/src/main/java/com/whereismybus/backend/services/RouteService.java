package com.whereismybus.backend.services;

import com.whereismybus.backend.dto.request.AddStopRequest;
import com.whereismybus.backend.dto.request.CreateRouteRequest;
import com.whereismybus.backend.dto.response.RouteResponse;
import com.whereismybus.backend.dto.response.RouteStopResponse;
import com.whereismybus.backend.exceptions.BadRequestException;
import com.whereismybus.backend.exceptions.ResourceNotFoundException;
import com.whereismybus.backend.models.Route;
import com.whereismybus.backend.models.RouteStop;
import com.whereismybus.backend.repositories.RouteRepository;
import com.whereismybus.backend.repositories.RouteStopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private RouteStopRepository routeStopRepository;

    public RouteResponse createRoute(CreateRouteRequest request) {
        if (routeRepository.existsByRouteNumber(request.getRouteNumber())) {
            throw new BadRequestException("Route number already exists");
        }

        Route route = new Route();
        route.setRouteNumber(request.getRouteNumber());
        route.setName(request.getName());
        route.setStartLocation(request.getStartLocation());
        route.setEndLocation(request.getEndLocation());
        route.setTotalDistance(request.getTotalDistance());
        route.setEstimatedDuration(request.getEstimatedDuration());
        route.setIsActive(true);

        Route saved = routeRepository.save(route);
        return mapToResponse(saved);
    }

    public List<RouteResponse> getAllRoutes() {
        return routeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public RouteResponse getRouteById(Long routeId) {
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new ResourceNotFoundException("Route", "id", routeId));
        return mapToResponse(route);
    }

    public RouteStopResponse addStop(Long routeId, AddStopRequest request) {
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new ResourceNotFoundException("Route", "id", routeId));

        RouteStop stop = new RouteStop();
        stop.setRoute(route);
        stop.setStopName(request.getStopName());
        stop.setLatitude(request.getLatitude());
        stop.setLongitude(request.getLongitude());
        stop.setStopSequence(request.getStopSequence());
        stop.setEstimatedArrivalTime(request.getEstimatedArrivalTime());

        RouteStop saved = routeStopRepository.save(stop);
        return mapStopToResponse(saved);
    }

    public List<RouteStopResponse> getRouteStops(Long routeId) {
        return routeStopRepository.findByRouteIdOrderByStopSequenceAsc(routeId).stream()
                .map(this::mapStopToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteRoute(Long routeId) {
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new ResourceNotFoundException("Route", "id", routeId));
        routeRepository.delete(route);
    }

    private RouteResponse mapToResponse(Route route) {
        List<RouteStopResponse> stops = route.getStops().stream()
                .map(this::mapStopToResponse)
                .collect(Collectors.toList());

        return new RouteResponse(
                route.getId(),
                route.getRouteNumber(),
                route.getName(),
                route.getStartLocation(),
                route.getEndLocation(),
                route.getTotalDistance(),
                route.getEstimatedDuration(),
                route.getStatus().name(),
                route.getIsActive(),
                stops
        );
    }

    private RouteStopResponse mapStopToResponse(RouteStop stop) {
        return new RouteStopResponse(
                stop.getId(),
                stop.getStopName(),
                stop.getLatitude(),
                stop.getLongitude(),
                stop.getStopSequence(),
                stop.getEstimatedArrivalTime()
        );
    }
}
