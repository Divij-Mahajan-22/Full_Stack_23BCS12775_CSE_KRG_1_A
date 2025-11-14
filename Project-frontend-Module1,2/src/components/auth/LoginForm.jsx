import { useState } from 'react';
import { Mail, Lock, Bus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setLoading(true);
    
    try {
      await login({
        email: formData.email,
        password: formData.password
      });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6">
        
        {/* Logo & Title */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <Bus size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">
            Welcome Back! 👋
          </h2>
          <p className="text-gray-400 text-xs">
            Sign in to continue tracking buses
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
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
            label="Password"
            type="password"
            icon={<Lock size={16} />}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-xs text-teal-400 hover:text-teal-300 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-gray-800 text-gray-400">
              New here?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-400 text-xs">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-teal-400 hover:text-teal-300 font-semibold"
            >
              Create one →
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-3 text-center">
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

export default LoginForm;
