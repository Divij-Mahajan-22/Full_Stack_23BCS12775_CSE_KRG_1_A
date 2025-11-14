import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

// Mock data for development/fallback
const MOCK_BUSES = [
  {
    id: 1,
    busNumber: 'PB-01-AA-1234',
    routeNumber: '101',
    status: 'ACTIVE',
    currentLatitude: 30.7333,
    currentLongitude: 76.7794,
    distance: 2.5,
    capacity: 40,
    occupancy: 28
  },
  {
    id: 2,
    busNumber: 'PB-01-BB-5678',
    routeNumber: '102',
    status: 'ACTIVE',
    currentLatitude: 30.7410,
    currentLongitude: 76.7870,
    distance: 3.8,
    capacity: 40,
    occupancy: 32
  },
  {
    id: 3,
    busNumber: 'PB-01-CC-9012',
    routeNumber: '103',
    status: 'ACTIVE',
    currentLatitude: 30.7250,
    currentLongitude: 76.7650,
    distance: 1.2,
    capacity: 40,
    occupancy: 15
  }
];

/**
 * Get active buses (with fallback to mock data)
 */
export const getActiveBuses = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.BUS.GET_ACTIVE);
    return {
      success: true,
      data: response.data || [],
      source: 'backend'
    };
  } catch (error) {
    console.warn('⚠️ Backend unavailable, using mock data:', error.message);
    return {
      success: true,
      data: MOCK_BUSES,
      source: 'mock',
      message: 'Using demo data (backend unavailable)'
    };
  }
};

/**
 * Get nearby buses based on location
 */
export const getNearbyBuses = async (latitude, longitude) => {
  // Validate inputs
  if (!latitude || !longitude) {
    console.warn('⚠️ Invalid coordinates, using mock data');
    return {
      success: true,
      data: MOCK_BUSES,
      source: 'mock',
      message: 'Using demo data (location unavailable)'
    };
  }

  try {
    const response = await api.get(API_ENDPOINTS.BUS.GET_ALL, {
      params: { latitude, longitude }
    });
    return {
      success: true,
      data: response.data || [],
      source: 'backend'
    };
  } catch (error) {
    console.warn('⚠️ Backend unavailable, using mock data:', error.message);
    
    // Calculate mock distances
    const mockWithDistance = MOCK_BUSES.map(bus => ({
      ...bus,
      distance: calculateDistance(latitude, longitude, bus.currentLatitude, bus.currentLongitude)
    }));
    
    return {
      success: true,
      data: mockWithDistance,
      source: 'mock',
      message: 'Using demo data (backend unavailable)'
    };
  }
};

/**
 * Get specific bus location by ID
 */
export const getBusLocation = async (busId) => {
  try {
    const response = await api.get(API_ENDPOINTS.BUS.TRACK(busId));
    return {
      success: true,
      data: response.data,
      source: 'backend'
    };
  } catch (error) {
    console.warn(`⚠️ Bus ${busId} not found, using mock data`);
    const mockBus = MOCK_BUSES.find(b => b.id === parseInt(busId)) || MOCK_BUSES[0];
    return {
      success: true,
      data: {
        id: mockBus.id,
        busNumber: mockBus.busNumber,
        latitude: mockBus.currentLatitude,
        longitude: mockBus.currentLongitude,
        status: mockBus.status,
        timestamp: new Date().toISOString()
      },
      source: 'mock',
      message: 'Using demo data (backend unavailable)'
    };
  }
};

/**
 * Get all buses (Admin)
 */
export const getAllBuses = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.BUS.GET_ALL);
    return {
      success: true,
      data: response.data || [],
      source: 'backend'
    };
  } catch (error) {
    console.warn('⚠️ Backend unavailable, using mock data');
    return {
      success: true,
      data: MOCK_BUSES,
      source: 'mock',
      message: 'Using demo data (backend unavailable)'
    };
  }
};

/**
 * Update bus location (Driver)
 */
export const updateBusLocation = async (locationData) => {
  try {
    const response = await api.put(API_ENDPOINTS.BUS.UPDATE_LOCATION, locationData);
    return {
      success: true,
      data: response.data,
      source: 'backend'
    };
  } catch (error) {
    console.warn('⚠️ Failed to update location, simulating success');
    return {
      success: true,
      data: {
        ...locationData,
        timestamp: new Date().toISOString()
      },
      source: 'mock',
      message: 'Simulated update (backend unavailable)'
    };
  }
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}
