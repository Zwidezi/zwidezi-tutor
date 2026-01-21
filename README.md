<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎓 Zwidezi Tutor - South African Learning App

An AI-powered tutoring application designed for South African students, featuring grade-specific curriculum support, interactive chat, and WhatsApp integration.

## ✨ Features

- 📚 Grade-specific curriculum (Grades 8-12)
- 🤖 AI-powered tutoring using Google Gemini
- 💬 Interactive chat interface with streaming responses
- 📱 WhatsApp bot integration ready
- 🇿🇦 South African CAPS curriculum aligned
- 🎨 Beautiful UI with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Free Gemini API Key** - See instructions below 👇

### 🔑 Getting Your FREE Gemini API Key

**Google Gemini offers a generous FREE tier:**
- ✅ No credit card required
- ✅ 1,500 requests per day
- ✅ Perfect for testing and small deployments

**Steps to get your key:**

1. **Go to Google AI Studio**
   - Visit: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
   - Or: [https://ai.google.dev](https://ai.google.dev) → Click "Get API Key"

2. **Sign in with your Google account**

3. **Click "Create API Key"**
   - Select "Create API key in new project" or use existing project
   - Copy the key (looks like: `AIzaSy...`)

4. **Keep it safe!** You'll need it in the next step

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zwidezi/zwidezi-tutor.git
   cd zwidezi-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   
   Copy the example file:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and paste your key:
   ```env
   VITE_GEMINI_API_KEY=AIzaSy...your_actual_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** 🎉
   
   Navigate to `http://localhost:5173`

## 🌐 Deploy to Production

### Deploy to Vercel (Recommended - FREE)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add your API key to Vercel**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   ```
   Paste your Gemini API key when prompted

4. **Deploy again**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy to Netlify

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Set environment variable**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add `VITE_GEMINI_API_KEY` with your key

## 💰 API Costs & Limits

**Gemini FREE Tier:**
- 15 requests per minute
- 1,500 requests per day
- 1 million requests per month
- **Perfect for:** Testing, small schools (up to ~50 active students/day)

**If you need more:**
- Consider paid tier (~$0.001 per request)
- Or switch to alternatives like Groq (free, 14,400/day)

## 🔧 Configuration

### WhatsApp Bot

The WhatsApp bot number is configured in `App.tsx`:
- Current number: `+27658396392`
- To change it, edit the `BOT_PHONE_NUMBER` constant
- **Note:** WhatsApp sync opens wa.me link - you need a real bot backend to receive messages

### Tailwind CSS

Custom South African flag colors are available:
```tsx
className="bg-sa-green text-sa-gold"
```
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
- **Google Gemini** - AI tutoring (gemini-3-flash-preview)

## 📝 Usage

1. Select your grade level (8-12)
2. Choose a subject (Math, Science, English, etc.)
3. Optionally enable WhatsApp sync
4. Start chatting with your AI tutor!

**Student can ask:**
- "Explain [topic]"
- "Give me practice questions"
- "Test me on [topic]"
- "Help me study for [exam]"
- "Summarise [topic]"

## 🐛 Troubleshooting

**App won't start?**
- Make sure you ran `npm install`
- Check Node.js version: `node --version` (need v18+)

**AI not responding?**
- Check `.env.local` exists and has correct key
- Verify key at [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- Check browser console for errors

**Styles not working?**
- Run `npm install` again
- Clear browser cache
- Try `npm run build` and `npm run preview`

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is private and for educational purposes.

## 🔗 Links

- **Get FREE Gemini API Key:** [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- **View in AI Studio:** [https://ai.studio/apps/drive/1nzkbko8EkBJKY01-P3YHPIJB5EwCvk-i](https://ai.studio/apps/drive/1nzkbko8EkBJKY01-P3YHPIJB5EwCvk-i)
- **Gemini API Docs:** [https://ai.google.dev/docs](https://ai.google.dev/docs)

---

Made with 💚 for South African students | **FREE** to use with Gemini's generous free tier!
