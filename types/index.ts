// Types for Generator Doa application

export interface GroqApiResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model: string;
  created: number;
  id: string;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  remainingTokens?: number;
  remainingRequests?: number;
}

export interface GroqModel {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  temperature: number;
  suitable: ReflectionLength[];
}

export type Language = 'id' | 'en';

export type SpiritualTone = 'universal' | 'islam' | 'kristen' | 'buddha' | 'agnostik';

export type ReflectionLength = 'ringkas' | 'sedang' | 'mendalam';

export interface ReflectionRequest {
  feeling: string;
  language: Language;
  spiritualTone: SpiritualTone;
  length: ReflectionLength;
  poeticMode?: boolean;
  model?: string;
}

export interface ReflectionResult {
  text: string;
  model: string;
  usage: TokenUsage;
  timestamp: number;
}

export interface UserSettings {
  language: Language;
  spiritualTone: SpiritualTone;
  preferredLength: ReflectionLength;
  poeticMode: boolean;
  preferredModel?: string;
  theme: 'light' | 'dark' | 'system';
}

export interface ApiValidationResult {
  isValid: boolean;
  error?: string;
  models?: string[];
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  id: Translation;
  en: Translation;
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Component Props Types
export interface ThemeToggleProps {
  className?: string;
}

export interface PrayerFormProps {
  onSubmit: (request: ReflectionRequest) => void;
  isLoading: boolean;
  settings: UserSettings;
  onSettingsChange: (settings: Partial<UserSettings>) => void;
}

export interface ResultBoxProps {
  result: ReflectionResult | null;
  onRegenerate: () => void;
  onCopy: () => void;
  onShare: () => void;
  language: Language;
  poeticMode?: boolean;
}

export interface ApiKeyGuardProps {
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export interface PrayerResult {
  content: string;
  usage: TokenUsage;
  model: string;
  timestamp: number;
}

export interface ModelConfig {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  temperature: number;
  suitable: ReflectionLength[];
}
