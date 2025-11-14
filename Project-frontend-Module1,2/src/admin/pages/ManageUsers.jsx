import { useState, useEffect } from 'react';
import { Search, Award, Ban, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DataTable from '@/admin/components/DataTable';
import UserDetails from '@/admin/components/UserDetails';
import * as adminService from '@/services/adminService';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTrustScore, setNewTrustScore] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTrustScore = (user) => {
    setSelectedUser(user);
    setNewTrustScore(user.trustScore || 0);
    setIsModalOpen(true);
  };

  const handleTrustScoreSubmit = async () => {
    try {
      await adminService.updateTrustScore(selectedUser.id, newTrustScore);
      toast.success('Trust score updated successfully');
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Failed to update trust score:', error);
      toast.error('Failed to update trust score');
    }
  };

  const handleBanUser = async (user) => {
    if (!confirm(`Are you sure you want to ban ${user.name}?`)) return;

    try {
      await adminService.banUser(user.id);
      toast.success('User banned successfully');
      fetchUsers();
    } catch (error) {
      console.error('Failed to ban user:', error);
      toast.error('Failed to ban user');
    }
  };

  const columns = [
    {
      header: 'User',
      accessor: 'name',
      cell: (user) => (
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {user.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: 'role',
      cell: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'ADMIN'
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              : user.role === 'DRIVER'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          }`}
        >
          {user.role}
        </span>
      ),
    },
    {
      header: 'Trust Score',
      accessor: 'trustScore',
      cell: (user) => (
        <div className="flex items-center gap-2">
          <Award size={16} className="text-yellow-500" />
          <span className="font-semibold">{user.trustScore || 0}</span>
        </div>
      ),
    },
    {
      header: 'Reports',
      accessor: 'reportsSubmitted',
      cell: (user) => user.reportsSubmitted || 0,
    },
    {
      header: 'Joined',
      accessor: 'createdAt',
      cell: (user) => {
        if (!user.createdAt) return 'N/A';
        return new Date(user.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (user) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdateTrustScore(user)}
            icon={<Award size={16} />}
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20"
          >
            Score
          </Button>
          {user.role === 'PASSENGER' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleBanUser(user)}
              icon={<Ban size={16} />}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Ban
            </Button>
          )}
        </div>
      ),
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Manage Users
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all platform users
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
            Total Users
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {users.length}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-sm text-green-600 dark:text-green-400 mb-1">
            Passengers
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {users.filter((u) => u.role === 'PASSENGER').length}
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">
            Drivers
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {users.filter((u) => u.role === 'DRIVER').length}
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="text-sm text-orange-600 dark:text-orange-400 mb-1">
            Admins
          </div>
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
            {users.filter((u) => u.role === 'ADMIN').length}
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={filteredUsers} />

      {/* Trust Score Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Update Trust Score for ${selectedUser?.name}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Trust Score
            </label>
            <input
              type="number"
              value={newTrustScore}
              onChange={(e) => setNewTrustScore(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              min="0"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Current: {selectedUser?.trustScore || 0}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleTrustScoreSubmit}
              fullWidth
              icon={<CheckCircle size={20} />}
            >
              Update
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUsers;
