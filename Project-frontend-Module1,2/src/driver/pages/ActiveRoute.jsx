import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import * as driverService from '@/services/driverService';
import * as busService from '@/services/busService';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';

const ActiveRoute = () => {
  const [dashboard, setDashboard] = useState(null);
  const [routeStops, setRouteStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingLocation, setUpdatingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetchData();
    getCurrentLocation();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const dashboardRes = await driverService.getDriverDashboard();
      setDashboard(dashboardRes.data);

      if (dashboardRes.data?.assignedRoute?.id) {
        const stopsRes = await driverService.getRouteStops(dashboardRes.data.assignedRoute.id);
        setRouteStops(stopsRes.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load route data');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast.error('Unable to get current location');
        }
      );
    }
  };

  const handleUpdateLocation = async () => {
    if (!currentLocation) {
      toast.error('Location not available');
      return;
    }

    if (!dashboard?.assignedBus?.id) {
      toast.error('No bus assigned');
      return;
    }

    try {
      setUpdatingLocation(true);

      const locationData = {
        busId: dashboard.assignedBus.id,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      };

      await busService.updateBusLocation(locationData);
      toast.success('Location updated successfully!');
      getCurrentLocation(); // Refresh location
    } catch (error) {
      console.error('Failed to update location:', error);
      toast.error('Failed to update location');
    } finally {
      setUpdatingLocation(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!dashboard?.assignedRoute) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} className="text-yellow-600 dark:text-yellow-400" />
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
                No Active Route
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                You don't have any route assigned. Please contact admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Active Route
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your current route and update location
        </p>
      </div>

      {/* Route Info */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Route {dashboard.assignedRoute.routeNumber}
          </h2>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Route Name</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {dashboard.assignedRoute.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Bus Number</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {dashboard.assignedBus.busNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Distance</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {dashboard.assignedRoute.totalDistance} km
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {dashboard.assignedRoute.estimatedDuration} minutes
            </p>
          </div>
        </div>
      </div>

      {/* Location Update */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-teal-200 dark:border-teal-800 mb-6">
        <h3 className="text-lg font-bold text-teal-900 dark:text-teal-100 mb-4">
          Update Location
        </h3>

        {currentLocation ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                <p className="text-sm text-teal-600 dark:text-teal-400 mb-1">Latitude</p>
                <p className="font-mono font-semibold text-teal-900 dark:text-teal-100">
                  {currentLocation.latitude.toFixed(6)}
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                <p className="text-sm text-teal-600 dark:text-teal-400 mb-1">Longitude</p>
                <p className="font-mono font-semibold text-teal-900 dark:text-teal-100">
                  {currentLocation.longitude.toFixed(6)}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleUpdateLocation}
              disabled={updatingLocation}
              icon={<Navigation size={20} />}
              fullWidth
            >
              {updatingLocation ? 'Updating...' : 'Update Bus Location'}
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <Loader />
            <p className="text-sm text-teal-600 dark:text-teal-400 mt-2">
              Getting your location...
            </p>
          </div>
        )}
      </div>

      {/* Route Stops */}
      {routeStops.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Route Stops ({routeStops.length})
          </h3>

          <div className="space-y-3">
            {routeStops.map((stop, index) => (
              <div
                key={stop.id}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {stop.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sequence: {stop.sequence}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={16} className="inline mr-1" />
                  {stop.latitude?.toFixed(4)}, {stop.longitude?.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Notice */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note:</strong> Route control features (Start/Pause/Complete) and check-in system are currently under development and will be available soon.
        </p>
      </div>
    </div>
  );
};

export default ActiveRoute;
