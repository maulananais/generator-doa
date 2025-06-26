🌿 Generator_Doa – Universal Prayer Reflection Tool
Sebuah web AI ringan dan responsif untuk menghasilkan doa/refleksi spiritual berdasarkan perasaan pengguna, dapat dipakai oleh semua keyakinan (universal).
Dibuat dengan hati oleh Maulana Nais 😇

🧩 Tech Stack Ringan & Modern
Bagian	Teknologi
🧠 AI Engine	Groq API (LLaMA3/8B/70B etc.)
🎨 UI	TailwindCSS + HTML5 + Vanilla JS
🔐 Auth API	API Key via localStorage
🕊️ Translate	Google Translate API (No key)
🌗 Dark/Light Mode	Manual toggle via Tailwind
📱 UX	Mobile-first Responsive Design

Untuk model AI nya ada
✅	Model	Alasan
⭐️ llama3-8b-8192	🔥 Paling ideal untuk awal: 14400 RPD, 6000 TPM, 500k TPD, ringan dan cepat!	
🔄 llama3-70b-8192	Untuk pilihan “panjang/dalam”: powerful & punya 70B params, tetap 6000 TPM dan 500k TPD	
🧠 llama-3.1-8b-instant	Nama instant cocok untuk "fast mode" dari hasil pendek dan cepat (mirip 8B tapi lebih halus)	
🧠 gemma2-9b-it	Mirip LLaMA tapi fine-tuned, cocok buat pilihan midway antara ringan dan deep	
✨ meta-llama/llama-4-maverick-17b	Kalau kamu someday pengen ekspansi: ini powerful dan udah LLaMA 4 — bisa buat “doa visioner masa depan” 😭


✨ Fitur Utama
🌍 Multi Bahasa: 🇮🇩 Indonesia & 🇬🇧 English

☯️ Multi Spiritualitas: Islam, Kristen, Buddha, Agnostik, Universal

🧠 Prompt Tipe: Ringkas / Sedang / Mendalam

🔄 Regenerasi Doa

🔐 Groq API Key Client-only

🧾 Token Usage: Input, Output, Total (Groq Header)

📤 Share & Copy Refleksi

🌗 Light/Dark Mode Toggle

🚫 Proteksi Konten: Anti Copy, Klik Kanan, Ctrl+C

🪄 Auto Translate: dari English ke Indonesia jika perlu

🔧 Struktur Proyek
pgsql
Copy
Edit
Generator_Doa/
├── public/
│   └── assets/
│       ├── share.svg
│       ├── copy.svg
│       ├── send.svg
│       ├── generate-again.svg
│       ├── success.svg
│       └── error.svg
├── index.html
├── styles.css
├── script.js
├── prompt.js
└── README.md
📦 Instalasi & Menjalankan
Tidak perlu backend, cukup clone dan buka index.html di browser:

bash
Copy
Edit
git clone https://github.com/maulananais/Generator_Doa.git
cd Generator_Doa
# lalu buka index.html di browser
🔐 API KEY Setup (Groq)
js
Copy
Edit
function getApiKey() {
  let key = localStorage.getItem('groq-api-key');
  if (!key) {
    key = prompt('Masukkan Groq API Key Anda:');
    if (!key) {
      alert('API Key diperlukan.');
      location.reload();
    }
    localStorage.setItem('groq-api-key', key);
  }
  return key;
}
🧠 Prompt Spiritual AI
js
Copy
Edit
const systemPrompt = `
You are a universal and compassionate spiritual assistant.
Given the user's emotional input, language, spiritual tone, and length request,
generate a warm and empathetic prayer/reflection.

Rules:
- Respond ONLY in plain text.
- DO NOT explain or label anything.
- Respect language and faith choice.
- Adjust to short / medium / deep tone.
`;
🌐 Translate Support (Auto)
js
Copy
Edit
async function autoTranslate(text, to = 'id') {
  const url = \`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=\${to}&dt=t&q=\${encodeURIComponent(text)}\`;
  const res = await fetch(url);
  const data = await res.json();
  return data[0].map(t => t[0]).join('');
}
🌗 Light / Dark Mode (Tailwind Toggle)
Gunakan Tailwind dengan class dark

Simpan preferensi user di localStorage

Implementasi toggle:

js
Copy
Edit
const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
};

// Saat load:
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
🛡️ Proteksi Konten (Anti Copy)
js
Copy
Edit
document.addEventListener('copy', (e) => {
  e.preventDefault();
  alert('Copy teks dinonaktifkan.');
});

document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});
📊 Token & Model Display
Tampilkan dari response header:

Copy
Edit
x-ratelimit-remaining-tokens
x-ratelimit-remaining-requests
Contoh di UI:

yaml
Copy
Edit
Model: llama3-8b-8192  
Token Input: 142  
Token Output: 198  
📱 Mobile UX
Desain mobile-first, pakai max-w-[600px] dan padding

Tombol besar, ikon SVG responsif

Scroll otomatis ke hasil setelah generate

👑 Dibuat oleh Maulana Nais
Project ini adalah bentuk cinta digital yang bisa menjangkau semua keyakinan dan suasana hati 🌿
“Karena setiap rasa pantas mendapatkan cahaya.”