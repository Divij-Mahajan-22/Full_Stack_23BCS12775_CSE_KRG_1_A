package com.whereismybus.backend.services;

import com.whereismybus.backend.dto.response.ETAResponse;
import com.whereismybus.backend.exceptions.ResourceNotFoundException;
import com.whereismybus.backend.models.Bus;
import com.whereismybus.backend.models.RouteStop;
import com.whereismybus.backend.repositories.BusRepository;
import com.whereismybus.backend.repositories.RouteStopRepository;
import com.whereismybus.backend.utils.LocationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private RouteStopRepository routeStopRepository;

    @Autowired
    private LocationUtil locationUtil;

    public List<ETAResponse> calculateETAForAllStops(Long busId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", busId));

        if (bus.getCurrentLatitude() == null || bus.getCurrentLongitude() == null) {
            throw new ResourceNotFoundException("Bus location not available");
        }

        if (bus.getRoute() == null) {
            throw new ResourceNotFoundException("Bus has no assigned route");
        }

        List<RouteStop> stops = routeStopRepository
                .findByRouteIdOrderByStopSequenceAsc(bus.getRoute().getId());

        List<ETAResponse> etaList = new ArrayList<>();

        for (RouteStop stop : stops) {
            double distance = locationUtil.calculateDistance(
                    bus.getCurrentLatitude(),
                    bus.getCurrentLongitude(),
                    stop.getLatitude(),
                    stop.getLongitude()
            );

            int eta = locationUtil.calculateETA(distance);

            String estimatedArrival = calculateArrivalTime(eta);

            ETAResponse etaResponse = new ETAResponse(
                    stop.getId(),
                    stop.getStopName(),
                    distance,
                    eta,
                    estimatedArrival
            );

            etaList.add(etaResponse);
        }

        return etaList;
    }

    public ETAResponse calculateETAForStop(Long busId, Long stopId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", busId));

        RouteStop stop = routeStopRepository.findById(stopId)
                .orElseThrow(() -> new ResourceNotFoundException("RouteStop", "id", stopId));

        if (bus.getCurrentLatitude() == null || bus.getCurrentLongitude() == null) {
            throw new ResourceNotFoundException("Bus location not available");
        }

        double distance = locationUtil.calculateDistance(
                bus.getCurrentLatitude(),
                bus.getCurrentLongitude(),
                stop.getLatitude(),
                stop.getLongitude()
        );

        int eta = locationUtil.calculateETA(distance);
        String estimatedArrival = calculateArrivalTime(eta);

        return new ETAResponse(
                stop.getId(),
                stop.getStopName(),
                distance,
                eta,
                estimatedArrival
        );
    }

    public boolean isBusNearStop(Long busId, Long stopId, double radiusKm) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", busId));

        RouteStop stop = routeStopRepository.findById(stopId)
                .orElseThrow(() -> new ResourceNotFoundException("RouteStop", "id", stopId));

        if (bus.getCurrentLatitude() == null || bus.getCurrentLongitude() == null) {
            return false;
        }

        return locationUtil.isWithinRadius(
                bus.getCurrentLatitude(),
                bus.getCurrentLongitude(),
                stop.getLatitude(),
                stop.getLongitude(),
                radiusKm
        );
    }

    private String calculateArrivalTime(int minutesFromNow) {
        LocalTime now = LocalTime.now();
        LocalTime arrival = now.plusMinutes(minutesFromNow);
        return arrival.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
