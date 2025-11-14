import { useState, useEffect } from 'react';
import { Users, Bus, MapPin, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import StatsCard from '@/admin/components/StatsCard';
import * as adminService from '@/services/adminService';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // ✅ Fetch real data from backend
      const [busesRes, routesRes, usersRes, reportsRes] = await Promise.all([
        adminService.getAllBuses(),
        adminService.getAllRoutes(),
        adminService.getAllUsers(),
        adminService.getAllReports(),
      ]);

      const buses = busesRes.data || [];
      const routes = routesRes.data || [];
      const users = usersRes.data || [];
      const reports = reportsRes.data || [];

      // Calculate stats from real data
      setStats({
        totalUsers: users.length,
        totalBuses: buses.length,
        totalRoutes: routes.length,
        pendingReports: reports.filter(r => r.status === 'PENDING').length,
        activeBuses: buses.filter(b => b.status === 'ACTIVE').length,
        activeDrivers: users.filter(u => u.role === 'DRIVER').length,
      });

    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      toast.error('Failed to load dashboard data');
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
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your bus tracking system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={<Users size={24} />}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Active Buses"
          value={`${stats?.activeBuses || 0}/${stats?.totalBuses || 0}`}
          icon={<Bus size={24} />}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Total Routes"
          value={stats?.totalRoutes || 0}
          icon={<MapPin size={24} />}
          trend={{ value: 3, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Pending Reports"
          value={stats?.pendingReports || 0}
          icon={<FileText size={24} />}
          trend={{ value: 5, isPositive: false }}
          color="orange"
        />
        <StatsCard
          title="Active Drivers"
          value={stats?.activeDrivers || 0}
          icon={<TrendingUp size={24} />}
          trend={{ value: 10, isPositive: true }}
          color="teal"
        />
        <StatsCard
          title="System Status"
          value="Operational"
          icon={<AlertCircle size={24} />}
          color="green"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Manage Fleet"
          description="Add, edit, or remove buses"
          link="/admin/fleet"
          icon={<Bus size={20} />}
          color="blue"
        />
        <QuickActionCard
          title="Manage Routes"
          description="Configure bus routes"
          link="/admin/routes"
          icon={<MapPin size={20} />}
          color="green"
        />
        <QuickActionCard
          title="Manage Drivers"
          description="View and assign drivers"
          link="/admin/drivers"
          icon={<Users size={20} />}
          color="purple"
        />
        <QuickActionCard
          title="Validate Reports"
          description="Review pending reports"
          link="/admin/reports"
          icon={<FileText size={20} />}
          color="orange"
        />
      </div>
    </div>
  );
};

const QuickActionCard = ({ title, description, link, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30',
  };

  return (
    <a
      href={link}
      className={`p-6 rounded-xl transition-all duration-200 ${colorClasses[color]} border border-transparent hover:border-current`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </a>
  );
};

export default AdminDashboard;
