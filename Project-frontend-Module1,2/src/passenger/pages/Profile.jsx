import { useState, useEffect } from 'react';
import { User, Mail, Phone, Award, Save, Edit2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/config/api.config';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      // ✅ BACKEND CONNECTED - Update profile
      const response = await api.put(API_ENDPOINTS.USER.UPDATE_PROFILE, updateData);

      if (response.success && response.data) {
        // Update user in context
        updateUser(response.data);
        toast.success('Profile updated successfully!');
        setEditing(false);
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User size={40} className="text-teal-600" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-teal-100">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-900">
          <StatItem title="Trust Score" value={user.trustScore || 0} icon={<Award size={20} />} />
          <StatItem title="Reports" value={user.reportsSubmitted || 0} />
          <StatItem title="Rank" value={`#${user.rank || 'N/A'}`} />
        </div>

        {/* Profile Information */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Personal Information
            </h3>
            {!editing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditing(true)}
                icon={<Edit2 size={16} />}
              >
                Edit
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <User size={20} className="text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{user.name}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              {editing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{user.email}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <Phone size={20} className="text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {user.phone || 'Not provided'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {editing && (
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={loading}
                icon={<Save size={20} />}
                fullWidth
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                  });
                }}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Member since:</strong> {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN')}
        </p>
      </div>
    </div>
  );
};

const StatItem = ({ title, value, icon }) => {
  return (
    <div className="text-center">
      {icon && <div className="flex justify-center mb-2 text-teal-600 dark:text-teal-400">{icon}</div>}
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    </div>
  );
};

export default Profile;
