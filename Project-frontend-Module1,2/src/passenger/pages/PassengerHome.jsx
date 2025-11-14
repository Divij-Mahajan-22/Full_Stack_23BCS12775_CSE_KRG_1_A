import { Link } from 'react-router-dom';
import { MapPin, Award, Users, TrendingUp, ArrowRight, Bus, Clock, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const PassengerHome = () => {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Real-Time Tracking',
      description: 'Track your bus live with accurate GPS location updates from the community.',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Earn Rewards',
      description: 'Get points and badges for reporting bus locations and helping others.',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'ETA Predictions',
      description: 'Know exactly when your bus will arrive with AI-powered predictions.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Community Trust',
      description: 'Verified reports from trusted community members ensure accuracy.',
      color: 'from-indigo-500 to-purple-600'
    },
  ];

  const stats = [
    { value: '12K+', label: 'Active Users', icon: <Users className="w-5 h-5" /> },
    { value: '150+', label: 'Bus Routes', icon: <Bus className="w-5 h-5" /> },
    { value: '50K+', label: 'Reports Daily', icon: <TrendingUp className="w-5 h-5" /> },
    { value: '95%', label: 'Accuracy', icon: <Zap className="w-5 h-5" /> },
  ];

  const steps = [
    { 
      step: '1', 
      title: 'Search Your Route', 
      desc: 'Enter your bus number or route to get started',
      icon: <MapPin className="w-6 h-6" />
    },
    { 
      step: '2', 
      title: 'Track in Real-Time', 
      desc: 'See live locations and estimated arrival times',
      icon: <Clock className="w-6 h-6" />
    },
    { 
      step: '3', 
      title: 'Report & Earn', 
      desc: 'Share updates to help others and earn rewards',
      icon: <Award className="w-6 h-6" />
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero Section with Animated Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                <Bus className="w-5 h-5" />
                <span className="text-sm font-medium">Where Is My Bus?</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Never Miss Your
              <br />
              <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Bus Again
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-cyan-50 max-w-2xl mx-auto"
            >
              Track buses in real-time with community-powered updates. Join thousands who never miss their ride.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to={ROUTES.TRACK_BUS}>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <MapPin className="w-5 h-5" />
                  Track Bus Now
                </button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Cards */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-xl mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Gradient Cards */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Us?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Experience the future of public transportation
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-full border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} text-white rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Style */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple steps to never miss your bus
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 -translate-y-1/2"></div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {steps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center relative"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl text-2xl font-bold mx-auto mb-6 shadow-xl relative z-10">
                    {item.step}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-xl mb-4">
                      <div className="text-teal-600 dark:text-teal-400">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-cyan-50 max-w-2xl mx-auto">
              Join thousands of users who never miss their bus anymore. Start tracking today!
            </p>
            <Link to={ROUTES.REGISTER}>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PassengerHome;
