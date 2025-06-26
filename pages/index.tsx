import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import ThemeToggle from '@/components/ThemeToggle';
import { isAuthenticated } from '@/lib/validateGroqKey';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Generator Doa - Universal Prayer Reflection Tool</title>
        <meta name="description" content="A lightweight and responsive AI web app for generating spiritual prayers/reflections based on user feelings, usable by all beliefs (universal)." />
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
        
        {/* Open Graph */}
        <meta property="og:title" content="Generator Doa - Universal Prayer Reflection Tool" />
        <meta property="og:description" content="A lightweight and responsive AI web app for generating spiritual prayers/reflections based on user feelings, usable by all beliefs (universal)." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/android-chrome-512x512.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Generator Doa - Universal Prayer Reflection Tool" />
        <meta name="twitter:description" content="A lightweight and responsive AI web app for generating spiritual prayers/reflections based on user feelings, usable by all beliefs (universal)." />
        <meta name="twitter:image" content="/android-chrome-512x512.png" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-spiritual-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🌿</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Generator Doa</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Universal Prayer Reflection</p>
              </div>
            </div>
            
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-spiritual-600 to-purple-600 bg-clip-text text-transparent">
                Generator Doa <span className="leaf-emoji">🌿</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                Universal Prayer Reflection Tool
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                A lightweight and responsive AI web app for generating spiritual prayers/reflections 
                based on user feelings, usable by all beliefs (universal).
              </p>
            </div>

            <div className="mb-12">
              <Link 
                href="/login" 
                className="inline-flex items-center space-x-2 btn-primary text-lg px-8 py-4 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>🚀 Get Started</span>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Multi Language */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multi Language</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  🇮🇩 Indonesia & 🇬🇧 English with automatic translation support
                </p>
              </div>
            </div>

            {/* Multi Spirituality */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">☯️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multi Spirituality</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Universal, Islam, Christian, Buddhist, Agnostic - for all beliefs
                </p>
              </div>
            </div>

            {/* AI Powered */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Groq</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Powered by LLaMA models for deep and meaningful reflections
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Client-side only, API key stored locally, no backend required
                </p>
              </div>
            </div>

            {/* Responsive */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile First</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Responsive design with dark/light mode toggle
                </p>
              </div>
            </div>

            {/* Content Protection */}
            <div className="card hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Protected</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Anti-copy protection, share & copy buttons for safe sharing
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="card mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">🧩 Tech Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">AI Engine</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Groq API (LLaMA3/8B/70B etc.)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Frontend</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Next.js + TailwindCSS + TypeScript</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔐</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Auth</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">API Key via localStorage</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🕊️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Translation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Google Translate API (No key)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌗</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Theme</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">next-themes with system detection</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">UX</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Mobile-first Responsive Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="card bg-gradient-to-r from-spiritual-50 to-purple-50 dark:from-spiritual-900/20 dark:to-purple-900/20 border-spiritual-200 dark:border-spiritual-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Find Peace? <span className="leaf-emoji">🌿</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start your spiritual journey with personalized reflections
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center space-x-2 btn-primary"
              >
                <span>Start Free</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto px-4 py-8 text-center border-t border-gray-200 dark:border-gray-700">
          <div className="text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              👑 Made with ❤️ by <strong className="text-spiritual-600 dark:text-spiritual-400">Maulana Nais</strong>
            </p>
            <p className="text-sm italic">"Because every feeling deserves light." <span className="leaf-emoji">🌿</span></p>
          </div>
        </footer>
      </div>
    </>
  );
}
