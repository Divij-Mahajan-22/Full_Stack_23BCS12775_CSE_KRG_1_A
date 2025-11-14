import { cn } from '@/utils/helpers';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Table = ({ columns, data, onRowClick, className, sortable = false, striped = true }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedData = sortable && sortConfig.key
    ? [...data].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <div className={cn('w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700', className)}>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={cn(
                    'px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {sortable && column.sortable && sortConfig.key === column.key && (
                      <span className="text-teal-600">
                        {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={cn(
                    'transition-colors',
                    onRowClick && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800',
                    striped && rowIndex % 2 === 1 && 'bg-gray-50/50 dark:bg-gray-800/50'
                  )}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap"
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
        {sortedData.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
            No data available
          </div>
        ) : (
          sortedData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={cn(
                'p-4 bg-white dark:bg-gray-900 transition-colors',
                onRowClick && 'cursor-pointer active:bg-gray-50 dark:active:bg-gray-800'
              )}
            >
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {column.label}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-gray-100 text-right ml-4">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
