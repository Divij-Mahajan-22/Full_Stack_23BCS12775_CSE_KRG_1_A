import { MapPin, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const ReportCard = ({ report, onClick }) => {
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'VERIFIED':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return <AlertCircle size={16} />;
      case 'VERIFIED':
        return <CheckCircle size={16} />;
      case 'REJECTED':
        return <XCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-teal-400 dark:hover:border-teal-600"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
            Report #{report.id}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <User size={14} />
            <span>{report.reporterName || 'Anonymous'}</span>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
          {getStatusIcon(report.status)}
          {report.status}
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {report.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-teal-100 dark:border-teal-900">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin size={14} />
          <span>Bus #{report.busNumber || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
          <Clock size={14} />
          <span>{new Date(report.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
