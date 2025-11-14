package com.whereismybus.backend.services;

import com.whereismybus.backend.dto.request.AssignDriverRequest;
import com.whereismybus.backend.dto.request.CreateDriverRequest;
import com.whereismybus.backend.dto.response.DriverDashboardResponse;
import com.whereismybus.backend.dto.response.DriverResponse;
import com.whereismybus.backend.enums.UserRole;
import com.whereismybus.backend.exceptions.BadRequestException;
import com.whereismybus.backend.exceptions.ResourceNotFoundException;
import com.whereismybus.backend.models.Bus;
import com.whereismybus.backend.models.Driver;
import com.whereismybus.backend.models.Route;
import com.whereismybus.backend.models.User;
import com.whereismybus.backend.repositories.BusRepository;
import com.whereismybus.backend.repositories.DriverRepository;
import com.whereismybus.backend.repositories.RouteRepository;
import com.whereismybus.backend.repositories.UserRepository;
import com.whereismybus.backend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public DriverResponse createDriver(CreateDriverRequest request) {
        // Check if email or license already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        if (driverRepository.existsByLicenseNumber(request.getLicenseNumber())) {
            throw new BadRequestException("License number already exists");
        }

        // Create user account for driver
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(UserRole.DRIVER);
        user.setIsActive(true);
        User savedUser = userRepository.save(user);

        // Create driver profile
        Driver driver = new Driver();
        driver.setUser(savedUser);
        driver.setLicenseNumber(request.getLicenseNumber());
        driver.setExperienceYears(request.getExperienceYears());
        driver.setRating(5.0);
        driver.setTotalTrips(0);
        driver.setIsAvailable(true);

        Driver savedDriver = driverRepository.save(driver);
        return mapToResponse(savedDriver);
    }

    public List<DriverResponse> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public DriverResponse getDriverById(Long driverId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", "id", driverId));
        return mapToResponse(driver);
    }

    public DriverResponse assignBusAndRoute(Long driverId, AssignDriverRequest request) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", "id", driverId));

        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", request.getBusId()));

        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException("Route", "id", request.getRouteId()));

        // Assign driver to bus
        bus.setDriver(driver);
        bus.setRoute(route);
        busRepository.save(bus);

        // Update driver availability
        driver.setIsAvailable(false);
        driverRepository.save(driver);

        return mapToResponse(driver);
    }

    public DriverDashboardResponse getDriverDashboard() {
        User currentUser = SecurityUtils.getCurrentUser();
        if (currentUser == null || currentUser.getRole() != UserRole.DRIVER) {
            throw new BadRequestException("Only drivers can access this endpoint");
        }

        Driver driver = driverRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver profile not found"));

        Bus assignedBus = driver.getAssignedBus();
        String busNumber = assignedBus != null ? assignedBus.getBusNumber() : "Not assigned";
        String currentRoute = assignedBus != null && assignedBus.getRoute() != null
                ? assignedBus.getRoute().getName() : "No route assigned";
        String routeStatus = assignedBus != null && assignedBus.getRoute() != null
                ? assignedBus.getRoute().getStatus().name() : "N/A";

        return new DriverDashboardResponse(
                driver.getUser().getName(),
                busNumber,
                currentRoute,
                routeStatus,
                driver.getRating(),
                driver.getTotalTrips(),
                0 // trips today - calculate from actual data
        );
    }

    @Transactional
    public void deleteDriver(Long driverId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", "id", driverId));

        User user = driver.getUser();
        driverRepository.delete(driver);
        userRepository.delete(user);
    }

    private DriverResponse mapToResponse(Driver driver) {
        Bus assignedBus = driver.getAssignedBus();

        return new DriverResponse(
                driver.getId(),
                driver.getUser().getId(),
                driver.getUser().getName(),
                driver.getUser().getEmail(),
                driver.getUser().getPhone(),
                driver.getLicenseNumber(),
                driver.getExperienceYears(),
                driver.getRating(),
                driver.getTotalTrips(),
                driver.getIsAvailable(),
                assignedBus != null ? assignedBus.getBusNumber() : null
        );
    }
}
