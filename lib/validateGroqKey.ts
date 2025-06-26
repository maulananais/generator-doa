import { ApiValidationResult } from '@/types';

/**
 * Validate Groq API Key by making a test request
 */
export async function validateGroqKey(apiKey: string): Promise<ApiValidationResult> {
  if (!apiKey || !apiKey.startsWith('gsk_')) {
    return {
      isValid: false,
      error: API Key must start with "gsk_"'
    };
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const models = data.data?.map((model: any) => model.id) || [];
      
      return {
        isValid: true,
        models
      };
    } else if (response.status === 401) {
      return {
        isValid: false,
        error: 'API Key tidak valid atau sudah expired'
      };
    } else if (response.status === 429) {
      return {
        isValid: false,
        error: 'Terlalu banyak permintaan. Silakan tunggu sebentar'
      };
    } else {
      return {
        isValid: false,
        error: `HTTP Error: ${response.status}`
      };
    }
  } catch (error) {
    return {
      isValid: false,
      error: 'Gagal terhubung ke server Groq. Periksa koneksi internet Anda'
    };
  }
}

/**
 * Get stored API key from localStorage
 */
export function getStoredApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('groq-api-key');
}

/**
 * Store API key in localStorage
 */
export function storeApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('groq-api-key', apiKey);
}

/**
 * Remove API key from localStorage
 */
export function removeApiKey(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('groq-api-key');
}

/**
 * Check if user is authenticated (has valid API key)
 */
export function isAuthenticated(): boolean {
  const apiKey = getStoredApiKey();
  return !!apiKey && apiKey.startsWith('gsk_');
}
