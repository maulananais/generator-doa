import { Language, Translations } from '@/types';

export const translations: Translations = {
  id: {
    // Navigation & Common
    title: 'Generator Doa',
    subtitle: 'Universal Prayer Reflection Tool',
    welcome: 'Selamat Datang di Generator Doa',
    welcomeSubtitle: 'Bagikan perasaanmu, dan dapatkan refleksi spiritual yang menyentuh hati',
    
    // Authentication
    login: 'Masuk',
    logout: 'Keluar',
    apiKeyTitle: 'Groq API Key',
    apiKeyPlaceholder: 'Masukkan Groq API Key Anda...',
    apiKeyDescription: 'Untuk menggunakan Generator Doa, masukkan Groq API Key Anda. Key akan disimpan secara lokal di browser.',
    apiKeyInfo: 'Dapatkan API Key gratis di console.groq.com',
    validateKey: 'Validasi Key',
    validating: 'Memvalidasi...',
    keyValid: 'API Key valid! Mengalihkan ke dashboard...',
    keyInvalid: 'API Key tidak valid',
    
    // Form Labels
    language: 'Bahasa',
    spirituality: 'Spiritualitas',
    reflectionType: 'Jenis Refleksi',
    feeling: 'Bagaimana perasaanmu hari ini?',
    feelingPlaceholder: 'Ceritakan perasaan, situasi, atau apa yang sedang kamu alami saat ini...',
    model: 'Model AI',
    
    // Spirituality Options
    universal: 'Universal',
    islam: 'Islam',
    kristen: 'Kristen',
    buddha: 'Buddha',
    agnostik: 'Agnostik',
    
    // Reflection Length
    ringkas: 'Ringkas',
    ringkasDesc: 'Singkat & padat',
    sedang: 'Sedang',
    sedangDesc: 'Seimbang',
    mendalam: 'Mendalam',
    mendalamDesc: 'Panjang & detail',
    
    // Format Style
    formatStyle: 'Gaya Format',
    poeticStyle: 'Gaya Puitis',
    proseStyle: 'Gaya Prosa',
    poeticDesc: 'Format bait dengan ritme & metafora',
    proseDesc: 'Paragraf yang mengalir natural',
    poeticRecommendation: '70B+ direkomendasikan untuk puisi',
    poeticTip: '💡 Model 70B memberikan bahasa puitis yang lebih kaya, metafora, dan struktur bait yang canggih',
    
    // Actions
    generate: 'Buat Refleksi Spiritual',
    generating: 'Sedang menyiapkan refleksi spiritual untukmu...',
    regenerate: 'Buat Lagi',
    copy: 'Salin',
    share: 'Bagikan',
    save: 'Simpan',
    cancel: 'Batal',
    
    // Results
    reflectionTitle: 'Refleksi Spiritualmu',
    yourReflection: 'Refleksi Spiritualmu',
    inputTokens: 'Token Input',
    outputTokens: 'Token Output',
    totalTokens: 'Total Token',
    remainingTokens: 'Token Tersisa',
    remainingRequests: 'Permintaan Tersisa',
    poeticGenerated: '✨ Dibuat dengan gaya puitis',
    
    // Messages
    copied: 'Refleksi berhasil disalin!',
    shared: 'Refleksi berhasil dibagikan!',
    error: 'Terjadi kesalahan. Silakan coba lagi.',
    invalidInput: 'Mohon ceritakan perasaanmu dengan lebih detail (minimal 3 karakter)',
    networkError: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
    
    // Theme
    lightMode: 'Mode Terang',
    darkMode: 'Mode Gelap',
    themeLight: '☀️ Mode terang diaktifkan',
    themeDark: '🌙 Mode gelap diaktifkan',
    
    // Footer
    createdBy: 'Dibuat dengan ❤️ oleh',
    quote: '"Karena setiap rasa pantas mendapatkan cahaya."',
    
    // Protection Messages
    rightClickDisabled: 'Klik kanan dinonaktifkan untuk melindungi konten',
    shortcutDisabled: 'Shortcut keyboard dinonaktifkan untuk melindungi konten',
    devToolsDisabled: 'Developer tools dinonaktifkan',
    
    // Model Selection
    auto: 'Otomatis',
    optimalFor: 'Optimal untuk',
    enhancedCapabilities: 'Kemampuan yang Ditingkatkan',
    characters: 'karakter',
    example: 'Contoh',
    
    // Examples by Spirituality
    exampleUniversal: 'Saya merasa cemas tentang masa depan dan butuh ketenangan batin',
    exampleIslam: 'Saya merasa jauh dari Allah dan ingin kembali ke jalan yang benar',
    exampleKristen: 'Saya merasa lelah dan butuh kekuatan dari Tuhan',
    exampleBuddha: 'Saya merasa terjebak dalam penderitaan dan mencari pencerahan',
    exampleAgnostik: 'Saya merasa kehilangan arah dan butuh motivasi untuk melanjutkan hidup',
  },
  
  en: {
    // Navigation & Common
    title: 'Prayer Generator',
    subtitle: 'Universal Prayer Reflection Tool',
    welcome: 'Welcome to Prayer Generator',
    welcomeSubtitle: 'Share your feelings and receive heartfelt spiritual reflections',
    
    // Authentication
    login: 'Login',
    logout: 'Logout',
    apiKeyTitle: 'Groq API Key',
    apiKeyPlaceholder: 'Enter your Groq API Key...',
    apiKeyDescription: 'To use Prayer Generator, enter your Groq API Key. The key will be stored locally in your browser.',
    apiKeyInfo: 'Get a free API Key at console.groq.com',
    validateKey: 'Validate Key',
    validating: 'Validating...',
    keyValid: 'API Key valid! Redirecting to dashboard...',
    keyInvalid: 'Invalid API Key',
    
    // Form Labels
    language: 'Language',
    spirituality: 'Spirituality',
    reflectionType: 'Reflection Type',
    feeling: 'How are you feeling today?',
    feelingPlaceholder: 'Tell me about your feelings, situation, or what you are experiencing right now...',
    model: 'AI Model',
    
    // Spirituality Options
    universal: 'Universal',
    islam: 'Islamic',
    kristen: 'Christian',
    buddha: 'Buddhist',
    agnostik: 'Agnostic',
    
    // Reflection Length
    ringkas: 'Short',
    ringkasDesc: 'Brief & concise',
    sedang: 'Medium',
    sedangDesc: 'Balanced',
    mendalam: 'Deep',
    mendalamDesc: 'Long & detailed',
    
    // Format Style
    formatStyle: 'Format Style',
    poeticStyle: 'Poetic Style',
    proseStyle: 'Prose Style',
    poeticDesc: 'Verse format with rhythm & metaphor',
    proseDesc: 'Natural flowing paragraphs',
    poeticRecommendation: '70B+ recommended for poetry',
    poeticTip: '💡 70B models provide richer poetic language, metaphors, and sophisticated verse structures',
    
    // Actions
    generate: 'Generate Spiritual Reflection',
    generating: 'Preparing your spiritual reflection...',
    regenerate: 'Generate Again',
    copy: 'Copy',
    share: 'Share',
    save: 'Save',
    cancel: 'Cancel',
    
    // Results
    reflectionTitle: 'Your Spiritual Reflection',
    yourReflection: 'Your Spiritual Reflection',
    inputTokens: 'Input Tokens',
    outputTokens: 'Output Tokens',
    totalTokens: 'Total Tokens',
    remainingTokens: 'Remaining Tokens',
    remainingRequests: 'Remaining Requests',
    poeticGenerated: '✨ Generated in poetic style',
    
    // Messages
    copied: 'Reflection copied successfully!',
    shared: 'Reflection shared successfully!',
    error: 'An error occurred. Please try again.',
    invalidInput: 'Please tell us more about your feelings (minimum 3 characters)',
    networkError: 'Failed to connect to server. Please check your internet connection.',
    
    // Theme
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    themeLight: '☀️ Light mode activated',
    themeDark: '🌙 Dark mode activated',
    
    // Footer
    createdBy: 'Made with ❤️ by',
    quote: '"Because every feeling deserves light."',
    
    // Protection Messages
    rightClickDisabled: 'Right-click disabled to protect content',
    shortcutDisabled: 'Keyboard shortcuts disabled to protect content',
    devToolsDisabled: 'Developer tools disabled',
    
    // Model Selection
    auto: 'Auto',
    optimalFor: 'Optimal for',
    enhancedCapabilities: 'Enhanced capabilities',
    characters: 'characters',
    example: 'Example',
    
    // Examples by Spirituality
    exampleUniversal: 'I feel anxious about the future and need inner peace',
    exampleIslam: 'I feel distant from Allah and want to return to the right path',
    exampleKristen: 'I feel weary and need strength from God',
    exampleBuddha: 'I feel trapped in suffering and seek enlightenment',
    exampleAgnostik: 'I feel lost and need motivation to continue living',
  }
};

/**
 * Get translated text
 */
export function t(key: string, language: Language = 'id'): string {
  return translations[language]?.[key] || translations.id[key] || key;
}

/**
 * Get example feeling based on spirituality and language
 */
export function getExampleFeeling(spirituality: string, language: Language): string {
  const exampleKey = `example${spirituality.charAt(0).toUpperCase() + spirituality.slice(1)}`;
  return t(exampleKey, language);
}

/**
 * Hook for using translations in React components
 */
export function useTranslations(language: Language) {
  return {
    t: (key: string) => t(key, language),
    getExample: (spirituality: string) => getExampleFeeling(spirituality, language)
  };
}
