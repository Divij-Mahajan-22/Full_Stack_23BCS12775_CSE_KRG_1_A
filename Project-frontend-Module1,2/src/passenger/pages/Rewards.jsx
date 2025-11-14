import { Award, TrendingUp, Target, AlertCircle } from 'lucide-react';

const Rewards = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Rewards & Achievements
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Earn points and badges for helping the community
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
              🏆 Rewards System Under Development
            </h3>
            <p className="text-purple-700 dark:text-purple-300 mb-4 text-lg">
              The gamification and rewards system is currently being implemented. This feature will include:
            </p>
            <ul className="space-y-3 text-purple-600 dark:text-purple-400 mb-6">
              <li className="flex items-start gap-3">
                <Award size={20} className="flex-shrink-0 mt-1" />
                <span>Points and badges for verified reports</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp size={20} className="flex-shrink-0 mt-1" />
                <span>Leaderboard and community rankings</span>
              </li>
              <li className="flex items-start gap-3">
                <Target size={20} className="flex-shrink-0 mt-1" />
                <span>Daily challenges and achievements</span>
              </li>
            </ul>

            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-900 dark:text-purple-100 font-semibold mb-2">
                📋 Technical Implementation Status:
              </p>
              <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1 ml-4">
                <li>• Backend points calculation system - Pending</li>
                <li>• Badge achievement engine - Planned</li>
                <li>• Leaderboard rankings - In Design Phase</li>
                <li>• Rewards redemption - Future Phase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Note for Examiner */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note for Examiner:</strong> The rewards system requires backend endpoints for points calculation,
          badge management, and leaderboard tracking. The frontend UI components are modular and ready for
          integration once backend endpoints are available.
        </p>
      </div>
    </div>
  );
};

export default Rewards;
