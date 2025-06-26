import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { ReflectionRequest, Language, SpiritualTone, ReflectionLength } from '../types';
import { useTranslations } from '../lib/translations';
import { modelConfigs } from '../lib/groqApi';

interface PrayerFormProps {
  onSubmit: (request: ReflectionRequest) => void;
  isLoading: boolean;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const PrayerForm: React.FC<PrayerFormProps> = ({
  onSubmit,
  isLoading,
  language,
  onLanguageChange
}) => {
  const [feeling, setFeeling] = useState('');
  const [spiritualTone, setSpiritualTone] = useState<SpiritualTone>('universal');
  const [length, setLength] = useState<ReflectionLength>('ringkas');
  const [selectedModel, setSelectedModel] = useState('auto');
  const [poeticMode, setPoeticMode] = useState(false);

  const { t, getExample } = useTranslations(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feeling.trim().length < 3) {
      alert(t('invalidInput'));
      return;
    }

    onSubmit({
      feeling: feeling.trim(),
      language,
      spiritualTone,
      length,
      poeticMode,
      model: selectedModel === 'auto' ? undefined : selectedModel
    });
  };

  const spiritualityOptions = [
    { value: 'universal', label: t('universal'), icon: '🌌' },
    { value: 'islam', label: t('islam'), icon: '☪️' },
    { value: 'kristen', label: t('kristen'), icon: '✝️' },
    { value: 'buddha', label: t('buddha'), icon: '☸️' },
    { value: 'agnostik', label: t('agnostik'), icon: '🤔' }
  ];

  const lengthOptions = [
    { value: 'ringkas', label: t('ringkas'), desc: t('ringkasDesc') },
    { value: 'sedang', label: t('sedang'), desc: t('sedangDesc') },
    { value: 'mendalam', label: t('mendalam'), desc: t('mendalamDesc') }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('welcome')} <span className="leaf-emoji">🌿</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('welcomeSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language & Spirituality Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🌍 {t('language')}
            </label>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="id">🇮🇩 Indonesia</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ☯️ {t('spirituality')}
            </label>
            <select
              value={spiritualTone}
              onChange={(e) => setSpiritualTone(e.target.value as SpiritualTone)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {spiritualityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reflection Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🧠 {t('reflectionType')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {lengthOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLength(option.value as ReflectionLength)}
                className={`p-3 border-2 rounded-lg text-center cursor-pointer transition-all duration-200 ${
                  length === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <span className="block text-sm font-medium">{option.label}</span>
                <span className="block text-xs opacity-75">{option.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Poetic Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            ✨ {t('formatStyle')}
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={poeticMode}
                onChange={(e) => setPoeticMode(e.target.checked)}
                className="sr-only"
              />
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                poeticMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  poeticMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                {poeticMode ? `🎭 ${t('poeticStyle')}` : `📝 ${t('proseStyle')}`}
              </span>
            </label>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {poeticMode ? t('poeticDesc') : t('proseDesc')}
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🤖 {t('model')}
            {poeticMode && (
              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                {t('poeticRecommendation')}
              </span>
            )}
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="auto">🎯 {t('auto')} ({t('optimalFor')} {t(length)}{poeticMode ? ' + Poetry' : ''})</option>
            {Object.entries(modelConfigs).map(([id, config]) => {
              const is70B = id.includes('70b') || id.includes('versatile');
              return (
                <option key={id} value={id}>
                  {config.name} {is70B && poeticMode ? '🎭' : ''} - {config.description}
                  {is70B ? ` (${t('enhancedCapabilities')})` : ''}
                </option>
              );
            })}
          </select>
          {poeticMode && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t('poeticTip')}
            </p>
          )}
        </div>

        {/* Feeling Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            💭 {t('feeling')}
          </label>
          <textarea
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            rows={4}
            placeholder={`${t('feelingPlaceholder')}\n\n${t('example')}: ${getExample(spiritualTone)}`}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {feeling.length}/500 {t('characters')}
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isLoading || feeling.trim().length < 3}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          <span>
            {isLoading ? t('generating') : t('generate')}
          </span>
        </button>
      </form>
    </div>
  );
};
