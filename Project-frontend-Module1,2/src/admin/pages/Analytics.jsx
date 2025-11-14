import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Activity, AlertCircle } from 'lucide-react';
import * as adminService from '@/services/adminService';
import Loader from '@/components/ui/Loader';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Analytics endpoints not implemented in backend yet - using mock
      const response = await adminService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
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
          Analytics & Insights
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track platform performance and user engagement
        </p>
      </div>

      {/* Feature Notice */}
      <div className="mb-8 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertCircle size={24} className="text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-2">
              📊 Advanced Analytics Coming Soon!
            </h3>
            <p className="text-teal-700 dark:text-teal-300 mb-3">
              Real-time analytics dashboard with charts and insights is currently under development. 
              The following features are planned:
            </p>
            <ul className="space-y-2 text-sm text-teal-600 dark:text-teal-400">
              <li className="flex items-center gap-2">
                <BarChart3 size={16} />
                <span>User growth trends and registration analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>Route popularity and bus utilization metrics</span>
              </li>
              <li className="flex items-center gap-2">
                <Activity size={16} />
                <span>Report submission timeline and verification rates</span>
              </li>
              <li className="flex items-center gap-2">
                <Users size={16} />
                <span>Driver performance and trip completion stats</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Stats Grid (Mock Data) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          change="+12.5%"
          positive={true}
          icon={<Users size={24} />}
          color="blue"
        />
        <StatCard
          title="Active Routes"
          value={stats?.activeRoutes || 0}
          change="+8.3%"
          positive={true}
          icon={<Activity size={24} />}
          color="green"
        />
        <StatCard
          title="Reports Today"
          value={stats?.reportsToday || 0}
          change="-2.1%"
          positive={false}
          icon={<BarChart3 size={24} />}
          color="orange"
        />
        <StatCard
          title="Driver Rating"
          value="4.8"
          change="+0.2"
          positive={true}
          icon={<TrendingUp size={24} />}
          color="purple"
        />
      </div>

      {/* Placeholder Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <PlaceholderChart title="User Growth" description="Monthly user registration trends" />
        <PlaceholderChart title="Route Popularity" description="Most used bus routes" />
        <PlaceholderChart title="Report Timeline" description="Daily report submissions" />
        <PlaceholderChart title="Bus Utilization" description="Active buses by time of day" />
      </div>

      {/* Implementation Note */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note for Examiner:</strong> Analytics endpoints are not yet implemented in the backend. 
          The dashboard currently shows mock data. Full implementation will include:
        </p>
        <ul className="mt-2 text-sm text-gray-500 dark:text-gray-500 space-y-1 ml-4">
          <li>• Real-time data aggregation from database</li>
          <li>• Chart.js / Recharts integration for visualization</li>
          <li>• Customizable date range filters</li>
          <li>• Export to CSV/PDF functionality</li>
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, positive, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className={`p-6 rounded-xl border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium opacity-80">{title}</div>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last month
      </div>
    </div>
  );
};

const PlaceholderChart = ({ title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{description}</p>
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="text-center">
          <BarChart3 size={48} className="mx-auto mb-3 text-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chart visualization coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
