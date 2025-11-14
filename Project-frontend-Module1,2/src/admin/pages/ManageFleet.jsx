import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import BusForm from '@/admin/components/BusForm';
import DataTable from '@/admin/components/DataTable';
import * as adminService from '@/services/adminService';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';

const ManageFleet = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllBuses();
      setBuses(response.data || []);
    } catch (error) {
      console.error('Failed to fetch buses:', error);
      toast.error('Failed to load buses');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedBus(null);
    setIsModalOpen(true);
  };

  const handleEdit = (bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  const handleDelete = async (bus) => {
    if (!confirm(`Are you sure you want to delete bus ${bus.busNumber}?`)) return;

    try {
      await adminService.deleteBus(bus.id);
      toast.success('Bus deleted successfully');
      fetchBuses();
    } catch (error) {
      console.error('Failed to delete bus:', error);
      toast.error('Failed to delete bus');
    }
  };

  const handleSubmit = async (busData) => {
    try {
      if (selectedBus) {
        await adminService.updateBus(selectedBus.id, busData);
        toast.success('Bus updated successfully');
      } else {
        await adminService.createBus(busData);
        toast.success('Bus created successfully');
      }
      setIsModalOpen(false);
      fetchBuses();
    } catch (error) {
      console.error('Failed to save bus:', error);
      toast.error('Failed to save bus');
    }
  };

  const columns = [
    {
      header: 'Bus Number',
      accessor: 'busNumber',
      cell: (bus) => (
        <span className="font-semibold text-teal-600 dark:text-teal-400">
          {bus.busNumber}
        </span>
      ),
    },
    {
      header: 'Capacity',
      accessor: 'capacity',
      cell: (bus) => `${bus.capacity} seats`,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (bus) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            bus.status === 'ACTIVE'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : bus.status === 'MAINTENANCE'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
          }`}
        >
          {bus.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (bus) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(bus)}
            icon={<Edit size={16} />}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(bus)}
            icon={<Trash2 size={16} />}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredBuses = buses.filter((bus) =>
    bus.busNumber?.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Fleet
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, and manage your bus fleet
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={handleCreate}
        >
          Add New Bus
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by bus number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredBuses} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedBus ? 'Edit Bus' : 'Add New Bus'}
      >
        <BusForm
          bus={selectedBus}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ManageFleet;
