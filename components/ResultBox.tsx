import React from 'react';
import { Copy, Share2, RotateCcw } from 'lucide-react';
import { PrayerResult } from '../types';
import { useTranslations } from '../lib/translations';

interface ResultBoxProps {
  result: PrayerResult;
  onRegenerate: () => void;
  onCopy: () => void;
  onShare: () => void;
  language: 'id' | 'en';
  poeticMode?: boolean;
}

export const ResultBox: React.FC<ResultBoxProps> = ({
  result,
  onRegenerate,
  onCopy,
  onShare,
  language,
  poeticMode = false
}) => {
  const { t } = useTranslations(language);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Token Info */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Input:</span>
            <span className="font-medium text-gray-900 dark:text-white ml-1">
              {result.usage.inputTokens} tokens
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Output:</span>
            <span className="font-medium text-gray-900 dark:text-white ml-1">
              {result.usage.outputTokens} tokens
            </span>
          </div>
        </div>
        {poeticMode && (
          <div className="mt-2 text-center text-xs text-blue-600 dark:text-blue-400">
            {t('poeticGenerated')}
          </div>
        )}
        {result.usage.remainingTokens && (
          <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
            Remaining: {result.usage.remainingTokens} tokens | 
            Requests: {result.usage.remainingRequests}
          </div>
        )}
      </div>

      {/* Prayer Result */}
      <div className="mb-6">        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <span className="leaf-emoji">🌿</span> Refleksi Spiritualmu
        </h3>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 text-gray-800 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">
          {result.content}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRegenerate}
          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('regenerate')}</span>
        </button>
        
        <button
          onClick={onCopy}
          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>{t('copy')}</span>
        </button>
        
        <button
          onClick={onShare}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>{t('share')}</span>
        </button>
      </div>
    </div>
  );
};
