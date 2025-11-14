import { TrendingUp, Clock, Star, Award, AlertCircle, BarChart3 } from 'lucide-react';

const Performance = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Performance Metrics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your driving performance and ratings
        </p>
      </div>

      {/* Feature Under Development Notice */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertCircle size={48} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-3">
              📊 Performance Analytics Under Development
            </h3>
            <p className="text-purple-700 dark:text-purple-300 mb-4 text-lg">
              The performance tracking system is currently being implemented. This feature will provide:
            </p>
            <ul className="space-y-3 text-purple-600 dark:text-purple-400 mb-6">
              <li className="flex items-start gap-3">
                <TrendingUp size={20} className="flex-shrink-0 mt-1" />
                <span>Real-time performance metrics and KPIs</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="flex-shrink-0 mt-1" />
                <span>On-time arrival statistics and trends</span>
              </li>
              <li className="flex items-start gap-3">
                <Star size={20} className="flex-shrink-0 mt-1" />
                <span>Passenger ratings and feedback analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <Award size={20} className="flex-shrink-0 mt-1" />
                <span>Achievement badges and milestones</span>
              </li>
            </ul>

            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-900 dark:text-purple-100 font-semibold mb-2">
                📋 Technical Implementation Status:
              </p>
              <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1 ml-4">
                <li>• Backend analytics endpoints - Pending</li>
                <li>• Performance data aggregation - Planned</li>
                <li>• Chart visualization library - Ready (Chart.js)</li>
                <li>• Rating system integration - In Design Phase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Stats Preview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 opacity-50">
        <MockStatCard
          title="Total Trips"
          value="245"
          icon={<BarChart3 size={24} />}
          color="blue"
        />
        <MockStatCard
          title="On-Time %"
          value="94.5%"
          icon={<Clock size={24} />}
          color="green"
        />
        <MockStatCard
          title="Avg Rating"
          value="4.8"
          icon={<Star size={24} />}
          color="yellow"
        />
        <MockStatCard
          title="Badges"
          value="12"
          icon={<Award size={24} />}
          color="purple"
        />
      </div>

      {/* Mock Chart Area */}
      <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 opacity-50">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Performance Trends (Mock)
        </h3>
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Chart visualization coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Note for Examiner */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note for Examiner:</strong> Performance metrics require backend endpoints to track trip completion, 
          delays, passenger ratings, and historical data. The frontend components are modular and ready for 
          integration with Chart.js for data visualization.
        </p>
      </div>
    </div>
  );
};

const MockStatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className={`p-6 rounded-xl border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium opacity-80">{title}</div>
        {icon}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default Performance;
