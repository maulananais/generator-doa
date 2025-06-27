import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
};

interface LoadingStateProps {
  message: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
      <LoadingSpinner size="lg" className="mx-auto mb-4 text-blue-500" />
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
};
