import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, UserCheck, Bus as BusIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DriverForm from '@/admin/components/DriverForm';
import DataTable from '@/admin/components/DataTable';
import * as adminService from '@/services/adminService';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [assignData, setAssignData] = useState({ busId: '', routeId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [driversRes, busesRes, routesRes] = await Promise.all([
        adminService.getAllDrivers(),
        adminService.getAllBuses(),
        adminService.getAllRoutes(),
      ]);
      setDrivers(driversRes.data || []);
      setBuses(busesRes.data || []);
      setRoutes(routesRes.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load drivers');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedDriver(null);
    setIsModalOpen(true);
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleDelete = async (driver) => {
    if (!confirm(`Are you sure you want to delete driver ${driver.name}?`)) return;

    try {
      await adminService.deleteDriver(driver.id);
      toast.success('Driver deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Failed to delete driver:', error);
      toast.error('Failed to delete driver');
    }
  };

  const handleSubmit = async (driverData) => {
    try {
      if (selectedDriver) {
        await adminService.updateDriver(selectedDriver.id, driverData);
        toast.success('Driver updated successfully');
      } else {
        await adminService.createDriver(driverData);
        toast.success('Driver created successfully');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save driver:', error);
      toast.error('Failed to save driver');
    }
  };

  const handleAssign = (driver) => {
    setSelectedDriver(driver);
    setAssignData({ busId: '', routeId: '' });
    setIsAssignModalOpen(true);
  };

  const handleAssignSubmit = async () => {
    if (!assignData.busId || !assignData.routeId) {
      toast.error('Please select both bus and route');
      return;
    }

    try {
      await adminService.assignDriver(selectedDriver.id, assignData);
      toast.success('Driver assigned successfully');
      setIsAssignModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to assign driver:', error);
      toast.error('Failed to assign driver');
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (driver) => (
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {driver.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {driver.email}
          </div>
        </div>
      ),
    },
    {
      header: 'License',
      accessor: 'licenseNumber',
      cell: (driver) => driver.licenseNumber || 'N/A',
    },
    {
      header: 'Experience',
      accessor: 'experienceYears',
      cell: (driver) => `${driver.experienceYears || 0} years`,
    },
    {
      header: 'Contact',
      accessor: 'phone',
      cell: (driver) => driver.phone || 'N/A',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (driver) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            driver.status === 'ACTIVE'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
          }`}
        >
          {driver.status || 'ACTIVE'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (driver) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAssign(driver)}
            icon={<BusIcon size={16} />}
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20"
          >
            Assign
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(driver)}
            icon={<Edit size={16} />}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(driver)}
            icon={<Trash2 size={16} />}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Delete
          </Button>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Drivers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, and assign drivers to buses
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={handleCreate}
        >
          Add New Driver
        </Button>
      </div>

      <DataTable columns={columns} data={drivers} />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDriver ? 'Edit Driver' : 'Add New Driver'}
      >
        <DriverForm
          driver={selectedDriver}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Assign Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title={`Assign Bus & Route to ${selectedDriver?.name}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Bus
            </label>
            <select
              value={assignData.busId}
              onChange={(e) => setAssignData({ ...assignData, busId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select a bus</option>
              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.busNumber} ({bus.capacity} seats)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Route
            </label>
            <select
              value={assignData.routeId}
              onChange={(e) => setAssignData({ ...assignData, routeId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select a route</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.routeNumber} - {route.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="primary"
              onClick={handleAssignSubmit}
              fullWidth
              icon={<UserCheck size={20} />}
            >
              Assign
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsAssignModalOpen(false)}
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

export default ManageDrivers;
