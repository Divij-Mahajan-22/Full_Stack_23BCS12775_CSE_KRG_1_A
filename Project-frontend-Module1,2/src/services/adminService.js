import api from './api';
import { API_ENDPOINTS, apiConfig } from '@/config/api.config';

const isMockMode = apiConfig.mockMode;

// ============= ROUTE MANAGEMENT =============

export const getAllRoutes = async () => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - getAllRoutes');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: [] };
  }
  return api.get(API_ENDPOINTS.ROUTE.GET_ALL);
};

export const createRoute = async (routeData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - createRoute');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: routeData };
  }

  // Real backend - POST /api/routes (ADMIN)
  // Body: { routeNumber, name, startLocation, endLocation, totalDistance, estimatedDuration }
  return api.post(API_ENDPOINTS.ROUTE.CREATE, routeData);
};

export const updateRoute = async (routeId, routeData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - updateRoute');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: routeData };
  }
  return api.put(API_ENDPOINTS.ROUTE.UPDATE(routeId), routeData);
};

export const deleteRoute = async (routeId) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - deleteRoute');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'Route deleted successfully' };
  }
  return api.delete(API_ENDPOINTS.ROUTE.DELETE(routeId));
};

export const addRouteStop = async (routeId, stopData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - addRouteStop');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: stopData };
  }

  // Real backend - POST /api/routes/{id}/stops (ADMIN)
  // Body: { name, sequence, latitude, longitude }
  return api.post(API_ENDPOINTS.ROUTE.ADD_STOP(routeId), stopData);
};

// ============= DRIVER MANAGEMENT =============

export const getAllDrivers = async () => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - getAllDrivers');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: [] };
  }

  // Real backend - GET /api/drivers (ADMIN)
  return api.get(API_ENDPOINTS.DRIVER.GET_ALL);
};

export const createDriver = async (driverData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - createDriver');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: driverData };
  }

  // Real backend - POST /api/drivers (ADMIN)
  // Body: { userId, licenseNumber, experienceYears, contactNumber }
  return api.post(API_ENDPOINTS.DRIVER.CREATE, driverData);
};

export const assignDriver = async (driverId, assignData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - assignDriver');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: assignData };
  }

  // Real backend - POST /api/drivers/{id}/assign (ADMIN)
  // Body: { busId, routeId }
  return api.post(API_ENDPOINTS.DRIVER.ASSIGN(driverId), assignData);
};

export const updateDriver = async (driverId, driverData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - updateDriver');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: driverData };
  }
  return api.put(API_ENDPOINTS.DRIVER.UPDATE(driverId), driverData);
};

export const deleteDriver = async (driverId) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - deleteDriver');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'Driver deleted successfully' };
  }
  return api.delete(API_ENDPOINTS.DRIVER.DELETE(driverId));
};

// ============= FLEET MANAGEMENT =============

export const getAllBuses = async () => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - getAllBuses');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: [] };
  }
  return api.get(API_ENDPOINTS.BUS.GET_ALL);
};

export const createBus = async (busData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - createBus');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: busData };
  }

  // Real backend - POST /api/buses (ADMIN)
  // Body: { busNumber, capacity, model, registrationNumber }
  return api.post(API_ENDPOINTS.BUS.CREATE, busData);
};

export const updateBus = async (busId, busData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - updateBus');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: busData };
  }
  return api.put(API_ENDPOINTS.BUS.UPDATE(busId), busData);
};

export const deleteBus = async (busId) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - deleteBus');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'Bus deleted successfully' };
  }
  return api.delete(API_ENDPOINTS.BUS.DELETE(busId));
};

// ============= USER MANAGEMENT =============

export const getAllUsers = async () => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - getAllUsers');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: [] };
  }
  return api.get(API_ENDPOINTS.USER.GET_ALL);
};

export const updateUser = async (userId, userData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - updateUser');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: userData };
  }
  return api.put(API_ENDPOINTS.USER.UPDATE(userId), userData);
};

export const updateTrustScore = async (userId, score) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - updateTrustScore');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: { userId, trustScore: score } };
  }

  // Real backend - PUT /api/users/{id}/trust-score (ADMIN)
  return api.put(API_ENDPOINTS.USER.UPDATE_TRUST_SCORE(userId), { score });
};

// Ban/Unban - NOT IMPLEMENTED IN BACKEND (uses mock)
export const banUser = async (userId) => {
  console.log('⚠️ Backend endpoint not implemented - banUser (using mock)');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true, message: 'User banned successfully' };
};

export const unbanUser = async (userId) => {
  console.log('⚠️ Backend endpoint not implemented - unbanUser (using mock)');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true, message: 'User unbanned successfully' };
};

// ============= REPORT MANAGEMENT =============

export const getAllReports = async () => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - getAllReports');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: [] };
  }

  // Real backend - GET /api/reports/pending (ADMIN)
  return api.get(API_ENDPOINTS.REPORT.GET_ALL);
};

export const validateReport = async (reportId, validation) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - validateReport');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: { status: 'VERIFIED' } };
  }

  // Real backend - PUT /api/reports/{id}/validate?approved=true&points=10 (ADMIN)
  const { approved, points } = validation;
  return api.put(`${API_ENDPOINTS.REPORT.VALIDATE(reportId)}?approved=${approved}&points=${points || 10}`);
};

export const deleteReport = async (reportId) => {
  console.log('⚠️ Backend endpoint not implemented - deleteReport (using mock)');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true, message: 'Report deleted successfully' };
};

// ============= ANALYTICS (ALL MOCK - NOT IMPLEMENTED) =============

export const getDashboardStats = async () => {
  console.log('⚠️ Analytics endpoint not implemented - using mock data');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    data: {
      totalUsers: 1247,
      activeRoutes: 45,
      reportsToday: 23,
      activeBuses: 87,
    },
  };
};

export const getUserGrowth = async () => {
  console.log('⚠️ Analytics endpoint not implemented - using mock data');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true, data: [] };
};

export const getRoutePopularity = async () => {
  console.log('⚠️ Analytics endpoint not implemented - using mock data');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true, data: [] };
};

export const getReportsTimeline = async () => {
  console.log('⚠️ Analytics endpoint not implemented - using mock data');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true, data: [] };
};

export default {
  // Routes
  getAllRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
  addRouteStop,
  // Drivers
  getAllDrivers,
  createDriver,
  assignDriver,
  updateDriver,
  deleteDriver,
  // Fleet
  getAllBuses,
  createBus,
  updateBus,
  deleteBus,
  // Users
  getAllUsers,
  updateUser,
  banUser,
  unbanUser,
  updateTrustScore,
  // Reports
  getAllReports,
  validateReport,
  deleteReport,
  // Analytics
  getDashboardStats,
  getUserGrowth,
  getRoutePopularity,
  getReportsTimeline,
};
