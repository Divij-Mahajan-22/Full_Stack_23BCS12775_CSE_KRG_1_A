package com.whereismybus.backend.controllers;

import com.whereismybus.backend.dto.request.CreateBusRequest;
import com.whereismybus.backend.dto.request.UpdateLocationRequest;
import com.whereismybus.backend.dto.response.BusLocationResponse;
import com.whereismybus.backend.dto.response.BusResponse;
import com.whereismybus.backend.dto.response.ETAResponse;
import com.whereismybus.backend.services.BusService;
import com.whereismybus.backend.services.LocationService;
import com.whereismybus.backend.utils.ResponseUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "*")
public class BusController {

    @Autowired
    private BusService busService;

    @Autowired
    private LocationService locationService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> createBus(@Valid @RequestBody CreateBusRequest request) {
        BusResponse response = busService.createBus(request);
        return ResponseUtil.created(response, "Bus created successfully");
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DRIVER')")
    public ResponseEntity<Map<String, Object>> getAllBuses() {
        List<BusResponse> buses = busService.getAllBuses();
        return ResponseUtil.success(buses, "Buses fetched successfully");
    }

    @GetMapping("/active")
    public ResponseEntity<Map<String, Object>> getActiveBuses() {
        List<BusResponse> buses = busService.getActiveBuses();
        return ResponseUtil.success(buses, "Active buses fetched successfully");
    }

    @GetMapping("/{busId}")
    public ResponseEntity<Map<String, Object>> getBusById(@PathVariable Long busId) {
        BusResponse response = busService.getBusById(busId);
        return ResponseUtil.success(response, "Bus fetched successfully");
    }

    @PostMapping("/location")
    @PreAuthorize("hasRole('DRIVER')")
    public ResponseEntity<Map<String, Object>> updateBusLocation(@Valid @RequestBody UpdateLocationRequest request) {
        BusLocationResponse response = busService.updateBusLocation(request);
        return ResponseUtil.success(response, "Location updated successfully");
    }

    @GetMapping("/{busId}/location")
    public ResponseEntity<Map<String, Object>> getBusLocation(@PathVariable Long busId) {
        BusLocationResponse response = busService.getCurrentLocation(busId);
        return ResponseUtil.success(response, "Location fetched successfully");
    }

    @GetMapping("/{busId}/eta")
    public ResponseEntity<Map<String, Object>> getBusETA(@PathVariable Long busId, @RequestParam(required = false) Long stopId) {
        if (stopId != null) {
            ETAResponse eta = locationService.calculateETAForStop(busId, stopId);
            return ResponseUtil.success(eta, "ETA calculated successfully");
        } else {
            List<ETAResponse> etas = locationService.calculateETAForAllStops(busId);
            return ResponseUtil.success(etas, "ETAs calculated successfully");
        }
    }

    @DeleteMapping("/{busId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteBus(@PathVariable Long busId) {
        busService.deleteBus(busId);
        return ResponseUtil.success(null, "Bus deleted successfully");
    }
}
