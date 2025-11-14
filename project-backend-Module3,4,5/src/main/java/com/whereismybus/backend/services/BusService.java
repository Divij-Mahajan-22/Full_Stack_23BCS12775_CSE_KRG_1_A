package com.whereismybus.backend.services;

import com.whereismybus.backend.dto.request.CreateBusRequest;
import com.whereismybus.backend.dto.request.UpdateLocationRequest;
import com.whereismybus.backend.dto.response.BusLocationResponse;
import com.whereismybus.backend.dto.response.BusResponse;
import com.whereismybus.backend.enums.BusStatus;
import com.whereismybus.backend.exceptions.BadRequestException;
import com.whereismybus.backend.exceptions.ResourceNotFoundException;
import com.whereismybus.backend.models.Bus;
import com.whereismybus.backend.models.BusLocation;
import com.whereismybus.backend.models.Driver;
import com.whereismybus.backend.models.Route;
import com.whereismybus.backend.repositories.BusLocationRepository;
import com.whereismybus.backend.repositories.BusRepository;
import com.whereismybus.backend.repositories.DriverRepository;
import com.whereismybus.backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private BusLocationRepository busLocationRepository;

    public BusResponse createBus(CreateBusRequest request) {
        if (busRepository.existsByBusNumber(request.getBusNumber())) {
            throw new BadRequestException("Bus number already exists");
        }

        Bus bus = new Bus();
        bus.setBusNumber(request.getBusNumber());
        bus.setModel(request.getModel());
        bus.setCapacity(request.getCapacity());
        bus.setStatus(BusStatus.ACTIVE);

        if (request.getRouteId() != null) {
            Route route = routeRepository.findById(request.getRouteId())
                    .orElseThrow(() -> new ResourceNotFoundException("Route", "id", request.getRouteId()));
            bus.setRoute(route);
        }

        if (request.getDriverId() != null) {
            Driver driver = driverRepository.findById(request.getDriverId())
                    .orElseThrow(() -> new ResourceNotFoundException("Driver", "id", request.getDriverId()));
            bus.setDriver(driver);
        }

        Bus saved = busRepository.save(bus);
        return mapToResponse(saved);
    }

    public List<BusResponse> getAllBuses() {
        return busRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BusResponse> getActiveBuses() {
        return busRepository.findByStatus(BusStatus.ACTIVE).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BusResponse getBusById(Long busId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", busId));
        return mapToResponse(bus);
    }

    public BusLocationResponse updateBusLocation(UpdateLocationRequest request) {
        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", request.getBusId()));

        // Update bus current location
        bus.setCurrentLatitude(request.getLatitude());
        bus.setCurrentLongitude(request.getLongitude());
        bus.setLastUpdated(LocalDateTime.now());
        busRepository.save(bus);

        // Save location history
        BusLocation location = new BusLocation();
        location.setBus(bus);
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());
        location.setSpeed(request.getSpeed());
        location.setHeading(request.getHeading());
        location.setTimestamp(LocalDateTime.now());
        busLocationRepository.save(location);

        return new BusLocationResponse(
                bus.getId(),
                bus.getBusNumber(),
                request.getLatitude(),
                request.getLongitude(),
                request.getSpeed(),
                request.getHeading(),
                LocalDateTime.now()
        );
    }

    public BusLocationResponse getCurrentLocation(Long busId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", busId));

        return new BusLocationResponse(
                bus.getId(),
                bus.getBusNumber(),
                bus.getCurrentLatitude(),
                bus.getCurrentLongitude(),
                null,
                null,
                bus.getLastUpdated()
        );
    }

    public void deleteBus(Long busId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", busId));
        busRepository.delete(bus);
    }

    private BusResponse mapToResponse(Bus bus) {
        return new BusResponse(
                bus.getId(),
                bus.getBusNumber(),
                bus.getModel(),
                bus.getCapacity(),
                bus.getStatus().name(),
                bus.getCurrentLatitude(),
                bus.getCurrentLongitude(),
                bus.getRoute() != null ? bus.getRoute().getRouteNumber() : null,
                bus.getDriver() != null ? bus.getDriver().getUser().getName() : null
        );
    }
}
