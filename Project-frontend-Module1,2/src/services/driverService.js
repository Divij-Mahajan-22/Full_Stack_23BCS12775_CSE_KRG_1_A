import api from './api';
import { API_ENDPOINTS, apiConfig } from '@/config/api.config';

const isMockMode = apiConfig.mockMode;

// ============= DRIVER DASHBOARD (NOT IMPLEMENTED IN BACKEND YET) =============

export const getDriverDashboard = async () => {
  // ❌ BACKEND NOT READY - Always use mock for this endpoint
  console.log('⚠️ Driver Dashboard - Backend endpoint NOT implemented yet');
  console.log('📝 Expected endpoint: GET /api/drivers/dashboard');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    data: {
      assignedBus: null,
      assignedRoute: null,
      todayTrips: 0,
      totalDistance: 0,
      onTimePercentage: 0,
      rating: 0,
    },
  };
  
  // 🔧 Uncomment this when backend implements GET /api/drivers/dashboard
  // return api.get(API_ENDPOINTS.DRIVER.GET_DASHBOARD);
};

// ============= ROUTE STOPS =============

export const getRouteStops = async (routeId) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - getRouteStops');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: [] };
  }

  // ✅ BACKEND CONNECTED - GET /api/routes/{id}/stops
  return api.get(API_ENDPOINTS.ROUTE.GET_STOPS(routeId));
};

// ============= ROUTE CONTROL (NOT IMPLEMENTED IN BACKEND) =============

export const startRoute = async (driverId, routeData) => {
  // ❌ BACKEND NOT READY
  console.log('⚠️ Route Control - Backend endpoint NOT implemented');
  console.log('📝 Expected: POST /api/drivers/${driverId}/route/start');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: false,
    message: 'Feature under development - Backend endpoint not available',
  };
  
  // 🔧 Uncomment when backend ready
  // return api.post(API_ENDPOINTS.DRIVER.START_ROUTE(driverId), routeData);
};

export const pauseRoute = async (driverId) => {
  // ❌ BACKEND NOT READY
  console.log('⚠️ Route Control - Backend endpoint NOT implemented');
  console.log('📝 Expected: POST /api/drivers/${driverId}/route/pause');
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    success: false,
    message: 'Feature under development - Backend endpoint not available',
  };
  
  // 🔧 Uncomment when backend ready
  // return api.post(API_ENDPOINTS.DRIVER.PAUSE_ROUTE(driverId));
};

export const completeRoute = async (driverId) => {
  // ❌ BACKEND NOT READY
  console.log('⚠️ Route Control - Backend endpoint NOT implemented');
  console.log('📝 Expected: POST /api/drivers/${driverId}/route/complete');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: false,
    message: 'Feature under development - Backend endpoint not available',
  };
  
  // 🔧 Uncomment when backend ready
  // return api.post(API_ENDPOINTS.DRIVER.COMPLETE_ROUTE(driverId));
};

export const checkInAtStop = async (driverId, stopId) => {
  // ❌ BACKEND NOT READY
  console.log('⚠️ Check-In - Backend endpoint NOT implemented');
  console.log(`📝 Expected: POST /api/drivers/${driverId}/checkin/${stopId}`);
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    success: false,
    message: 'Feature under development - Backend endpoint not available',
  };
  
  // 🔧 Uncomment when backend ready
  // return api.post(API_ENDPOINTS.DRIVER.CHECK_IN(driverId, stopId));
};

// ============= PERFORMANCE (NOT IMPLEMENTED IN BACKEND) =============

export const getDriverPerformance = async (driverId) => {
  // ❌ BACKEND NOT READY
  console.log('⚠️ Performance - Backend endpoint NOT implemented');
  console.log(`📝 Expected: GET /api/drivers/${driverId}/performance`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: false,
    message: 'Feature under development - Backend endpoint not available',
    data: null,
  };
  
  // 🔧 Uncomment when backend ready
  // return api.get(API_ENDPOINTS.DRIVER.GET_PERFORMANCE(driverId));
};

// ============= MESSAGES (NOT IMPLEMENTED IN BACKEND - WebSocket Required) =============

export const getDriverMessages = async (driverId) => {
  // ❌ BACKEND NOT READY - Requires WebSocket
  console.log('⚠️ Messages - Backend WebSocket NOT implemented');
  console.log('📝 Expected: WebSocket /api/messages or GET /api/messages/${driverId}');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    success: false,
    message: 'Feature under development - Backend WebSocket not available',
    data: [],
  };
  
  // 🔧 Uncomment when backend implements WebSocket/REST messages
  // return api.get(API_ENDPOINTS.MESSAGE.GET_ALL(driverId));
};

export const sendMessage = async (messageData) => {
  // ❌ BACKEND NOT READY - Requires WebSocket
  console.log('⚠️ Send Message - Backend WebSocket NOT implemented');
  console.log('📝 Expected: WebSocket emit or POST /api/messages');
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    success: false,
    message: 'Feature under development - Backend WebSocket not available',
  };
  
  // 🔧 Uncomment when backend ready
  // return api.post(API_ENDPOINTS.MESSAGE.SEND, messageData);
};

export const sendBulkMessage = async (messageData) => {
  // ❌ BACKEND NOT READY - Requires WebSocket
  console.log('⚠️ Bulk Message - Backend WebSocket NOT implemented');
  console.log('📝 Expected: WebSocket emit or POST /api/messages/bulk');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: false,
    message: 'Feature under development - Backend WebSocket not available',
  };
  
  // 🔧 Uncomment when backend ready
  // return api.post(API_ENDPOINTS.MESSAGE.BULK_SEND, messageData);
};

export default {
  getDriverDashboard,
  getRouteStops,
  startRoute,
  pauseRoute,
  completeRoute,
  checkInAtStop,
  getDriverPerformance,
  getDriverMessages,
  sendMessage,
  sendBulkMessage,
};
