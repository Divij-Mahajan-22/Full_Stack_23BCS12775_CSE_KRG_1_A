import { useState, useEffect } from 'react';
import { Bus, MapPin, Clock, Activity, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as driverService from '@/services/driverService';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';

const DriverDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await driverService.getDriverDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      toast.error('Failed to load dashboard');
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
          Driver Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's your current assignment and route information.
        </p>
      </div>

      {/* Current Assignment */}
      {dashboard?.assignedBus ? (
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-teal-200 dark:border-teal-800 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-teal-900 dark:text-teal-100">
              Current Assignment
            </h2>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <Bus size={24} className="text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-teal-600 dark:text-teal-400">Bus Number</p>
                <p className="text-lg font-bold text-teal-900 dark:text-teal-100">
                  {dashboard.assignedBus.busNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <MapPin size={24} className="text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-teal-600 dark:text-teal-400">Route</p>
                <p className="text-lg font-bold text-teal-900 dark:text-teal-100">
                  {dashboard.assignedRoute?.routeNumber || 'Not Assigned'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <Activity size={24} className="text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-teal-600 dark:text-teal-400">Capacity</p>
                <p className="text-lg font-bold text-teal-900 dark:text-teal-100">
                  {dashboard.assignedBus.capacity} seats
                </p>
              </div>
            </div>
          </div>

          {dashboard.assignedRoute && (
            <div className="mt-4 pt-4 border-t border-teal-200 dark:border-teal-800">
              <p className="text-sm text-teal-700 dark:text-teal-300">
                <strong>Route:</strong> {dashboard.assignedRoute.startLocation} → {dashboard.assignedRoute.endLocation}
              </p>
              <p className="text-sm text-teal-700 dark:text-teal-300 mt-1">
                <strong>Distance:</strong> {dashboard.assignedRoute.totalDistance} km • 
                <strong> Duration:</strong> {dashboard.assignedRoute.estimatedDuration} minutes
              </p>
            </div>
          )}

          <div className="mt-6">
            <Link to="/driver/route">
              <button className="w-full md:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors">
                Manage Active Route
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 mb-8">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} className="text-yellow-600 dark:text-yellow-400" />
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
                No Active Assignment
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                You don't have any bus or route assigned yet. Please contact admin.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Trips"
          value={dashboard?.todayTrips || 0}
          icon={<Bus size={24} />}
          color="blue"
        />
        <StatCard
          title="Total Distance"
          value={`${dashboard?.totalDistance || 0} km`}
          icon={<MapPin size={24} />}
          color="green"
        />
        <StatCard
          title="On-Time %"
          value={`${dashboard?.onTimePercentage || 0}%`}
          icon={<Clock size={24} />}
          color="purple"
        />
        <StatCard
          title="Rating"
          value={dashboard?.rating || '0.0'}
          icon={<Activity size={24} />}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          title="Active Route"
          description="View current route and update location"
          link="/driver/route"
          icon={<MapPin size={20} />}
          color="teal"
          available={!!dashboard?.assignedRoute}
        />
        <QuickActionCard
          title="Messages"
          description="Communicate with passengers"
          link="/driver/messages"
          icon={<Activity size={20} />}
          color="blue"
          available={false}
          comingSoon
        />
        <QuickActionCard
          title="Performance"
          description="View your performance metrics"
          link="/driver/performance"
          icon={<Activity size={20} />}
          color="purple"
          available={false}
          comingSoon
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
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

const QuickActionCard = ({ title, description, link, icon, color, available = true, comingSoon = false }) => {
  const colorClasses = {
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/30 border-teal-200 dark:border-teal-800',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800',
  };

  if (!available || comingSoon) {
    return (
      <div className="p-6 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60">
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <h3 className="font-semibold text-gray-600 dark:text-gray-400">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500">{description}</p>
        {comingSoon && (
          <span className="inline-block mt-3 text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
            Coming Soon
          </span>
        )}
      </div>
    );
  }

  return (
    <a
      href={link}
      className={`p-6 rounded-xl border transition-all duration-200 ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </a>
  );
};

export default DriverDashboard;
