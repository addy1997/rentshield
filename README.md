<div align="center">

# 🛡️ RentShield

### AI-Powered Tenant Protection for the UK Renters' Rights Act 2026

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI_Powered-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**RentShield** is a Progressive Web App (PWA) that empowers UK tenants with AI-driven tools to understand, exercise, and protect their legal rights under the **Renters' Rights Act 2026**.

[Features](#-features) • [Screenshots](#-screenshots) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [API Reference](#-api-reference)

</div>

---

## 🎯 Overview

RentShield acts as your personal legal guardian, using Google's Gemini AI to analyze contracts, detect illegal landlord practices, track housing hazards, and generate legally-backed responses — all from your phone.

### Key Highlights

- **🔍 Smart Contract Scanner** — Upload tenancy agreements and instantly identify illegal clauses
- **⚠️ Housing Problem Tracker** — Log hazards with legal countdown timers under Awaab's Law
- **🤖 AI-Powered Analysis** — Powered by Google Gemini for accurate legal interpretation
- **📱 Mobile-First PWA** — Install on any device, works offline
- **🔐 Secure Access** — PIN and biometric authentication

---

## ✨ Features

### 📄 Contract & Rights Scanner

Scan and analyze tenancy documents for legal compliance:

| Feature | Description |
|---------|-------------|
| **Contract Analysis** | Detects Section 21 clauses, illegal fees, invalid fixed terms, and pet ban violations |
| **Bidding War Detection** | Identifies illegal rent bidding practices from screenshots of messages |
| **EPC Compliance Check** | Analyzes energy performance to verify 2026 EPC 'C' rating mandate compliance |
| **Tenant Health Score** | 0-100 score indicating contract safety level |
| **Exportable Reports** | Download legal reports as formal documentation |

### 🏠 Housing Problem Tracker

Track and manage housing hazards with legal timelines:

- **Hazard Logging** — Photo-based hazard detection (mould, leaks, structural issues)
- **Severity Classification** — AI-powered severity rating (Low/Medium/High/Critical)
- **14-Day Legal Countdown** — Automatic tracking under Awaab's Law
- **Status Management** — Track from "Reported" to "Resolved"
- **Ombudsman Escalation** — One-click escalation when deadlines are missed

### ⚖️ Rights & Tools

| Tool | Description |
|------|-------------|
| **Rent Increase Analyzer** | Calculates if proposed rent increases are fair based on market trends |
| **Landlord Speak Translator** | Converts confusing landlord jargon into plain English with legal context |
| **Smart Response Generator** | Generates legally-cited responses in Diplomatic or Strictly Legal tones |

### 🔐 Security & UX

- **PIN Authentication** — 4-digit secure PIN with setup flow
- **Biometric Login** — Fingerprint/Face ID support
- **Dark Mode** — Full dark theme support
- **Onboarding Tour** — Interactive introduction to all features
- **Scan History** — Complete history of all document scans

---

## 📱 Screenshots

<div align="center">
<table>
  <tr>
    <td align="center"><img src="screenshots/rights-response.png" width="200" alt="Response Generator"/><br/><b>Response Generator</b></td>
    <td align="center"><img src="screenshots/rights-translator.png" width="200" alt="Landlord Translator"/><br/><b>Landlord Translator</b></td>
    <td align="center"><img src="screenshots/rights-rent.png" width="200" alt="Rent Analyzer"/><br/><b>Rent Analyzer</b></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/housing-problems.png" width="200" alt="Housing Problems"/><br/><b>Housing Problems</b></td>
    <td align="center"><img src="screenshots/contract-scanner.png" width="200" alt="Contract Scanner"/><br/><b>Contract Scanner</b></td>
    <td></td>
  </tr>
</table>
</div>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Google Gemini API Key** — [Get one here](https://ai.google.dev/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rentshield.git
   cd rentshield
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19.2 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 6.2 |
| **AI/ML** | Google Gemini AI (@google/genai) |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **Date Handling** | date-fns 4.1 |
| **Styling** | Custom CSS with Tailwind-like utilities |

---

## 📁 Project Structure

```
rentshield/
├── App.tsx                 # Main application component with all views
├── index.tsx               # React entry point
├── index.html              # HTML template
├── types.ts                # TypeScript type definitions
├── vite.config.ts          # Vite configuration
├── components/
│   └── ui.tsx              # Reusable UI components (NeuButton, SoftCard, etc.)
├── services/
│   └── geminiService.ts    # Google Gemini AI integration
├── screenshots/            # App screenshots for documentation
├── sw.js                   # Service Worker for PWA
└── manifest.json           # PWA manifest
```

---

## 🔌 API Reference

### Gemini Service Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `analyzeContract(imageBase64)` | Analyzes tenancy agreement for illegal clauses | `{ isSafe, score, summary, issues[] }` |
| `analyzeHazard(imageBase64)` | Classifies housing hazard from photo | `{ type, severity, description }` |
| `detectBiddingWar(imageBase64)` | Detects illegal bidding practices | `{ isIllegal, evidence }` |
| `analyzeEPC(imageBase64)` | Checks EPC compliance | `{ score, comfort, compliance, summary }` |
| `generateResponse(tone, context)` | Generates landlord response | `string` |
| `analyzeRentIncrease(current, new, location)` | Evaluates rent increase fairness | `{ isFair, advice, letter }` |
| `translateLandlordSpeak(text)` | Translates landlord jargon | `{ translation, legalStanding }` |

---

## 📋 Legal Context

RentShield is designed around the **UK Renters' Rights Act 2026**, which includes:

- **Abolition of Section 21** — No-fault evictions are illegal
- **Awaab's Law** — Landlords must address hazards within 14 days
- **Pet Rights** — Tenants can request pets; consent cannot be unreasonably refused
- **Bidding War Ban** — Landlords cannot solicit higher rent offers
- **EPC Mandate** — Properties must meet minimum 'C' energy rating

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

RentShield provides informational guidance based on the UK Renters' Rights Act 2026. It is **not a substitute for professional legal advice**. Always consult with the Housing Ombudsman or a qualified legal professional for formal disputes.

---

<div align="center">

**Built with ❤️ for UK Tenants**

[Report Bug](https://github.com/yourusername/rentshield/issues) • [Request Feature](https://github.com/yourusername/rentshield/issues)

</div>
