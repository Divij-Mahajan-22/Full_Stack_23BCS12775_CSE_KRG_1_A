import { useState } from 'react';
import { User, Save, X, Phone, Award } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const DriverForm = ({ driver, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: driver?.name || '',
    email: driver?.email || '',
    phone: driver?.phone || '',
    licenseNumber: driver?.licenseNumber || '',
    experienceYears: driver?.experienceYears || '',
    password: '', // Only for new drivers
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!driver && !formData.password) {
      newErrors.password = 'Password is required for new drivers';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    if (!formData.experienceYears || formData.experienceYears < 0) {
      newErrors.experienceYears = 'Valid experience is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber,
        experienceYears: parseInt(formData.experienceYears),
        role: 'DRIVER', // Backend expects role
      };

      // Only include password for new drivers
      if (!driver && formData.password) {
        submitData.password = formData.password;
      }

      onSubmit(submitData);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="John Doe"
        required
        error={errors.name}
        icon={<User size={20} />}
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="john@example.com"
        required
        error={errors.email}
      />

      {!driver && (
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Create a password"
          required
          error={errors.password}
          helpText="At least 6 characters"
        />
      )}

      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        placeholder="+91 98765 43210"
        icon={<Phone size={20} />}
      />

      <Input
        label="License Number"
        type="text"
        value={formData.licenseNumber}
        onChange={(e) => handleChange('licenseNumber', e.target.value)}
        placeholder="DL-1234567890"
        required
        error={errors.licenseNumber}
      />

      <Input
        label="Experience (Years)"
        type="number"
        value={formData.experienceYears}
        onChange={(e) => handleChange('experienceYears', e.target.value)}
        placeholder="5"
        required
        error={errors.experienceYears}
        min="0"
        icon={<Award size={20} />}
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          icon={<Save size={20} />}
          fullWidth
        >
          {driver ? 'Update Driver' : 'Create Driver'}
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

export default DriverForm;
