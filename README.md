<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎓 Zwidezi Tutor - South African Learning App

An AI-powered tutoring application designed for South African students, featuring grade-specific curriculum support, interactive chat, and WhatsApp integration.

## ✨ Features

- 📚 Grade-specific curriculum (Grades 8-12)
- 🤖 AI-powered tutoring using Google Gemini
- 💬 Interactive chat interface with streaming responses
- 📱 WhatsApp bot integration
- 🇿🇦 South African curriculum aligned
- 🎨 Beautiful UI with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zwidezi/zwidezi-tutor.git
   cd zwidezi-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to the URL shown in your terminal (usually `http://localhost:5173`)

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 🔧 Configuration

### WhatsApp Bot

The WhatsApp bot number is configured in `App.tsx`:
- Current number: `+27658396392`
- To change it, edit the `BOT_PHONE_NUMBER` constant in `App.tsx`

### Tailwind CSS

Custom South African flag colors are available:
- `sa-green`: #007A4D
- `sa-gold`: #FFB612
- `sa-red`: #DE3831
- `sa-blue`: #002395

## 📁 Project Structure

```
zwidezi-tutor/
├── components/          # React components
│   ├── Button.tsx
│   ├── ChatMessage.tsx
│   ├── StudyPage.tsx
│   └── SubjectPicker.tsx
├── data/               # Curriculum data
│   └── curriculum.ts
├── services/           # API services
│   └── geminiService.ts
├── App.tsx             # Main app component
├── index.tsx           # Entry point
├── types.ts            # TypeScript types
├── index.css           # Global styles
├── tailwind.config.js  # Tailwind configuration
└── package.json        # Dependencies
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Google Gemini** - AI tutoring

## 📝 Usage

1. Select your grade level (8-12)
2. Choose a subject (Math, Science, English, etc.)
3. Optionally enable WhatsApp sync
4. Start chatting with your AI tutor!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is private and for educational purposes.

## 🔗 Links

- View app in AI Studio: https://ai.studio/apps/drive/1nzkbko8EkBJKY01-P3YHPIJB5EwCvk-i
- Get Gemini API Key: https://makersuite.google.com/app/apikey

---

Made with 💚 for South African students
