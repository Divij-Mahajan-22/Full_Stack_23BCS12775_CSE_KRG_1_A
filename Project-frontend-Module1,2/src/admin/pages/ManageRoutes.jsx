import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import RouteForm from '@/admin/components/RouteForm';
import DataTable from '@/admin/components/DataTable';
import * as adminService from '@/services/adminService';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllRoutes();
      setRoutes(response.data || []);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
      toast.error('Failed to load routes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedRoute(null);
    setIsModalOpen(true);
  };

  const handleEdit = (route) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleDelete = async (route) => {
    if (!confirm(`Are you sure you want to delete route ${route.routeNumber}?`)) return;

    try {
      await adminService.deleteRoute(route.id);
      toast.success('Route deleted successfully');
      fetchRoutes();
    } catch (error) {
      console.error('Failed to delete route:', error);
      toast.error('Failed to delete route');
    }
  };

  const handleSubmit = async (routeData) => {
    try {
      if (selectedRoute) {
        await adminService.updateRoute(selectedRoute.id, routeData);
        toast.success('Route updated successfully');
      } else {
        await adminService.createRoute(routeData);
        toast.success('Route created successfully');
      }
      setIsModalOpen(false);
      fetchRoutes();
    } catch (error) {
      console.error('Failed to save route:', error);
      toast.error('Failed to save route');
    }
  };

  const columns = [
    {
      header: 'Route Number',
      accessor: 'routeNumber',
      cell: (route) => (
        <span className="font-semibold text-teal-600 dark:text-teal-400">
          {route.routeNumber}
        </span>
      ),
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Start - End',
      accessor: 'locations',
      cell: (route) => (
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-gray-400" />
          <span>{route.startLocation} → {route.endLocation}</span>
        </div>
      ),
    },
    {
      header: 'Distance',
      accessor: 'totalDistance',
      cell: (route) => `${route.totalDistance} km`,
    },
    {
      header: 'Duration',
      accessor: 'estimatedDuration',
      cell: (route) => `${route.estimatedDuration} min`,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (route) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(route)}
            icon={<Edit size={16} />}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(route)}
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
            Manage Routes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure bus routes and stops
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={handleCreate}
        >
          Add New Route
        </Button>
      </div>

      <DataTable columns={columns} data={routes} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRoute ? 'Edit Route' : 'Add New Route'}
      >
        <RouteForm
          route={selectedRoute}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ManageRoutes;
