import { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

const Input = forwardRef(({
  label,
  error,
  icon,
  helpText,
  className,
  containerClassName,
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className="block text-xs font-medium text-gray-400 mb-1.5">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-3 py-2 bg-gray-700 text-white text-sm border border-gray-600 rounded-lg',
            'placeholder:text-gray-500 placeholder:text-sm',
            'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200',
            icon && 'pl-9',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>

      {helpText && !error && (
        <p className="mt-1 text-[10px] text-gray-500">
          {helpText}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-[10px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
