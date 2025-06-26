// Script.js - Main JavaScript for Generator Doa
// Universal Prayer Reflection Tool by Maulana Nais

class GeneratorDoa {
    constructor() {
        this.apiKey = null;
        this.currentLanguage = 'id';
        this.currentSpirituality = 'universal';
        this.currentLength = 'ringkas';
        this.isGenerating = false;
        this.lastGeneration = null;
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.checkApiKey();
        this.setupContentProtection();
        this.updateUILanguage();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Language selection
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            this.updateUILanguage();
            this.updatePlaceholder();
        });

        // Spirituality selection
        document.getElementById('spiritualitySelect').addEventListener('change', (e) => {
            this.currentSpirituality = e.target.value;
            this.updatePlaceholder();
        });

        // Prompt type buttons
        document.querySelectorAll('.prompt-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectPromptType(e.target.closest('.prompt-type-btn'));
            });
        });

        // Generate button
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateReflection();
        });

        // Regenerate button
        document.getElementById('regenerateBtn').addEventListener('click', () => {
            this.generateReflection();
        });

        // Copy button
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyReflection();
        });

        // Share button
        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareReflection();
        });

        // API Key modal
        document.getElementById('saveApiKey').addEventListener('click', () => {
            this.saveApiKey();
        });

        document.getElementById('cancelApiKey').addEventListener('click', () => {
            this.hideApiKeyModal();
        });

        // Enter key on feeling input
        document.getElementById('feelingInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateReflection();
            }
        });

        // API Key input enter
        document.getElementById('apiKeyInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.saveApiKey();
            }
        });
    }

    /**
     * Load and apply saved theme
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
    }

    /**
     * Toggle between light and dark theme
     */
    toggleTheme() {
        const html = document.documentElement;
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Show toast notification
        this.showToast(isDark ? '🌙 Mode gelap diaktifkan' : '☀️ Mode terang diaktifkan', 'success');
    }

    /**
     * Check if API key exists, prompt if not
     */
    checkApiKey() {
        this.apiKey = localStorage.getItem('groq-api-key');
        if (!this.apiKey) {
            this.showApiKeyModal();
        }
    }

    /**
     * Show API key modal
     */
    showApiKeyModal() {
        document.getElementById('apiKeyModal').classList.remove('hidden');
        document.getElementById('apiKeyInput').focus();
    }

    /**
     * Hide API key modal
     */
    hideApiKeyModal() {
        document.getElementById('apiKeyModal').classList.add('hidden');
        document.getElementById('apiKeyInput').value = '';
    }

    /**
     * Save API key to localStorage
     */
    saveApiKey() {
        const keyInput = document.getElementById('apiKeyInput');
        const key = keyInput.value.trim();
        
        if (!key) {
            this.showToast('API Key tidak boleh kosong', 'error');
            return;
        }

        if (!key.startsWith('gsk_')) {
            this.showToast('API Key Groq harus dimulai dengan "gsk_"', 'error');
            return;
        }

        this.apiKey = key;
        localStorage.setItem('groq-api-key', key);
        this.hideApiKeyModal();
        this.showToast('API Key berhasil disimpan!', 'success');
    }

    /**
     * Select prompt type and update UI
     */
    selectPromptType(selectedBtn) {
        // Remove active class from all buttons
        document.querySelectorAll('.prompt-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected button
        selectedBtn.classList.add('active');
        
        // Update current length
        this.currentLength = selectedBtn.dataset.type;
    }

    /**
     * Update UI language based on selection
     */
    updateUILanguage() {
        const elements = {
            'generateBtnText': t('generateButton', this.currentLanguage),
        };

        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = elements[id];
            }
        });
    }

    /**
     * Update placeholder text based on language and spirituality
     */
    updatePlaceholder() {
        const feelingInput = document.getElementById('feelingInput');
        const placeholder = t('feelingPlaceholder', this.currentLanguage);
        feelingInput.placeholder = placeholder;
        
        // Optionally show example
        const example = getExampleFeeling(this.currentSpirituality, this.currentLanguage);
        if (example) {
            feelingInput.title = `Contoh: ${example}`;
        }
    }

    /**
     * Generate spiritual reflection using AI
     */
    async generateReflection() {
        if (this.isGenerating) return;

        const feelingInput = document.getElementById('feelingInput');
        const feeling = feelingInput.value.trim();

        // Validate input
        if (!validateInput(feeling)) {
            this.showToast('Mohon ceritakan perasaanmu dengan lebih detail (minimal 3 karakter)', 'error');
            feelingInput.focus();
            return;
        }

        // Check API key
        if (!this.apiKey) {
            this.showApiKeyModal();
            return;
        }

        this.isGenerating = true;
        this.showLoadingState();

        try {
            // Generate prompt
            const { system, user } = generatePrompt(
                feeling,
                this.currentLanguage,
                this.currentSpirituality,
                this.currentLength
            );

            // Select optimal model
            const model = selectOptimalModel(this.currentLength);

            // Call Groq API
            const response = await this.callGroqAPI(system, user, model);
            
            if (response.success) {
                this.showResult(response.data, response.usage, model);
                this.lastGeneration = { feeling, language: this.currentLanguage, spirituality: this.currentSpirituality, length: this.currentLength };
            } else {
                throw new Error(response.error);
            }

        } catch (error) {
            console.error('Generation error:', error);
            this.showToast('Terjadi kesalahan saat membuat refleksi. Silakan coba lagi.', 'error');
        } finally {
            this.isGenerating = false;
            this.hideLoadingState();
        }
    }

    /**
     * Call Groq API for text generation
     */
    async callGroqAPI(systemPrompt, userPrompt, model) {
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    model: model,
                    max_tokens: modelConfigs[model].maxTokens,
                    temperature: modelConfigs[model].temperature,
                    stream: false
                })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('API Key tidak valid. Silakan periksa kembali.');
                } else if (response.status === 429) {
                    throw new Error('Terlalu banyak permintaan. Silakan tunggu sebentar.');
                } else {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
            }

            const data = await response.json();
            
            // Extract usage information from headers or response
            const usage = {
                inputTokens: data.usage?.prompt_tokens || 0,
                outputTokens: data.usage?.completion_tokens || 0,
                totalTokens: data.usage?.total_tokens || 0
            };

            let reflectionText = data.choices[0]?.message?.content?.trim();
            
            // Auto-translate if needed (English to Indonesian)
            if (this.currentLanguage === 'id' && this.detectLanguage(reflectionText) === 'en') {
                try {
                    reflectionText = await this.autoTranslate(reflectionText, 'id');
                } catch (translateError) {
                    console.warn('Translation failed, using original text:', translateError);
                }
            }

            return {
                success: true,
                data: reflectionText,
                usage: usage
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Detect language of text (simple detection)
     */
    detectLanguage(text) {
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
    async autoTranslate(text, to = 'id') {
        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Translation service unavailable');
            }
            
            const data = await response.json();
            return data[0].map(t => t[0]).join('');
        } catch (error) {
            console.warn('Translation failed:', error);
            return text; // Return original text if translation fails
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        document.getElementById('loadingState').classList.remove('hidden');
        document.getElementById('resultCard').classList.add('hidden');
        document.getElementById('generateBtn').disabled = true;
        document.getElementById('generateBtnText').textContent = t('generating', this.currentLanguage);
        
        // Scroll to loading state
        document.getElementById('loadingState').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        document.getElementById('loadingState').classList.add('hidden');
        document.getElementById('generateBtn').disabled = false;
        document.getElementById('generateBtnText').textContent = t('generateButton', this.currentLanguage);
    }

    /**
     * Show generation result
     */
    showResult(reflection, usage, model) {
        // Update result content
        document.getElementById('prayerResult').textContent = reflection;
        document.getElementById('modelUsed').textContent = modelConfigs[model].name;
        document.getElementById('tokenInput').textContent = usage.inputTokens;
        document.getElementById('tokenOutput').textContent = usage.outputTokens;

        // Show result card
        document.getElementById('resultCard').classList.remove('hidden');
        
        // Scroll to result
        document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Show success toast
        this.showToast('Refleksi spiritual berhasil dibuat! 🌿', 'success');
    }

    /**
     * Copy reflection to clipboard
     */
    async copyReflection() {
        const reflectionText = document.getElementById('prayerResult').textContent;
        
        try {
            await navigator.clipboard.writeText(reflectionText);
            this.showToast(t('copied', this.currentLanguage), 'success');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = reflectionText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast(t('copied', this.currentLanguage), 'success');
        }
    }

    /**
     * Share reflection using Web Share API or fallback
     */
    async shareReflection() {
        const reflectionText = document.getElementById('prayerResult').textContent;
        const shareData = {
            title: 'Generator Doa - Refleksi Spiritual',
            text: reflectionText,
            url: window.location.href
        };

        try {
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
                this.showToast('Refleksi berhasil dibagikan!', 'success');
            } else {
                // Fallback: copy to clipboard
                await this.copyReflection();
            }
        } catch (error) {
            console.error('Sharing failed:', error);
            await this.copyReflection();
        }
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Add icon based on type
        const icon = type === 'success' ? 
            '<img src="public/assets/success.svg" class="w-5 h-5" alt="Success">' :
            '<img src="public/assets/error.svg" class="w-5 h-5" alt="Error">';
        
        toast.innerHTML = `
            ${icon}
            <span class="text-gray-800 dark:text-gray-200">${message}</span>
        `;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('slide-in');
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('slide-in');
            toast.classList.add('slide-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Setup content protection (anti-copy measures)
     */
    setupContentProtection() {
        // Disable right-click context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showToast('Klik kanan dinonaktifkan untuk melindungi konten', 'error');
        });

        // Disable copy keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a'].includes(e.key.toLowerCase())) {
                // Allow copy/select in input fields
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    return;
                }
                e.preventDefault();
                this.showToast('Shortcut keyboard dinonaktifkan untuk melindungi konten', 'error');
            }
        });

        // Disable text selection on specific elements
        document.addEventListener('selectstart', (e) => {
            if (e.target.closest('#prayerResult')) {
                e.preventDefault();
            }
        });

        // Disable drag
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        // Disable F12 (Developer Tools)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                e.preventDefault();
                this.showToast('Developer tools dinonaktifkan', 'error');
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GeneratorDoa();
});

// Handle beforeunload for unsaved changes
window.addEventListener('beforeunload', (e) => {
    const feelingInput = document.getElementById('feelingInput');
    if (feelingInput && feelingInput.value.trim().length > 10) {
        e.preventDefault();
        e.returnValue = 'Kamu memiliki teks yang belum diproses. Yakin ingin meninggalkan halaman?';
    }
});

// Service Worker registration (if needed in the future)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker here if needed
        console.log('Service Worker ready for future implementation');
    });
}
