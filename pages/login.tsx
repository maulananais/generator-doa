import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { validateGroqKey, storeApiKey, isAuthenticated } from '@/lib/validateGroqKey';

export default function LoginPage() {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!apiKey.trim()) {
      setError('API Key cannot be empty');
      return;
    }

    setIsValidating(true);

    try {
      const result = await validateGroqKey(apiKey.trim());
      
      if (result.isValid) {
        storeApiKey(apiKey.trim());
        
        // Show success message briefly before redirect
        setError('');
        
        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
        
      } else {
        setError(result.error || 'Invalid API Key');
      }
    } catch (err) {
      setError('An error occurred while validating API Key');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Generator Doa</title>
        <meta name="description" content="Login to Generator Doa with your Groq API Key" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags for PWA */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Generator Doa" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-spiritual-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🌿</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Generator Doa</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Universal Prayer Reflection</p>
              </div>
            </Link>
            
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <div className="card">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-spiritual-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter your Groq API Key to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Groq API Key
                  </label>
                  <input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="gsk_..."
                    className="input-field"
                    disabled={isValidating}
                    autoComplete="off"
                  />
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    API Key will be stored locally in your browser
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">⚠️</span>
                      <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isValidating || !apiKey.trim()}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {isValidating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Validating...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>Go to Dashboard</span>
                    </>
                  )}
                </button>
              </form>

              {/* API Key Info */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">ℹ️</span>
                  <div className="text-sm">
                    <p className="text-blue-700 dark:text-blue-300 font-medium mb-1">
                      Don't have an API Key?
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 mb-2">
                      Get a free API Key at{' '}
                      <a 
                        href="https://console.groq.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:no-underline font-medium"
                      >
                        console.groq.com
                      </a>
                    </p>
                    <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                      <li>• Sign up with Google/GitHub email</li>
                      <li>• Create a new API Key</li>
                      <li>• Copy and paste it here</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <Link 
                  href="/" 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-spiritual-600 dark:hover:text-spiritual-400 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <span className="text-green-500">🔒</span>
                <p className="text-xs text-green-700 dark:text-green-300">
                  <strong>100% Safe:</strong> API Key is only stored in your browser
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with ❤️ by <strong>Maulana Nais</strong> • "Because every feeling deserves light." <span className="leaf-emoji">🌿</span>
          </p>
        </footer>
      </div>
    </>
  );
}
