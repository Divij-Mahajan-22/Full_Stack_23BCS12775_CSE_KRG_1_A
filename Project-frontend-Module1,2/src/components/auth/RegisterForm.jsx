import { useState } from 'react';
import { User, Mail, Lock, Phone, Users, Bus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'PASSENGER',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-5">
        
        {/* Logo & Title */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
            <Bus size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-0.5">
            Create Account 🚀
          </h2>
          <p className="text-gray-400 text-xs">
            Join us to start tracking buses
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          
          {/* Role Selector */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Register as <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'PASSENGER' })}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border-2 transition-all text-xs font-medium ${
                  formData.role === 'PASSENGER'
                    ? 'border-teal-500 bg-teal-500/20 text-teal-300'
                    : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-teal-500/50'
                }`}
              >
                <User size={14} />
                <span>Passenger</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'DRIVER' })}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border-2 transition-all text-xs font-medium ${
                  formData.role === 'DRIVER'
                    ? 'border-teal-500 bg-teal-500/20 text-teal-300'
                    : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-teal-500/50'
                }`}
              >
                <Users size={14} />
                <span>Driver</span>
              </button>
            </div>
          </div>

          <Input
            label="Full Name"
            type="text"
            icon={<User size={16} />}
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
          />

          <Input
            label="Email Address"
            type="email"
            icon={<Mail size={16} />}
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={loading}
          />

          <Input
            label="Phone Number"
            type="tel"
            icon={<Phone size={16} />}
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            helpText="Optional"
            disabled={loading}
          />

          <Input
            label="Password"
            type="password"
            icon={<Lock size={16} />}
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
          />

          <Input
            label="Confirm Password"
            type="password"
            icon={<Lock size={16} />}
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>

          {/* Terms */}
          <p className="text-[10px] text-center text-gray-500 pt-1">
            By signing up, you agree to our{' '}
            <a href="/terms" className="text-teal-400 hover:underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-teal-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>

        {/* Divider */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-gray-800 text-gray-400">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-teal-400 hover:text-teal-300 font-semibold text-xs"
          >
            Sign in instead →
          </Link>
        </div>

        {/* Back to Home */}
        <div className="mt-2 text-center">
          <Link 
            to="/" 
            className="text-xs text-gray-500 hover:text-teal-400"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
