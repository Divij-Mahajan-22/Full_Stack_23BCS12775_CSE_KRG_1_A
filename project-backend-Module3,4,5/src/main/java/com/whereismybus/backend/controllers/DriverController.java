package com.whereismybus.backend.controllers;

import com.whereismybus.backend.dto.request.AssignDriverRequest;
import com.whereismybus.backend.dto.request.CreateDriverRequest;
import com.whereismybus.backend.dto.response.DriverDashboardResponse;
import com.whereismybus.backend.dto.response.DriverResponse;
import com.whereismybus.backend.services.DriverService;
import com.whereismybus.backend.utils.ResponseUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> createDriver(@Valid @RequestBody CreateDriverRequest request) {
        DriverResponse response = driverService.createDriver(request);
        return ResponseUtil.created(response, "Driver created successfully");
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAllDrivers() {
        List<DriverResponse> drivers = driverService.getAllDrivers();
        return ResponseUtil.success(drivers, "Drivers fetched successfully");
    }

    @GetMapping("/{driverId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DRIVER')")
    public ResponseEntity<Map<String, Object>> getDriverById(@PathVariable Long driverId) {
        DriverResponse response = driverService.getDriverById(driverId);
        return ResponseUtil.success(response, "Driver fetched successfully");
    }

    @PostMapping("/{driverId}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> assignBusAndRoute(@PathVariable Long driverId, @Valid @RequestBody AssignDriverRequest request) {
        DriverResponse response = driverService.assignBusAndRoute(driverId, request);
        return ResponseUtil.success(response, "Bus and route assigned successfully");
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('DRIVER')")
    public ResponseEntity<Map<String, Object>> getDriverDashboard() {
        DriverDashboardResponse response = driverService.getDriverDashboard();
        return ResponseUtil.success(response, "Dashboard data fetched successfully");
    }

    @DeleteMapping("/{driverId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteDriver(@PathVariable Long driverId) {
        driverService.deleteDriver(driverId);
        return ResponseUtil.success(null, "Driver deleted successfully");
    }
}
