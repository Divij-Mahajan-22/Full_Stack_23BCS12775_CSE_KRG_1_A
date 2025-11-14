import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { USER_ROLES } from '@/utils/constants';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// ========== AUTH PAGES (src/pages/) ==========
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

// ========== PASSENGER PAGES (src/passenger/pages/) ==========
import PassengerHome from '@/passenger/pages/PassengerHome';
import Dashboard from '@/passenger/pages/Dashboard';
import TrackBus from '@/passenger/pages/TrackBus';
import ReportBus from '@/passenger/pages/ReportBus';
import Rewards from '@/passenger/pages/Rewards';
import Profile from '@/passenger/pages/Profile';

// ========== DRIVER PAGES (src/driver/pages/) ==========
import DriverDashboard from '@/driver/pages/DriverDashboard';
import ActiveRoute from '@/driver/pages/ActiveRoute';
import Messages from '@/driver/pages/Messages';
import Performance from '@/driver/pages/Performance';

// ========== ADMIN PAGES (src/admin/pages/) ==========
import AdminDashboard from '@/admin/pages/AdminDashboard';
import ManageRoutes from '@/admin/pages/ManageRoutes';
import ManageDrivers from '@/admin/pages/ManageDrivers';
import ManageFleet from '@/admin/pages/ManageFleet';
import ManageUsers from '@/admin/pages/ManageUsers';
import ValidateReports from '@/admin/pages/ValidateReports';
import Analytics from '@/admin/pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* ==================== PUBLIC ROUTES ==================== */}
              <Route path="/" element={<PassengerHome />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* ==================== PASSENGER ROUTES ==================== */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/track"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                    <TrackBus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                    <ReportBus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rewards"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                    <Rewards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* ==================== DRIVER ROUTES ==================== */}
              <Route
                path="/driver"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                    <DriverDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/driver/route"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                    <ActiveRoute />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/driver/messages"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                    <Messages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/driver/performance"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                    <Performance />
                  </ProtectedRoute>
                }
              />

              {/* ==================== ADMIN ROUTES ==================== */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/routes"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <ManageRoutes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/drivers"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <ManageDrivers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/fleet"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <ManageFleet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <ValidateReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <Analytics />
                  </ProtectedRoute>
                }
              />

              {/* ==================== 404 ==================== */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">
                      404
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                      Page Not Found
                    </p>
                    <a
                      href="/"
                      className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Go Back Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>

          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#1f2937',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#0f766e',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
