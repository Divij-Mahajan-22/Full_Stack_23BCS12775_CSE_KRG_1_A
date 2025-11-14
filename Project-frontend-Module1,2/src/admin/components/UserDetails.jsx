import { X, Mail, Phone, Calendar, Shield, User as UserIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const UserDetails = ({ user, isOpen, onClose, onBan, onUnban }) => {
  if (!isOpen || !user) return null;

  const getRoleBadge = (role) => {
    const roleColors = {
      ADMIN: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      DRIVER: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
      PASSENGER: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    };
    return roleColors[role] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 p-6 border-b border-teal-200 dark:border-teal-800">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-teal-900 dark:text-teal-100 mb-2">
                User Details
              </h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(user.role)}`}>
                <Shield size={14} />
                {user.role}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-teal-100 dark:hover:bg-teal-900/50 rounded-lg transition-colors text-teal-700 dark:text-teal-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6 border border-teal-200 dark:border-teal-800">
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-4 flex items-center gap-2">
              <UserIcon size={20} />
              Profile Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-teal-600 dark:text-teal-400 mb-1">Full Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-teal-600 dark:text-teal-400 mb-1">Username</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-teal-600 dark:text-teal-400 mb-1 flex items-center gap-1">
                    <Mail size={14} />
                    Email
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-teal-600 dark:text-teal-400 mb-1 flex items-center gap-1">
                    <Phone size={14} />
                    Phone
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{user.phoneNumber || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="border-t border-teal-200 dark:border-teal-800 pt-6">
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-4">
              Account Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <Badge variant={user.isActive ? 'success' : 'error'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                  <Calendar size={14} />
                  Joined
                </p>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-teal-200 dark:border-teal-800">
            {user.isActive ? (
              <Button variant="error" onClick={() => onBan(user.id)} fullWidth>
                Ban User
              </Button>
            ) : (
              <Button variant="success" onClick={() => onUnban(user.id)} fullWidth>
                Unban User
              </Button>
            )}
            <Button variant="secondary" onClick={onClose} fullWidth>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
