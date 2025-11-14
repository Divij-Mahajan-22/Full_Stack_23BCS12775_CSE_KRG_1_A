import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Navigation, Bus as BusIcon, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import * as busService from '@/services/busService';
import * as mapService from '@/services/mapService';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';

const TrackBus = () => {
  const [searchParams] = useSearchParams();
  const [busNumber, setBusNumber] = useState(searchParams.get('bus') || '');
  const [busLocation, setBusLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (busNumber && userLocation) {
      handleTrackBus();
    }
  }, [busNumber]);

  const getUserLocation = async () => {
    try {
      const location = await mapService.getCurrentLocation();
      setUserLocation(location);
    } catch (error) {
      console.error('Failed to get location:', error);
      toast.error('Failed to get your location');
    }
  };

  const handleTrackBus = async () => {
    if (!busNumber.trim()) {
      toast.error('Please enter a bus number');
      return;
    }

    try {
      setLoading(true);
      setTracking(true);

      // First, try to get nearby buses to find the bus ID
      if (userLocation) {
        const nearbyResponse = await busService.getNearbyBuses(
          userLocation.latitude,
          userLocation.longitude
        );

        if (nearbyResponse.success && nearbyResponse.data) {
          const bus = nearbyResponse.data.find(
            (b) => b.busNumber.toLowerCase() === busNumber.toLowerCase()
          );

          if (bus) {
            // Fetch specific bus location
            const locationResponse = await busService.getBusLocation(bus.id);
            
            if (locationResponse.success && locationResponse.data) {
              setBusLocation(locationResponse.data);
              toast.success(`Found bus ${busNumber}!`);
            } else {
              toast.error('Bus location not available');
              setBusLocation(null);
            }
          } else {
            toast.error(`Bus ${busNumber} not found nearby`);
            setBusLocation(null);
          }
        }
      } else {
        toast.error('User location not available');
      }
    } catch (error) {
      console.error('Failed to track bus:', error);
      toast.error('Failed to track bus');
      setBusLocation(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (busNumber) {
      handleTrackBus();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Track Bus
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find your bus in real-time
        </p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter Bus Number
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            placeholder="e.g., PB-01-AB-1234"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleTrackBus()}
          />
          <Button
            variant="primary"
            onClick={handleTrackBus}
            disabled={loading}
            icon={<Navigation size={20} />}
          >
            {loading ? 'Tracking...' : 'Track'}
          </Button>
        </div>
      </div>

      {/* User Location - WITH NULL CHECKS */}
      {userLocation && userLocation.latitude != null && userLocation.longitude != null && (
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800 mb-6">
          <div className="flex items-center gap-2 text-teal-900 dark:text-teal-100">
            <MapPin size={20} />
            <span className="text-sm font-medium">
              Your Location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      )}

      {/* Bus Location */}
      {tracking && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader />
            </div>
          ) : busLocation ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BusIcon size={24} className="text-teal-600 dark:text-teal-400" />
                  Bus {busNumber}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  icon={<RefreshCw size={16} />}
                >
                  Refresh
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Latitude</p>
                    <p className="font-mono font-semibold text-gray-900 dark:text-white">
                      {busLocation.latitude != null ? busLocation.latitude.toFixed(6) : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Longitude</p>
                    <p className="font-mono font-semibold text-gray-900 dark:text-white">
                      {busLocation.longitude != null ? busLocation.longitude.toFixed(6) : 'N/A'}
                    </p>
                  </div>
                </div>

                {busLocation.lastUpdated && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {new Date(busLocation.lastUpdated).toLocaleString('en-IN')}
                  </p>
                )}

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    🗺️ <strong>Note:</strong> Map visualization coming soon! For now, you can use these coordinates in Google Maps or any map app.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <BusIcon size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Bus not found or location unavailable
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Make sure the bus is currently active
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackBus;
