// Prompt.js - AI Prompt System for Generator Doa
// Universal Prayer Reflection Tool by Maulana Nais

/**
 * System prompt for universal spiritual assistant
 */
const systemPrompt = `You are a universal and compassionate spiritual assistant that creates prayers and reflections for people of all faiths and beliefs.

Given the user's emotional input, language preference, spiritual background, and length request, generate a warm and empathetic prayer/reflection that provides comfort, guidance, and hope.

CORE PRINCIPLES:
- Be universally inclusive and respectful of all spiritual traditions
- Respond with genuine warmth and empathy
- Focus on comfort, healing, and positive energy
- Avoid denominational language unless specifically requested
- Use universal concepts like love, peace, gratitude, strength, and hope

RESPONSE RULES:
- Respond ONLY in plain text, no formatting or labels
- DO NOT explain, analyze, or add commentary
- DO NOT use phrases like "Here's a prayer for you" or "I hope this helps"
- Start directly with the prayer/reflection content
- Keep the tone warm, personal, and heartfelt
- Adjust length based on the specified preference (short/medium/deep)

LANGUAGE ADAPTATION:
- Respond in the requested language (Indonesian or English)
- Use culturally appropriate expressions and metaphors
- Maintain the spiritual essence across languages

SPIRITUAL TONE ADAPTATION:
- Universal: Use inclusive language focusing on inner peace, love, and connection
- Islam: Include concepts of Allah's mercy, guidance, and blessings (if requested)
- Christian: Reference God's love, grace, and presence (if requested)  
- Buddhism: Focus on mindfulness, compassion, and inner peace (if requested)
- Agnostic: Emphasize human connection, hope, and inner strength (if requested)

LENGTH GUIDELINES:
- Short (ringkas): 2-3 sentences, concise and powerful
- Medium (sedang): 4-6 sentences, balanced and comforting
- Deep (mendalam): 7-10 sentences, comprehensive and profound`;

/**
 * Generate spiritual prompt based on user inputs
 * @param {string} feeling - User's feeling or situation
 * @param {string} language - Language preference (id/en)
 * @param {string} spirituality - Spiritual background
 * @param {string} length - Length preference (ringkas/sedang/mendalam)
 * @returns {string} - Formatted prompt for AI
 */
function generatePrompt(feeling, language, spirituality, length) {
    const languageMap = {
        'id': 'Indonesian',
        'en': 'English'
    };

    const spiritualityMap = {
        'universal': 'Universal (inclusive of all beliefs)',
        'islam': 'Islamic',
        'kristen': 'Christian',
        'buddha': 'Buddhist',
        'agnostik': 'Agnostic/Secular'
    };

    const lengthMap = {
        'ringkas': 'short and concise',
        'sedang': 'medium length',
        'mendalam': 'deep and comprehensive'
    };

    const userPrompt = `Please create a ${lengthMap[length]} spiritual reflection in ${languageMap[language]} for someone who is feeling: "${feeling}"

Spiritual context: ${spiritualityMap[spirituality]}
Length preference: ${lengthMap[length]}

Create a heartfelt prayer or reflection that acknowledges their feelings and provides comfort, hope, and spiritual guidance appropriate for their background.`;

    return {
        system: systemPrompt,
        user: userPrompt
    };
}

/**
 * Model configurations for different use cases
 */
const modelConfigs = {
    'llama3-8b-8192': {
        name: 'LLaMA 3 8B',
        description: 'Fast and efficient - ideal for quick reflections',
        maxTokens: 1000,
        temperature: 0.7,
        suitable: ['ringkas', 'sedang']
    },
    'llama3-70b-8192': {
        name: 'LLaMA 3 70B', 
        description: 'Powerful and deep - perfect for comprehensive reflections',
        maxTokens: 1500,
        temperature: 0.8,
        suitable: ['sedang', 'mendalam']
    },
    'llama-3.1-8b-instant': {
        name: 'LLaMA 3.1 8B Instant',
        description: 'Ultra-fast responses - great for immediate comfort',
        maxTokens: 800,
        temperature: 0.6,
        suitable: ['ringkas']
    },
    'gemma2-9b-it': {
        name: 'Gemma 2 9B',
        description: 'Balanced and thoughtful - versatile for all needs',
        maxTokens: 1200,
        temperature: 0.75,
        suitable: ['ringkas', 'sedang', 'mendalam']
    }
};

/**
 * Select optimal model based on length preference
 * @param {string} length - Length preference
 * @returns {string} - Model name
 */
function selectOptimalModel(length) {
    if (length === 'ringkas') {
        return 'llama-3.1-8b-instant';
    } else if (length === 'sedang') {
        return 'llama3-8b-8192';
    } else {
        return 'llama3-70b-8192';
    }
}

/**
 * Validate user input before processing
 * @param {string} feeling - User's feeling input
 * @returns {boolean} - Whether input is valid
 */
function validateInput(feeling) {
    if (!feeling || feeling.trim().length < 3) {
        return false;
    }
    
    // Check for inappropriate content (basic filter)
    const inappropriateWords = ['hate', 'harm', 'violence', 'suicide', 'death', 'kill'];
    const lowerFeeling = feeling.toLowerCase();
    
    for (const word of inappropriateWords) {
        if (lowerFeeling.includes(word)) {
            return false;
        }
    }
    
    return true;
}

/**
 * Generate contextual examples for different spiritual backgrounds
 */
const spiritualExamples = {
    universal: {
        id: "Saya merasa cemas tentang masa depan dan butuh ketenangan batin",
        en: "I feel anxious about the future and need inner peace"
    },
    islam: {
        id: "Saya merasa jauh dari Allah dan ingin kembali ke jalan yang benar",
        en: "I feel distant from Allah and want to return to the right path"
    },
    kristen: {
        id: "Saya merasa lelah dan butuh kekuatan dari Tuhan",
        en: "I feel weary and need strength from God"
    },
    buddha: {
        id: "Saya merasa terjebak dalam penderitaan dan mencari pencerahan",
        en: "I feel trapped in suffering and seek enlightenment"
    },
    agnostik: {
        id: "Saya merasa kehilangan arah dan butuh motivasi untuk melanjutkan hidup",
        en: "I feel lost and need motivation to continue living"
    }
};

/**
 * Get example feeling based on spirituality and language
 * @param {string} spirituality - Spiritual background
 * @param {string} language - Language preference
 * @returns {string} - Example feeling text
 */
function getExampleFeeling(spirituality, language) {
    return spiritualExamples[spirituality]?.[language] || spiritualExamples.universal[language];
}

/**
 * Translation helper for UI text
 */
const translations = {
    id: {
        generateButton: 'Buat Refleksi Spiritual',
        generating: 'Sedang menyiapkan refleksi...',
        regenerate: 'Buat Lagi',
        copy: 'Salin',
        share: 'Bagikan',
        copied: 'Refleksi berhasil disalin!',
        error: 'Terjadi kesalahan. Silakan coba lagi.',
        apiKeyRequired: 'API Key diperlukan untuk menggunakan layanan ini.',
        feelingPlaceholder: 'Ceritakan perasaan, situasi, atau apa yang sedang kamu alami saat ini...'
    },
    en: {
        generateButton: 'Generate Spiritual Reflection',
        generating: 'Preparing your reflection...',
        regenerate: 'Generate Again',
        copy: 'Copy',
        share: 'Share',
        copied: 'Reflection copied successfully!',
        error: 'An error occurred. Please try again.',
        apiKeyRequired: 'API Key is required to use this service.',
        feelingPlaceholder: 'Tell me about your feelings, situation, or what you are experiencing right now...'
    }
};

/**
 * Get translated text
 * @param {string} key - Translation key
 * @param {string} language - Language code
 * @returns {string} - Translated text
 */
function t(key, language = 'id') {
    return translations[language]?.[key] || translations.id[key] || key;
}
