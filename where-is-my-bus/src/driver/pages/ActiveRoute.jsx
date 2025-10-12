import { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { startRoute, pauseRoute, completeRoute, checkInAtStop } from '@/services/driverService';
import { getAllRoutes } from '@/services/busService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BaseMap from '@/components/map/BaseMap';
import MapMarker from '@/components/map/MapMarker';
import RouteControl from '@/driver/components/RouteControl';
import StopsList from '@/driver/components/StopsList';
import { ROUTE_STATUS } from '@/utils/constants';

const ActiveRoute = () => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeStatus, setRouteStatus] = useState(ROUTE_STATUS.ACTIVE);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [checkedStops, setCheckedStops] = useState([]);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const response = await getAllRoutes();
      setRoutes(response.data);
      if (response.data.length > 0) {
        setSelectedRoute(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    }
  };

  const handleStartRoute = async () => {
    try {
      await startRoute(user.id, { routeId: selectedRoute.id });
      setRouteStatus(ROUTE_STATUS.ACTIVE);
      toast.success('Route started successfully!');
    } catch (error) {
      toast.error('Failed to start route');
    }
  };

  const handlePauseRoute = async () => {
    try {
      await pauseRoute(user.id);
      setRouteStatus(ROUTE_STATUS.PAUSED);
      toast.success('Route paused');
    } catch (error) {
      toast.error('Failed to pause route');
    }
  };

  const handleCompleteRoute = async () => {
    try {
      await completeRoute(user.id);
      setRouteStatus(ROUTE_STATUS.COMPLETED);
      setCheckedStops([]);
      setCurrentStopIndex(0);
      toast.success('Route completed! Great job! 🎉');
    } catch (error) {
      toast.error('Failed to complete route');
    }
  };

  const handleCheckIn = async (stop) => {
    try {
      await checkInAtStop(user.id, stop.id);
      setCheckedStops([...checkedStops, stop.id]);
      setCurrentStopIndex(currentStopIndex + 1);
      toast.success(`Checked in at ${stop.name}`);
    } catch (error) {
      toast.error('Failed to check in');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">
              Active Route Management
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Route Controls */}
              <div className="lg:col-span-1 space-y-4">
                <Card>
                  <h2 className="text-lg font-semibold mb-4">Route Controls</h2>
                  <RouteControl
                    status={routeStatus}
                    onStart={handleStartRoute}
                    onPause={handlePauseRoute}
                    onComplete={handleCompleteRoute}
                  />
                </Card>

                <Card>
                  <h2 className="text-lg font-semibold mb-4">Route Info</h2>
                  {selectedRoute && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Route Number</p>
                        <p className="font-semibold text-lg">{selectedRoute.routeNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Route Name</p>
                        <p className="font-medium">{selectedRoute.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Distance</p>
                        <p className="font-medium">{selectedRoute.distance} km</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Stops</p>
                        <p className="font-medium">{selectedRoute.stops.length}</p>
                      </div>
                    </div>
                  )}
                </Card>

                <Card>
                  <h2 className="text-lg font-semibold mb-4">Stops Checklist</h2>
                  {selectedRoute && (
                    <StopsList
                      stops={selectedRoute.stops}
                      checkedStops={checkedStops}
                      currentStopIndex={currentStopIndex}
                      onCheckIn={handleCheckIn}
                      disabled={routeStatus !== ROUTE_STATUS.ACTIVE}
                    />
                  )}
                </Card>
              </div>

              {/* Map */}
              <div className="lg:col-span-2">
                <Card padding="none" className="overflow-hidden">
                  <BaseMap 
                    center={selectedRoute?.stops[0] ? [selectedRoute.stops[0].lat, selectedRoute.stops[0].lng] : [28.6139, 77.2090]}
                    zoom={12}
                    className="h-[800px] w-full"
                  >
                    {selectedRoute?.stops.map((stop, index) => (
                      <MapMarker
                        key={stop.id}
                        position={[stop.lat, stop.lng]}
                        title={stop.name}
                        description={`Stop ${index + 1} of ${selectedRoute.stops.length}`}
                      >
                        <div className="space-y-1">
                          <p className="font-semibold">{stop.name}</p>
                          <p className="text-sm">Stop #{stop.order}</p>
                          {checkedStops.includes(stop.id) && (
                            <p className="text-xs text-green-600 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Checked In
                            </p>
                          )}
                        </div>
                      </MapMarker>
                    ))}
                  </BaseMap>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRoute;
