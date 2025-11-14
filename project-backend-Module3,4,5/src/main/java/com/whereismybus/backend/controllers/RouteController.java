package com.whereismybus.backend.controllers;

import com.whereismybus.backend.dto.request.AddStopRequest;
import com.whereismybus.backend.dto.request.CreateRouteRequest;
import com.whereismybus.backend.dto.response.RouteResponse;
import com.whereismybus.backend.dto.response.RouteStopResponse;
import com.whereismybus.backend.services.RouteService;
import com.whereismybus.backend.utils.ResponseUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> createRoute(@Valid @RequestBody CreateRouteRequest request) {
        RouteResponse response = routeService.createRoute(request);
        return ResponseUtil.created(response, "Route created successfully");
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllRoutes() {
        List<RouteResponse> routes = routeService.getAllRoutes();
        return ResponseUtil.success(routes, "Routes fetched successfully");
    }

    @GetMapping("/{routeId}")
    public ResponseEntity<Map<String, Object>> getRouteById(@PathVariable Long routeId) {
        RouteResponse response = routeService.getRouteById(routeId);
        return ResponseUtil.success(response, "Route fetched successfully");
    }

    @PostMapping("/{routeId}/stops")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> addStop(@PathVariable Long routeId, @Valid @RequestBody AddStopRequest request) {
        RouteStopResponse response = routeService.addStop(routeId, request);
        return ResponseUtil.created(response, "Stop added successfully");
    }

    @GetMapping("/{routeId}/stops")
    public ResponseEntity<Map<String, Object>> getRouteStops(@PathVariable Long routeId) {
        List<RouteStopResponse> stops = routeService.getRouteStops(routeId);
        return ResponseUtil.success(stops, "Stops fetched successfully");
    }

    @DeleteMapping("/{routeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteRoute(@PathVariable Long routeId) {
        routeService.deleteRoute(routeId);
        return ResponseUtil.success(null, "Route deleted successfully");
    }
}
