# 🌿 Generator Doa - Universal Prayer Reflection Tool

A lightweight, responsive, and multilingual web application that generates personalized spiritual prayers and reflections using AI, designed to be inclusive for all beliefs and spiritual backgrounds.

![Generator Doa](https://img.shields.io/badge/Generator%20Doa-Universal%20Prayer%20Tool-green?style=for-the-badge&logo=leaf&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-06B6D4?style=flat&logo=tailwindcss)
![Groq AI](https://img.shields.io/badge/Groq%20AI-LLaMA%203-orange?style=flat)

## ✨ Features

### 🌍 **Universal & Inclusive**
- **Multi-Language Support**: English and Indonesian with seamless switching
- **Multi-Spiritual**: Islam, Christianity, Buddhism, Agnostic, and Universal approaches
- **Inclusive Design**: Respects all beliefs and spiritual backgrounds

### 🤖 **AI-Powered Intelligence**
- **Groq API Integration**: Powered by LLaMA 3 models (8B, 70B, 3.1 variants)
- **Smart Model Selection**: Automatic optimal model selection based on reflection depth
- **Poetic Mode**: Advanced mode for verse-style spiritual reflections
- **Dynamic Prompts**: Context-aware system prompts for different spiritual tones

### 🎨 **Modern User Experience**
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Mode**: System-aware theme switching with preserved emoji colors
- **Progressive Web App**: Installable as a native app experience
- **Copy Protection**: Built-in content protection while maintaining usability

### 🔐 **Privacy & Security**
- **Client-Side Only**: API keys stored locally in browser
- **No Backend Required**: Direct API communication for maximum privacy
- **Secure Validation**: Real-time API key validation
- **Token Monitoring**: Live usage tracking and remaining quota display

### 📊 **Advanced Features**
- **Token Usage Tracking**: Monitor input/output tokens and remaining quota
- **Reflection History**: Generate multiple variations of reflections
- **Social Sharing**: Share reflections with built-in sharing functionality
- **Multi-Format Export**: Copy and share in various formats

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- A free [Groq API Key](https://console.groq.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/maulananais/Generator_Doa.git
   cd Generator_Doa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

5. **Get your free Groq API Key**
   - Visit [console.groq.com](https://console.groq.com)
   - Sign up with Google/GitHub
   - Create a new API key
   - Enter it in the app to start generating reflections

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **next-themes** - Theme management

### AI & API
- **Groq API** - Ultra-fast LLaMA model inference
- **LLaMA 3 Models** - 8B, 70B, and 3.1 variants
- **Dynamic Model Selection** - Automatic optimization based on requirements

### Features
- **PWA Ready** - Service worker and manifest
- **Responsive Design** - Mobile-first approach
- **Copy Protection** - Content security features
- **Multi-language** - i18n with dynamic switching

## 🎯 How It Works

1. **Choose Your Spiritual Approach**: Select from Universal, Islamic, Christian, Buddhist, or Agnostic perspectives
2. **Select Language**: Switch between English and Indonesian
3. **Set Reflection Depth**: Choose Short, Medium, or Deep reflections
4. **Enable Poetic Mode** (Optional): For verse-style spiritual poetry
5. **Share Your Feelings**: Describe your current emotional state or situation
6. **Generate Reflection**: AI creates a personalized spiritual reflection
7. **Regenerate or Share**: Create variations or share your reflection

## 📱 Supported AI Models

| Model | Description | Best For | Tokens |
|-------|-------------|----------|---------|
| **LLaMA 3 8B** | Fast and efficient | Quick reflections | 800-1000 |
| **LLaMA 3 70B** | Deep and comprehensive | Complex spiritual needs | 1500+ |
| **LLaMA 3.1 8B Instant** | Ultra-fast responses | Immediate comfort | 800 |
| **Gemma 2 9B** | Balanced approach | Mid-depth reflections | 1200 |

## 🌟 Use Cases

- **Daily Spiritual Practice**: Morning or evening reflections
- **Emotional Support**: Find comfort during difficult times
- **Meditation Guide**: Spiritual guidance for meditation
- **Prayer Inspiration**: Personalized prayer suggestions
- **Mindfulness Practice**: Present-moment awareness reflections
- **Faith Exploration**: Safe space to explore spiritual questions

## 🔧 Development

### Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Project Structure
```
Generator_Doa/
├── components/          # Reusable React components
│   ├── ApiKeyGuard.tsx # API key validation wrapper
│   ├── Loading.tsx     # Loading animations
│   ├── PrayerForm.tsx  # Main reflection form
│   ├── ResultBox.tsx   # Reflection display
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   └── Toast.tsx       # Notification system
├── lib/                # Utility functions
│   ├── groqApi.ts      # Groq API integration
│   ├── translations.ts # i18n translations
│   └── validateGroqKey.ts # API key validation
├── pages/              # Next.js pages
│   ├── _app.tsx        # App configuration
│   ├── index.tsx       # Landing page
│   ├── login.tsx       # API key input
│   └── dashboard.tsx   # Main application
├── public/             # Static assets
│   ├── assets/         # SVG icons
│   └── *.png           # Favicon and app icons
├── styles/             # Global CSS
├── types/              # TypeScript definitions
└── middleware.ts       # Next.js middleware
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Maulana Nais**
- GitHub: [@maulananais](https://github.com/maulananais)
- LinkedIn: [maulananais](https://linkedin.com/in/maulananais)
- Instagram: [@mqulqnqq](https://instagram.com/mqulqnqq)

## 🙏 Acknowledgments

- [Groq](https://groq.com) for providing ultra-fast AI inference
- [Meta](https://llama.meta.com) for the LLaMA models
- [Vercel](https://vercel.com) for Next.js framework
- [Tailwind CSS](https://tailwindcss.com) for the design system
- [Lucide](https://lucide.dev) for beautiful icons

## 💝 Support the Project

If this project has brought you peace or comfort, consider:
- ⭐ Starring the repository
- 🔄 Sharing with others who might benefit
- 🤝 Contributing to the codebase
- 💬 Providing feedback and suggestions

---

<div align="center">

**"Because every feeling deserves light." 🌿**

*Made with ❤️ for universal spiritual wellness*

</div>