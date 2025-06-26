import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getStoredApiKey } from '../lib/validateGroqKey';
import { LoadingSpinner } from './Loading';

interface ApiKeyGuardProps {
  children: React.ReactNode;
}

export const ApiKeyGuard: React.FC<ApiKeyGuardProps> = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [hasValidKey, setHasValidKey] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validateAccess = async () => {
      try {
        const apiKey = getStoredApiKey();
        
        if (!apiKey) {
          router.replace('/login');
          return;
        }

        // For now, just check if key exists
        // In a real implementation, you might want to validate with a test request
        setHasValidKey(true);
      } catch (error) {
        console.error('Access validation failed:', error);
        router.replace('/login');
      } finally {
        setIsValidating(false);
      }
    };

    // Only run validation if we're not on the login page
    if (router.pathname !== '/login') {
      validateAccess();
    } else {
      setIsValidating(false);
    }
  }, [router]);

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-blue-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Memvalidasi akses...</p>
        </div>
      </div>
    );
  }

  if (!hasValidKey && router.pathname !== '/login') {
    return null; // Router will handle redirect
  }

  return <>{children}</>;
};
