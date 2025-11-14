const StatsCard = ({ title, value, icon, color, trend }) => {
  const colorClasses = {
    teal: {
      bg: 'bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20',
      border: 'border-teal-200 dark:border-teal-800',
      iconBg: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      textColor: 'text-teal-900 dark:text-teal-100',
      valueColor: 'text-teal-900 dark:text-teal-100',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      border: 'border-green-200 dark:border-green-800',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      textColor: 'text-green-900 dark:text-green-100',
      valueColor: 'text-green-900 dark:text-green-100',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-900 dark:text-blue-100',
      valueColor: 'text-blue-900 dark:text-blue-100',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      textColor: 'text-purple-900 dark:text-purple-100',
      valueColor: 'text-purple-900 dark:text-purple-100',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
      border: 'border-orange-200 dark:border-orange-800',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      textColor: 'text-orange-900 dark:text-orange-100',
      valueColor: 'text-orange-900 dark:text-orange-100',
    },
  };

  const styles = colorClasses[color] || colorClasses.teal;

  return (
    <div
      className={`${styles.bg} ${styles.border} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
    >
      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-4">
        <p className={`text-sm font-medium ${styles.textColor} opacity-80`}>{title}</p>
        <div className={`${styles.iconBg} ${styles.iconColor} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-end justify-between">
        <h3 className={`text-4xl font-bold ${styles.valueColor}`}>{value}</h3>
        
        {/* Trend Indicator (Optional) */}
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trend.direction === 'up' ? '↑' : '↓'}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>

      {/* Additional Info (Optional) */}
      {trend && trend.label && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {trend.label}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
