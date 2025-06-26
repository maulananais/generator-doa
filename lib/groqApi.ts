import { GroqApiResponse, GroqModel, ReflectionRequest, ReflectionResult, TokenUsage } from '@/types';
import { getStoredApiKey } from './validateGroqKey';

/**
 * Available Groq models configuration
 */
export const groqModels: Record<string, GroqModel> = {
  'llama3-8b-8192': {
    id: 'llama3-8b-8192',
    name: 'LLaMA 3 8B',
    description: 'Fast and efficient - ideal for quick reflections',
    maxTokens: 1000,
    temperature: 0.7,
    suitable: ['ringkas', 'sedang']
  },
  'llama3-70b-8192': {
    id: 'llama3-70b-8192',
    name: 'LLaMA 3 70B',
    description: 'Powerful and deep - perfect for comprehensive reflections',
    maxTokens: 1500,
    temperature: 0.8,
    suitable: ['sedang', 'mendalam']
  },
  'llama-3.1-8b-instant': {
    id: 'llama-3.1-8b-instant',
    name: 'LLaMA 3.1 8B Instant',
    description: 'Ultra-fast responses - great for immediate comfort',
    maxTokens: 800,
    temperature: 0.6,
    suitable: ['ringkas']
  },
  'gemma2-9b-it': {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B',
    description: 'Balanced and thoughtful - versatile for all needs',
    maxTokens: 1200,
    temperature: 0.75,
    suitable: ['ringkas', 'sedang', 'mendalam']
  },
  'llama-3.3-70b-versatile': {
    id: 'llama-3.3-70b-versatile',
    name: 'LLaMA 3.3 70B Versatile',
    description: 'Balanced tone for any belief system',
    maxTokens: 1500,
    temperature: 0.8,
    suitable: ['sedang', 'mendalam']
  }
};

/**
 * Alias for groqModels to maintain compatibility
 */
export const modelConfigs = groqModels;

/**
 * Select optimal model based on reflection length and poetic mode
 */
export function selectOptimalModel(length: string, poeticMode: boolean = false): string {
  // If poetic mode is enabled, prefer 70B models for better literary quality
  if (poeticMode) {
    if (length === 'ringkas') {
      return 'llama3-70b-8192'; // Even short poetry benefits from 70B
    } else {
      return 'llama3-70b-8192'; // Always use 70B for poetry
    }
  }
  
  // Standard non-poetic selection
  switch (length) {
    case 'ringkas':
      return 'llama-3.1-8b-instant';
    case 'sedang':
      return 'llama3-8b-8192';
    case 'mendalam':
      return 'llama3-70b-8192';
    default:
      return 'llama3-8b-8192';
  }
}

/**
 * Generate system prompt for spiritual assistant based on model capabilities
 */
function generateSystemPrompt(model: string, poeticMode: boolean = false): string {
  const is70BModel = model.includes('70b') || model.includes('versatile');
  
  const basePrompt = `You are a universal and compassionate spiritual assistant that creates prayers and reflections for people of all faiths and beliefs.

Based on the user's emotional input, preferred language (id/en), spiritual tone (Islamic, Christian, Buddhist, Agnostic, Universal), and depth (short / medium / deep),
generate a warm and peaceful spiritual prayer or reflection that provides comfort, guidance, and hope.

Core Instructions:
- ONLY respond with the prayer/reflection itself, no explanation or label.
- Always be gentle, thoughtful, and emotionally aware.
- Respect the tone and belief provided.
- Use universal concepts like love, peace, gratitude, strength, and hope.
- Avoid denominational language unless specifically requested.
- Keep the response warm, personal, and heartfelt.`;

  if (is70BModel) {
    return basePrompt + `

Advanced Model Instructions (70B+ Capabilities):
- Utilize deeper emotional resonance and sophisticated language patterns.
- Incorporate subtle metaphors and layered meaning.
- Create nuanced connections between feelings and spiritual concepts.
- Use varied sentence structures and sophisticated vocabulary.
${poeticMode ? '- Format as poetic verses with rhythm, metaphor, and elevated language style.' : '- Use rich prose with literary quality while maintaining accessibility.'}
- Demonstrate advanced understanding of spiritual traditions and human psychology.`;
  } else {
    return basePrompt + `

Standard Model Instructions (8B Capabilities):
- Keep language accessible and direct while maintaining warmth.
- Use clear, straightforward expressions of comfort and hope.
- Focus on immediate emotional support and practical spiritual guidance.
${poeticMode ? '- If poetic format is requested, use simple verse structure with clear rhythm.' : '- Format as clear, empathetic paragraphs.'}
- Prioritize clarity and emotional connection over complexity.`;
  }
}

/**
 * Generate user prompt based on request parameters
 */
function generateUserPrompt(request: ReflectionRequest): string {
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

  // Add spiritual tone-specific instructions
  let spiritualInstructions = '';
  switch (request.spiritualTone) {
    case 'agnostik':
      spiritualInstructions = 'Use a meditative and universal tone, avoid naming any deity.';
      break;
    case 'islam':
      spiritualInstructions = 'Incorporate Islamic expressions like "Ya Allah", "Bismillah" softly.';
      break;
    case 'kristen':
      spiritualInstructions = 'Use Christian phrases like "Lord", "Heavenly Father" sincerely.';
      break;
    case 'buddha':
      spiritualInstructions = 'Use calm and reflective language referencing peace, karma, and mindfulness.';
      break;
    case 'universal':
      spiritualInstructions = 'Avoid religious bias, write with love, clarity, and hope for everyone.';
      break;
  }

  return `Please create a ${lengthMap[request.length]} spiritual reflection in ${languageMap[request.language]} for someone who is feeling: "${request.feeling}"

Spiritual context: ${spiritualityMap[request.spiritualTone]}
Length preference: ${lengthMap[request.length]}
${request.poeticMode ? 'Format: Poetic/verse style with rhythm and elevated language' : 'Format: Prose style with natural flow'}
Additional guidance: ${spiritualInstructions}

Create a heartfelt ${request.poeticMode ? 'poetic ' : ''}prayer or reflection that acknowledges their feelings and provides comfort, hope, and spiritual guidance appropriate for their background.`;
}

/**
 * Call Groq API to generate spiritual reflection
 */
export async function generateReflection(request: ReflectionRequest): Promise<ReflectionResult> {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    throw new Error('API Key tidak ditemukan. Silakan login kembali.');
  }

  const model = request.model || selectOptimalModel(request.length, request.poeticMode);
  const modelConfig = groqModels[model];
  
  if (!modelConfig) {
    throw new Error(`Model ${model} tidak tersedia.`);
  }

  const systemPrompt = generateSystemPrompt(model, request.poeticMode);
  const userPrompt = generateUserPrompt(request);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: model,
        max_tokens: modelConfig.maxTokens,
        temperature: modelConfig.temperature,
        stream: false
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('API Key tidak valid. Silakan login ulang.');
      } else if (response.status === 429) {
        throw new Error('Terlalu banyak permintaan. Silakan tunggu sebentar.');
      } else if (response.status === 400) {
        throw new Error('Permintaan tidak valid. Silakan coba lagi.');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    }

    const data: GroqApiResponse = await response.json();
    
    // Extract usage information
    const usage: TokenUsage = {
      inputTokens: data.usage?.prompt_tokens || 0,
      outputTokens: data.usage?.completion_tokens || 0,
      totalTokens: data.usage?.total_tokens || 0
    };

    // Extract rate limit information from headers if available
    const remainingTokens = response.headers.get('x-ratelimit-remaining-tokens');
    const remainingRequests = response.headers.get('x-ratelimit-remaining-requests');
    
    if (remainingTokens) {
      usage.remainingTokens = parseInt(remainingTokens, 10);
    }
    if (remainingRequests) {
      usage.remainingRequests = parseInt(remainingRequests, 10);
    }

    let reflectionText = data.choices[0]?.message?.content?.trim();
    
    if (!reflectionText) {
      throw new Error('Tidak ada respons dari AI. Silakan coba lagi.');
    }

    // Auto-translate if needed (English to Indonesian)
    if (request.language === 'id' && detectLanguage(reflectionText) === 'en') {
      try {
        reflectionText = await autoTranslate(reflectionText, 'id');
      } catch (translateError) {
        console.warn('Translation failed, using original text:', translateError);
      }
    }

    return {
      text: reflectionText,
      model: modelConfig.name,
      usage,
      timestamp: Date.now()
    };

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.');
    }
  }
}

/**
 * Detect language of text (simple detection)
 */
function detectLanguage(text: string): 'en' | 'id' {
  const englishWords = ['the', 'and', 'you', 'are', 'have', 'with', 'may', 'your', 'love', 'peace'];
  const indonesianWords = ['yang', 'dan', 'kamu', 'adalah', 'dengan', 'semoga', 'cinta', 'damai', 'untuk'];
  
  const lowerText = text.toLowerCase();
  let englishCount = 0;
  let indonesianCount = 0;

  englishWords.forEach(word => {
    if (lowerText.includes(word)) englishCount++;
  });

  indonesianWords.forEach(word => {
    if (lowerText.includes(word)) indonesianCount++;
  });

  return englishCount > indonesianCount ? 'en' : 'id';
}

/**
 * Auto-translate text using Google Translate API
 */
async function autoTranslate(text: string, to: string = 'id'): Promise<string> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Translation service unavailable');
    }
    
    const data = await response.json();
    return data[0].map((t: any) => t[0]).join('');
  } catch (error) {
    console.warn('Translation failed:', error);
    return text; // Return original text if translation fails
  }
}

/**
 * Validate user input
 */
export function validateInput(feeling: string): boolean {
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
