# Deployment Guide - Mzansi CAPS Tutor

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Prepare Your Project
```bash
# Make sure your .env.local is ready with API keys
# Build test
npm run build
```

### Step 2: Deploy via Vercel CLI
```bash
# Install Vercel globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Step 3: Set Environment Variables in Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add all variables from `.env.local`

### Step 4: Custom Domain (Optional)
1. Settings → Domains
2. Add your domain
3. Update DNS records as instructed

---

## Option 2: Deploy to Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm i -g firebase-tools
```

### Step 2: Login and Init
```bash
firebase login
firebase init hosting
```

### Step 3: Configure firebase.json
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Step 4: Deploy
```bash
firebase deploy --only hosting
```

---

## Option 3: GitHub + Vercel (Auto-Deploy)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mzansi-caps-tutor.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [Vercel](https://vercel.com)
2. "Import Project"
3. Select your GitHub repo
4. Add Environment Variables
5. Deploy!

---

## Post-Deployment Checklist

- [ ] Test login on live URL
- [ ] Test subject selection
- [ ] Test AI chat functionality
- [ ] Test quiz functionality
- [ ] Check mobile responsiveness
- [ ] Verify all API keys work

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### API Errors
- Check environment variables are set in Vercel/Firebase
- Verify API keys have correct permissions
- Check browser console for specific errors

### CORS Issues
- Ensure API keys allow your domain
- For Gemini: Check Google AI Studio settings

---

## Current Build Output
```
dist/
├── index.html
└── assets/
    ├── index-CLsvF0zX.css
    └── index-*.js
```

Build size: ~1MB (gzipped: ~250KB)
