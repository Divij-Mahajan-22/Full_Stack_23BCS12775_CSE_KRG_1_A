import api from './api';
import { API_ENDPOINTS, apiConfig } from '@/config/api.config';

const isMockMode = apiConfig.mockMode;

// ============= REPORT SUBMISSION =============

export const submitReport = async (reportData) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - submitReport');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      data: {
        id: 'report-' + Date.now(),
        ...reportData,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      },
    };
  }

  // ✅ BACKEND CONNECTED - POST /api/reports (PASSENGER)
  // Body: { busNumber, reportType, description, latitude, longitude, photoUrl }
  return api.post(API_ENDPOINTS.REPORT.SUBMIT, reportData);
};

export const verifyReport = async (reportId) => {
  if (isMockMode) {
    console.log('⚠️ Mock mode - verifyReport');
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      message: 'Report verified successfully',
    };
  }

  // ✅ BACKEND CONNECTED - POST /api/reports/{id}/verify (PASSENGER)
  return api.post(API_ENDPOINTS.REPORT.VERIFY(reportId));
};

// ============= REPORT HISTORY (NOT IMPLEMENTED IN BACKEND) =============

export const getMyReports = async (userId) => {
  console.log('⚠️ Backend endpoint NOT IMPLEMENTED - getMyReports');
  console.log('📝 Planned endpoint: GET /api/reports/my');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    success: false,
    message: 'Feature under development - Backend endpoint not available',
    data: [],
  };
};

export const getReportById = async (reportId) => {
  console.log('⚠️ Backend endpoint NOT IMPLEMENTED - getReportById');
  console.log('📝 Planned endpoint: GET /api/reports/{id}');
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    success: false,
    message: 'Feature under development - Backend endpoint not available',
    data: null,
  };
};

export const getNearbyReports = async (latitude, longitude) => {
  console.log('⚠️ Backend endpoint NOT IMPLEMENTED - getNearbyReports');
  console.log('📝 Planned endpoint: GET /api/reports/nearby?lat={lat}&lon={lon}');
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    success: false,
    message: 'Feature under development - Backend endpoint not available',
    data: [],
  };
};

export default {
  submitReport,
  verifyReport,
  getMyReports,
  getReportById,
  getNearbyReports,
};
