import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DataTable from '@/admin/components/DataTable';
import * as adminService from '@/services/adminService';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';

const ValidateReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllReports();
      setReports(response.data || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleValidate = async (reportId, approved) => {
    try {
      const points = approved ? 10 : 0;
      await adminService.validateReport(reportId, { approved, points });
      toast.success(approved ? 'Report approved! User earned 10 points' : 'Report rejected');
      setIsModalOpen(false);
      fetchReports();
    } catch (error) {
      console.error('Failed to validate report:', error);
      toast.error('Failed to validate report');
    }
  };

  const columns = [
    {
      header: 'Report ID',
      accessor: 'id',
      cell: (report) => (
        <span className="font-mono text-sm text-teal-600 dark:text-teal-400">
          #{report.id?.toString().slice(-6)}
        </span>
      ),
    },
    {
      header: 'User',
      accessor: 'userId',
      cell: (report) => report.userName || `User #${report.userId}`,
    },
    {
      header: 'Bus',
      accessor: 'busNumber',
    },
    {
      header: 'Type',
      accessor: 'reportType',
      cell: (report) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {report.reportType}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (report) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            report.status === 'VERIFIED'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : report.status === 'REJECTED'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}
        >
          {report.status}
        </span>
      ),
    },
    {
      header: 'Verifications',
      accessor: 'verificationCount',
      cell: (report) => `${report.verificationCount || 0}/3`,
    },
    {
      header: 'Submitted',
      accessor: 'createdAt',
      cell: (report) => {
        if (!report.createdAt) return 'N/A';
        return new Date(report.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
        });
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (report) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleView(report)}
            icon={<Eye size={16} />}
          >
            View
          </Button>
          {report.status === 'PENDING' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleValidate(report.id, true)}
                icon={<CheckCircle size={16} />}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                Approve
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleValidate(report.id, false)}
                icon={<XCircle size={16} />}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

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
          Validate Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and approve passenger-submitted reports
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-1">
            Pending
          </div>
          <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
            {reports.filter((r) => r.status === 'PENDING').length}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-sm text-green-600 dark:text-green-400 mb-1">
            Verified
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {reports.filter((r) => r.status === 'VERIFIED').length}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <div className="text-sm text-red-600 dark:text-red-400 mb-1">
            Rejected
          </div>
          <div className="text-2xl font-bold text-red-700 dark:text-red-300">
            {reports.filter((r) => r.status === 'REJECTED').length}
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={reports} />

      {/* View Report Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report Details"
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Report ID</p>
                <p className="font-semibold">#{selectedReport.id?.toString().slice(-6)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-semibold capitalize">{selectedReport.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bus Number</p>
                <p className="font-semibold">{selectedReport.busNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                <p className="font-semibold">{selectedReport.reportType}</p>
              </div>
            </div>

            {selectedReport.description && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</p>
                <p className="text-gray-900 dark:text-white">{selectedReport.description}</p>
              </div>
            )}

            {selectedReport.status === 'PENDING' && (
              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  onClick={() => handleValidate(selectedReport.id, true)}
                  fullWidth
                  icon={<CheckCircle size={20} />}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve (+10 points)
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleValidate(selectedReport.id, false)}
                  fullWidth
                  icon={<XCircle size={20} />}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ValidateReports;
