 Revision for Generator_Doa — Universal Spiritual Reflection Web
A lightweight, responsive, and multilingual web app to generate personalized spiritual prayers or reflections using Groq AI models.
Built with love by Maulana Nais 😇

💡 Why Use Next.js?
Feature	Reason
🧱 Architecture	Page-based, modular, clean structure
🌗 Theme	Easy dark/light mode toggle using next-themes
🔐 Auth	Full validation of Groq API Key before entering app
🌍 i18n	Multilingual-ready (Indonesian, English, others)
⚡ Performance	Static generation, fast client-side transitions
🚀 Deploy	Optimized for Vercel or any static host
🛠️ DX	TypeScript & file routing = dev experience heaven

🔐 Auth Flow – Secure Groq API Validation
This app does not use a simple modal input. Instead, it has a proper authentication flow.

1. 🔒 /login Page
Users input their Groq API Key

On submit, app sends a GET or HEAD request to:

arduino
Copy
Edit
https://api.groq.com/openai/models
If the key is valid:

Save it in localStorage

Redirect to /dashboard

If invalid:

Show a proper error alert, don't proceed

2. 🧱 Middleware / Route Guard
If groqApiKey is missing from localStorage, block access to /dashboard

Redirect back to /login

3. 🔁 Logout Mechanism
Clear localStorage and force reload or redirect to /login

🧩 Project Structure Suggestion
bash
Copy
Edit
Generator_Doa/
├── pages/
│   ├── index.tsx          # Landing / Introduction
│   ├── login.tsx          # Groq API Key input
│   └── dashboard.tsx      # Main reflection generator
├── components/
│   ├── ThemeToggle.tsx
│   ├── PrayerForm.tsx
│   ├── ResultBox.tsx
│   └── ApiKeyGuard.tsx
├── lib/
│   └── validateGroqKey.ts
├── public/
│   └── assets/            # SVG icons
├── styles/
│   └── globals.css
└── revision-one.md
🧠 Supported Groq AI Models
Model ID	Token Limit	Strength
llama3-8b-8192	8192 tokens	🔹 Fast, efficient for short/medium reflections
llama3-70b-8192	8192 tokens	🔸 Deep understanding, ideal for long/complex prayers
llama-3.3-70b-versatile	8192+	🎯 Balanced tone for any belief system
gemma2-9b-it	8192 tokens	🧘 Calm and precise, great for universal tone
llama-4-maverick-17b	8192+	💬 Empathetic, expressive, well-suited for spiritual writing

✨ Prompt System Template (English Only)
txt
Copy
Edit
You are a universal and compassionate spiritual assistant.

Based on the user's emotional input, preferred language (id/en), spiritual tone (Islamic, Christian, Buddhist, Agnostic, Universal), and depth (short / medium / deep),
generate a warm and peaceful spiritual prayer or reflection.

Instructions:
- ONLY respond with the prayer/reflection itself, no explanation or label.
- Always be gentle, thoughtful, and emotionally aware.
- Format output in a clean paragraph unless poetic formatting is requested.
- Respect the tone and belief provided.
🧘 Optional Prompt Modifiers
Spiritual Tone	Additional Prompt Instruction
Agnostic	"Use a meditative and universal tone, avoid naming any deity."
Islamic	"Incorporate Islamic expressions like 'Ya Allah', 'Bismillah' softly."
Christian	"Use Christian phrases like 'Lord', 'Heavenly Father' sincerely."
Buddhist	"Use calm and reflective language referencing peace, karma, and mindfulness."
Universal	"Avoid religious bias, write with love, clarity, and hope for everyone."

📊 Token Info Display (Groq Rate Headers)
After generation, display token usage:

txt
Copy
Edit
Model: llama3-8b-8192  
Input Tokens: 152  
Output Tokens: 210  
Total Tokens: 362
From Groq response headers:

x-ratelimit-remaining-tokens

x-ratelimit-remaining-requests

📋 Revision Checklist
 Switch from static HTML to full-featured Next.js app

 Secure and validate Groq API Key before usage

 Token input/output tracker per request

 Multilingual UI and response (🇮🇩 / 🇬🇧)

 Multiple models support via dropdown

 Optional theme toggle (light/dark)

 Full route protection for /dashboard

 Logout / reset flow from localStorage

 Universal prompt engine (multi-faith, emotional depth)

 No backend dependency — pure client-side