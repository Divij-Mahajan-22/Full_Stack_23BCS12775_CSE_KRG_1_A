package com.whereismybus.backend.utils;

import org.springframework.stereotype.Component;

@Component
public class LocationUtil {

    private static final double EARTH_RADIUS_KM = 6371.0;
    private static final double AVERAGE_SPEED_KMH = 30.0; // Average bus speed

    /**
     * Calculate distance between two GPS coordinates using Haversine formula
     * @return distance in kilometers
     */
    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_KM * c;
    }

    /**
     * Calculate ETA in minutes based on distance
     * @param distanceKm distance in kilometers
     * @return estimated time in minutes
     */
    public int calculateETA(double distanceKm) {
        double hours = distanceKm / AVERAGE_SPEED_KMH;
        return (int) Math.ceil(hours * 60);
    }

    /**
     * Calculate ETA with custom speed
     * @param distanceKm distance in kilometers
     * @param speedKmh speed in km/h
     * @return estimated time in minutes
     */
    public int calculateETA(double distanceKm, double speedKmh) {
        if (speedKmh <= 0) speedKmh = AVERAGE_SPEED_KMH;
        double hours = distanceKm / speedKmh;
        return (int) Math.ceil(hours * 60);
    }

    /**
     * Check if location is within radius
     * @param centerLat center latitude
     * @param centerLon center longitude
     * @param pointLat point latitude
     * @param pointLon point longitude
     * @param radiusKm radius in kilometers
     * @return true if point is within radius
     */
    public boolean isWithinRadius(double centerLat, double centerLon,
                                  double pointLat, double pointLon,
                                  double radiusKm) {
        double distance = calculateDistance(centerLat, centerLon, pointLat, pointLon);
        return distance <= radiusKm;
    }
}
