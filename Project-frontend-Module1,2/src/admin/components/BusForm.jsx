import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

const BusForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
      busNumber: '',
      capacity: '',
      type: 'STANDARD',
      plateNumber: '',
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Bus' : 'Add New Bus'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-2">
            Bus Number *
          </label>
          <Input
            name="busNumber"
            placeholder="e.g., BUS-001"
            value={formData.busNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-2">
            Plate Number *
          </label>
          <Input
            name="plateNumber"
            placeholder="e.g., DL1CAA1234"
            value={formData.plateNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-2">
            Capacity *
          </label>
          <Input
            type="number"
            name="capacity"
            placeholder="e.g., 50"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-2">
            Bus Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-teal-300 dark:border-teal-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="STANDARD">Standard</option>
            <option value="AC">AC</option>
            <option value="LUXURY">Luxury</option>
            <option value="ELECTRIC">Electric</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            {initialData ? 'Update Bus' : 'Add Bus'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BusForm;
