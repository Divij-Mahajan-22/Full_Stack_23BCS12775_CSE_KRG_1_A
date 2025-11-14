import { useState } from 'react';
import { Bus, Save, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const BusForm = ({ bus, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    busNumber: bus?.busNumber || '',
    capacity: bus?.capacity || '',
    model: bus?.model || '',
    registrationNumber: bus?.registrationNumber || '',
    status: bus?.status || 'ACTIVE',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.busNumber.trim()) {
      newErrors.busNumber = 'Bus number is required';
    }

    if (!formData.capacity || formData.capacity < 1) {
      newErrors.capacity = 'Valid capacity is required';
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Convert capacity to integer for backend
      const submitData = {
        ...formData,
        capacity: parseInt(formData.capacity),
      };
      onSubmit(submitData);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Bus Number"
        type="text"
        value={formData.busNumber}
        onChange={(e) => handleChange('busNumber', e.target.value)}
        placeholder="PB-01-AB-1234"
        required
        error={errors.busNumber}
        icon={<Bus size={20} />}
      />

      <Input
        label="Capacity (Seats)"
        type="number"
        value={formData.capacity}
        onChange={(e) => handleChange('capacity', e.target.value)}
        placeholder="45"
        required
        error={errors.capacity}
        min="1"
      />

      <Input
        label="Model"
        type="text"
        value={formData.model}
        onChange={(e) => handleChange('model', e.target.value)}
        placeholder="Volvo B9R"
      />

      <Input
        label="Registration Number"
        type="text"
        value={formData.registrationNumber}
        onChange={(e) => handleChange('registrationNumber', e.target.value)}
        placeholder="PB01AB1234"
        required
        error={errors.registrationNumber}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="OUT_OF_SERVICE">Out of Service</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          icon={<Save size={20} />}
          fullWidth
        >
          {bus ? 'Update Bus' : 'Create Bus'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          icon={<X size={20} />}
          fullWidth
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BusForm;
