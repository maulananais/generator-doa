import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { LogOut, Github } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { PrayerForm } from '@/components/PrayerForm';
import { ResultBox } from '@/components/ResultBox';
import { LoadingState } from '@/components/Loading';
import { ToastManager } from '@/components/Toast';
import { ApiKeyGuard } from '@/components/ApiKeyGuard';
import { removeApiKey } from '@/lib/validateGroqKey';
import { generateReflection, selectOptimalModel } from '@/lib/groqApi';
import { useTranslations } from '@/lib/translations';
import { ReflectionRequest, PrayerResult, Language } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('en');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<PrayerResult | null>(null);
  const [lastRequest, setLastRequest] = useState<ReflectionRequest | null>(null);
  const [toasts, setToasts] = useState<Array<{id: string, message: string, type: 'success' | 'error'}>>([]);

  const { t } = useTranslations(language);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleLogout = () => {
    removeApiKey();
    router.push('/login');
  };
  const handleGenerate = async (request: ReflectionRequest) => {
    setIsGenerating(true);
    setLastRequest(request); // Save the request for regeneration
    try {
      const response = await generateReflection(request);
      setResult({
        content: response.text,
        usage: response.usage,
        model: response.model,
        timestamp: response.timestamp
      });
      showToast('Refleksi spiritual berhasil dibuat! 🌿', 'success');
    } catch (error) {
      console.error('Generation error:', error);
      showToast(error instanceof Error ? error.message : 'Terjadi kesalahan saat membuat refleksi', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result.content);
      showToast(t('copied'), 'success');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = result.content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(t('copied'), 'success');
    }
  };

  const handleShare = async () => {
    if (!result) return;
    
    const shareData = {
      title: 'Generator Doa - Refleksi Spiritual',
      text: result.content,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        showToast(t('shared'), 'success');
      } else {
        await handleCopy();
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      await handleCopy();
    }
  };

  return (
    <ApiKeyGuard>
      <Head>
        <title>{t('title')} - Dashboard</title>
        <meta name="description" content={t('subtitle')} />
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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🌿</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors"
                title={t('logout')}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          {/* Prayer Form */}
          <PrayerForm
            onSubmit={handleGenerate}
            isLoading={isGenerating}
            language={language}
            onLanguageChange={setLanguage}
          />

          {/* Loading State */}
          {isGenerating && (
            <LoadingState message={t('generating')} />
          )}

          {/* Result */}
          {result && !isGenerating && (
            <ResultBox
              result={result}
              onRegenerate={() => {
                if (lastRequest) {
                  handleGenerate(lastRequest);
                } else {
                  showToast('Silakan buat refleksi baru dengan mengisi form di atas', 'error');
                }
              }}
              onCopy={handleCopy}
              onShare={handleShare}
              language={language}
              poeticMode={lastRequest?.poeticMode}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto px-4 py-8 text-center border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="text-gray-600 dark:text-gray-400">
            <p className="mb-4">{t('createdBy')} <strong className="text-blue-600 dark:text-blue-400">Maulana Nais</strong></p>
            
            {/* Social Media Links */}
            <div className="flex justify-center space-x-6 mb-4">
              <a
                href="https://github.com/maulananais"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="View on GitHub"
              >
                <Github className="w-5 h-5" />
                <span>maulananais</span>
              </a>
            </div>
            
            <p className="text-sm italic">{t('quote')} <span className="leaf-emoji">🌿</span></p>
          </div>
        </footer>

        {/* Toast Notifications */}
        <ToastManager toasts={toasts} removeToast={removeToast} />
      </div>
    </ApiKeyGuard>
  );
}
