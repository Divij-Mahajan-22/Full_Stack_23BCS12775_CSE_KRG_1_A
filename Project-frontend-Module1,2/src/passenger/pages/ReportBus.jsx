import { useState, useEffect } from 'react';
import { AlertCircle, Camera, MapPin, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import * as reportService from '@/services/reportService';
import * as mapService from '@/services/mapService';
import toast from 'react-hot-toast';

const ReportBus = () => {
  const [formData, setFormData] = useState({
    busNumber: '',
    reportType: '',
    description: '',
    photoUrl: '',
  });
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const loc = await mapService.getCurrentLocation();
      setLocation(loc);
    } catch (error) {
      console.error('Failed to get location:', error);
      toast.error('Failed to get your location');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.busNumber.trim()) {
      newErrors.busNumber = 'Bus number is required';
    }

    if (!formData.reportType) {
      newErrors.reportType = 'Please select a report type';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const reportData = {
        busNumber: formData.busNumber.trim(),
        reportType: formData.reportType,
        description: formData.description.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
        photoUrl: formData.photoUrl || null,
      };

      // ✅ BACKEND CONNECTED - Submit report
      const response = await reportService.submitReport(reportData);

      if (response.success) {
        toast.success('Report submitted successfully! 🎉');
        
        // Reset form
        setFormData({
          busNumber: '',
          reportType: '',
          description: '',
          photoUrl: '',
        });
        setErrors({});
      } else {
        toast.error(response.message || 'Failed to submit report');
      }
    } catch (error) {
      console.error('Failed to submit report:', error);
      toast.error('Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Report Bus Issue
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Help improve bus services by reporting issues
        </p>
      </div>

      {/* Location Info */}
      {location?.latitude && location?.longitude && (
        <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
          <div className="flex items-center gap-2 text-teal-900 dark:text-teal-100">
            <MapPin size={20} />
            <span className="text-sm font-medium">
              Your Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      )}


      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="space-y-6">
          {/* Bus Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bus Number *
            </label>
            <input
              type="text"
              value={formData.busNumber}
              onChange={(e) => handleChange('busNumber', e.target.value)}
              placeholder="e.g., PB-01-AB-1234"
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.busNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.busNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.busNumber}</p>
            )}
          </div>

          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Report Type *
            </label>
            <select
              value={formData.reportType}
              onChange={(e) => handleChange('reportType', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.reportType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select a type</option>
              <option value="DELAY">Delay</option>
              <option value="OVERCROWDING">Overcrowding</option>
              <option value="ROUTE_DEVIATION">Route Deviation</option>
              <option value="BREAKDOWN">Breakdown</option>
              <option value="SAFETY_ISSUE">Safety Issue</option>
              <option value="CLEANLINESS">Cleanliness</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.reportType && (
              <p className="mt-1 text-sm text-red-500">{errors.reportType}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the issue in detail..."
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Photo URL (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Photo URL (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.photoUrl}
                onChange={(e) => handleChange('photoUrl', e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <Button
                type="button"
                variant="ghost"
                icon={<Camera size={20} />}
                disabled
              >
                Upload
              </Button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Photo upload feature coming soon
            </p>
          </div>

          {/* Location Error */}
          {errors.location && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.location}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading || !location}
            icon={<Send size={20} />}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </Button>

          {/* Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>Tip:</strong> Your report helps improve bus services. You'll earn trust points for verified reports!
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportBus;
