import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', showCloseButton = true, className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ❌ OLD ISSUE: AnimatePresence with isOpen condition was causing render issues
  // ✅ FIX: Return null if not open (simple and reliable)
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto pointer-events-auto animate-slideUp ${className}`}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border-b border-teal-200 dark:border-teal-800 px-6 py-4 rounded-t-xl z-10">
              {title && <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-100">{title}</h3>}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-teal-100 dark:hover:bg-teal-900/50 rounded-lg transition-colors text-teal-700 dark:text-teal-300"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
