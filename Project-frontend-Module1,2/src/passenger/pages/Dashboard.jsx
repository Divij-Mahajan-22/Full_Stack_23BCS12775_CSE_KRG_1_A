import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bus, Award, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import * as busService from '@/services/busService';
import * as mapService from '@/services/mapService';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [nearbyBuses, setNearbyBuses] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [dataSource, setDataSource] = useState(null); // 'backend' or 'mock'

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      setLoading(true);
      
      // Try to get user location (optional - will use mock data if failed)
      let location = null;
      try {
        location = await mapService.getCurrentLocation();
        setUserLocation(location);
      } catch (locError) {
        console.warn('⚠️ Location unavailable, will use mock data');
        // Don't stop - continue with mock data
      }

      // Fetch buses (will use mock data if backend unavailable)
      const response = location && location.latitude && location.longitude
        ? await busService.getNearbyBuses(location.latitude, location.longitude)
        : await busService.getActiveBuses();

      setNearbyBuses(response.data || []);
      setDataSource(response.source);
      
      // Show appropriate message
      if (response.source === 'mock') {
        toast('📍 Using demo data - Backend not connected', {
          icon: '⚠️',
          duration: 4000
        });
      } else {
        toast.success(`Found ${response.data.length} nearby buses!`);
      }
    } catch (error) {
      console.error('Dashboard error:', error);
      // Even on error, try to show mock data
      const fallback = await busService.getActiveBuses();
      setNearbyBuses(fallback.data || []);
      setDataSource('mock');
      toast.error('Using demo data - Check console for errors');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track buses, report issues, and earn rewards
        </p>
      </div>

      {/* Data Source Indicator */}
      {dataSource === 'mock' && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">
              📡 Demo Mode - Showing sample data (Backend not connected)
            </span>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Trust Score"
          value={user?.trustScore || 0}
          icon={<Award size={24} />}
          color="yellow"
        />
        <StatCard
          title="Reports Submitted"
          value={user?.reportsSubmitted || 0}
          icon={<TrendingUp size={24} />}
          color="blue"
        />
        <StatCard
          title="Nearby Buses"
          value={nearbyBuses.length}
          icon={<Bus size={24} />}
          color="green"
        />
        <StatCard
          title="Your Rank"
          value={"#" + (user?.rank || "N/A")}
          icon={<Award size={24} />}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <QuickActionCard
          title="Track Bus"
          description="Find your bus in real-time"
          onClick={() => navigate('/track')}
          icon={<MapPin size={24} />}
          color="teal"
        />
        <QuickActionCard
          title="Report Issue"
          description="Help improve bus services"
          onClick={() => navigate('/report')}
          icon={<AlertCircle size={24} />}
          color="orange"
        />
        <QuickActionCard
          title="View Rewards"
          description="Check your points and badges"
          onClick={() => navigate('/rewards')}
          icon={<Award size={24} />}
          color="purple"
          comingSoon
        />
      </div>

      {/* User Location */}
      {/* User Location Display */}
      {userLocation && userLocation.latitude && userLocation.longitude && (
        <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
          <div className="flex items-center gap-2 text-teal-900 dark:text-teal-100">
            <MapPin size={20} />
            <span className="text-sm font-medium">
              Your Location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      )}


      {/* Nearby Buses */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Bus size={24} className="text-teal-600 dark:text-teal-400" />
          Nearby Buses {dataSource === 'mock' && <span className="text-sm text-yellow-600 dark:text-yellow-400">(Demo Data)</span>}
        </h2>

        {nearbyBuses.length > 0 ? (
          <div className="space-y-3">
            {nearbyBuses.map((bus) => (
              <div
                key={bus.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => navigate(`/track?bus=${bus.busNumber}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                    <Bus size={24} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Bus {bus.busNumber}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Route: {bus.routeNumber || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {bus.distance ? `${bus.distance.toFixed(1)} km away` : 'Distance N/A'}
                  </p>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {bus.status || 'ACTIVE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bus size={48} className="mx-auto mb-3 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              No buses nearby at the moment
            </p>
            <button
              onClick={initializeDashboard}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// StatCard and QuickActionCard components remain the same...
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className={`p-6 rounded-xl border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium opacity-80">{title}</div>
        {icon}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

const QuickActionCard = ({ title, description, onClick, icon, color, comingSoon = false }) => {
  const colorClasses = {
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/30 border-teal-200 dark:border-teal-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-orange-200 dark:border-orange-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800',
  };

  if (comingSoon) {
    return (
      <div className="p-6 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60">
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <h3 className="font-semibold text-gray-600 dark:text-gray-400">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500">{description}</p>
        <span className="inline-block mt-3 text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-xl border cursor-pointer transition-all duration-200 ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};

export default Dashboard;
