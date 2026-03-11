# Mzansi CAPS Tutor - Production Ready Checklist

## Pre-Launch Checklist

### 1. Environment Variables Required
Create a `.env.local` file with these keys:

```env
# Firebase Config (get from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Gemini AI (get from Google AI Studio)
VITE_GEMINI_API_KEY=your_gemini_api_key

# Optional: WhatsApp Integration (Twilio)
VITE_TWILIO_ACCOUNT_SID=your_twilio_sid
VITE_TWILIO_AUTH_TOKEN=your_twilio_token
VITE_TWILIO_PHONE_NUMBER=+1234567890
```

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project "mzansi-caps-tutor"
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Copy config to `.env.local`

### 3. Gemini AI Setup
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to `.env.local`

### 4. Security Rules
- [ ] Firestore rules configured (see `firestore.rules`)
- [ ] Authentication rules set
- [ ] API keys restricted (domainlimiting)

### 5. Content Verification
- [ ] Quiz content reviewed for accuracy
- [ ] CAPS curriculum aligned
- [ ] Past paper questions verified

### 6. Testing
- [ ] Login/Logout works
- [ ] Subject selection works
- [ ] Chat functionality works
- [ ] Quiz functionality works
- [ ] Voice input works (if enabled)
- [ ] Mobile responsive

### 7. Legal & Compliance
- [ ] Privacy Policy created
- [ ] Terms of Service created
- [ ] Data protection (POPIA) compliance

### 8. Performance
- [ ] Lighthouse score > 80
- [ ] First Contentful Paint < 2s
- [ ] Bundle size optimized

## Post-Launch Monitoring
- [ ] Analytics setup (optional)
- [ ] Error tracking (Sentry)
- [ ] User feedback collection
- [ ] Usage stats dashboard

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel deploy

# Deploy to Firebase
firebase deploy
```
