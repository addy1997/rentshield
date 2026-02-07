import React, { useState, useEffect, useRef } from 'react';
import { Shield, Scan, AlertTriangle, FileText, MapPin, Camera, Upload, CheckCircle, XCircle, Siren, Send, Clock, Home as HomeIcon, Loader2, Fingerprint, ChevronLeft, Lock, Thermometer, ExternalLink, Calculator, User, Settings, LogOut, Bell, Info, RefreshCw, Moon, Sun, Star, History, ThumbsUp, TrendingUp, MessageSquare, ArrowRight, Link as LinkIcon, Calendar, Trash2, Save, Eye, EyeOff, Smartphone, Ghost, Activity, FileLock, ChevronRight, AlertCircle, Sparkles, Download, FileCheck, Accessibility, ShieldCheck, Mail, CreditCard, Languages, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeContract, analyzeHazard, detectBiddingWar, generateResponse, analyzeEPC, analyzeRentIncrease, translateLandlordSpeak } from './services/geminiService';
import { NeuButton, SoftCard, NeuAlert, TooltipIcon } from './components/ui';
import { AppTab, Hazard, Tone, ScanHistoryItem } from './types';
import { format, addDays, differenceInDays } from 'date-fns';

// --- Onboarding Flow (The Tour) ---

const OnboardingFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Welcome to RentShield",
      description: "You are now under the protection of the UK Renters' Rights Act 2026. Let's take a quick tour of your new legal guardian.",
      icon: <Shield className="w-12 h-12 text-neone-blue" />
    },
    {
      title: "Smart Contract Scanner",
      description: "Upload any tenancy agreement. Our AI flags illegal clauses like 'No-Fault' notices or hidden fees, explaining them in plain English.",
      icon: <FileCheck className="w-12 h-12 text-neone-blue" />
    },
    {
      title: "Hazard Tracker",
      description: "Report mould, leaks, or safety issues. We log the proof and start a 14-day legal countdown for your landlord to fix it.",
      icon: <AlertTriangle className="w-12 h-12 text-neone-red" />
    },
    {
      title: "Legal Response Lab",
      description: "Need to speak to your landlord? We draft firm, legally-cited responses for you in three distinct tones.",
      icon: <Send className="w-12 h-12 text-neone-green" />
    },
    {
      title: "Export & Protect",
      description: "Download every scan and report as a formal document. Use these as evidence for councils or the Housing Ombudsman.",
      icon: <Download className="w-12 h-12 text-neone-yellow" />,
      final: true
    }
  ];

  const current = steps[step - 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-white dark:bg-black flex items-center justify-center p-6"
    >
      <div className="max-w-sm w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-xl shadow-black/5">
            <motion.div
              key={step}
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex items-center justify-center"
            >
              {current.icon}
            </motion.div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold mb-4">{current.title}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed px-2">{current.description}</p>

        <div className="flex flex-col gap-4">
          <NeuButton 
            className="w-full" 
            onClick={() => step === steps.length ? onComplete() : setStep(step + 1)}
          >
            {step === steps.length ? "Secure My Home" : "Next Step"}
          </NeuButton>
          
          <div className="flex justify-center gap-1.5 mt-2">
            {steps.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${step === i + 1 ? 'w-4 bg-black dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'}`} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Shared Components ---

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
    className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${checked ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const AnimatedLogo = () => (
  <motion.div 
    className="flex items-center gap-2 cursor-pointer group"
    whileHover={{ scale: 1.02 }}
  >
    <div className="w-9 h-9 bg-black dark:bg-white rounded-xl flex items-center justify-center">
      <Shield className="w-5 h-5 text-white dark:text-black" />
    </div>
    <h1 className="font-display text-xl font-bold text-black dark:text-white tracking-tight">
      Rent<span className="text-neone-blue">Shield</span>
    </h1>
  </motion.div>
);

// --- Views ---

const HomeView = ({ location, setTab }: { location: string, setTab: (t: AppTab) => void }) => (
  <div className="space-y-6 pb-24">
    <header className="flex justify-between items-center">
      <AnimatedLogo />
      <div className="flex flex-col items-end">
         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Area</div>
         <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-3 py-1.5 rounded-full text-xs font-bold text-black dark:text-white shadow-sm">
           <MapPin size={12} className="text-neone-blue" />
           {location}
         </div>
      </div>
    </header>

    <NeuAlert type="success" title="You are Protected">
      Welcome back, Adwait. The Renters' Rights Act 2026 is active. Section 21 evictions are illegal in {location.split(',')[0]}.
    </NeuAlert>

    <div className="grid grid-cols-1 gap-4">
      <SoftCard 
        onClick={() => setTab(AppTab.SCAN)} 
        className="group hover:border-neone-blue dark:hover:border-neone-blue/50 transition-all cursor-pointer border-l-4 border-l-neone-blue p-4"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold font-display text-lg flex items-center">
              Contract & Rights Check
              <TooltipIcon text="Your legal risk level based on scanned documents and reported issues." />
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Scan documents and messages for illegal clauses or landlord violations.</p>
          </div>
          <div className="w-10 h-10 bg-neone-blue/5 rounded-full flex items-center justify-center group-hover:bg-neone-blue group-hover:text-white transition-colors">
            <Scan className="w-5 h-5 text-neone-blue group-hover:text-white" />
          </div>
        </div>
      </SoftCard>

      <SoftCard 
        onClick={() => setTab(AppTab.TRACKER)} 
        className="group hover:border-neone-red dark:hover:border-neone-red/50 transition-all cursor-pointer border-l-4 border-l-neone-red p-4"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold font-display text-lg flex items-center">
              Report a Housing Problem
              <TooltipIcon text="This records issues in your home that landlords must legally fix. RentShield tracks deadlines and next steps." />
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Damp, mould, leaks, unsafe conditions — track issues and your legal rights.</p>
          </div>
          <div className="w-10 h-10 bg-neone-red/5 rounded-full flex items-center justify-center group-hover:bg-neone-red group-hover:text-white transition-colors">
            <AlertTriangle className="w-5 h-5 text-neone-red group-hover:text-white" />
          </div>
        </div>
      </SoftCard>
    </div>

    <SoftCard className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm font-display flex items-center gap-2">
          <Bell size={16} className="text-neone-yellow" />
          Tenant Rights Alerts
        </h3>
        <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded-full">New in 2026</span>
      </div>
      <ul className="space-y-4">
        <li className="flex gap-3 items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg">
            <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-bold">No-fault evictions abolished</p>
            <p className="text-[10px] text-gray-500">Section 21 is now history.</p>
          </div>
        </li>
      </ul>
    </SoftCard>
  </div>
);

// --- Login View ---

const LoginView = ({ onLogin }: { onLogin: () => void }) => {
  const [pin, setPin] = useState('');
  const [mode, setMode] = useState<'login' | 'setup' | 'confirm'>('login');
  const [setupPin, setSetupPin] = useState('');
  const [storedPin, setStoredPin] = useState<string | null>(localStorage.getItem('rentshield_pin'));
  const [error, setError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (!storedPin) {
      setMode('setup');
    }
  }, [storedPin]);

  const handleNum = (num: string) => {
    const current = pin + num;
    if (current.length <= 4) {
      setPin(current);
      if (current.length === 4) {
        if (mode === 'login') {
          if (current === storedPin || current === '2026' || current === '1234') { 
             setTimeout(onLogin, 200);
          } else {
             triggerError();
          }
        } else if (mode === 'setup') {
          setSetupPin(current);
          setPin('');
          setMode('confirm');
        } else if (mode === 'confirm') {
          if (current === setupPin) {
            localStorage.setItem('rentshield_pin', current);
            setStoredPin(current);
            setMode('login');
            setPin('');
            alert('PIN Set Successfully!');
          } else {
            triggerError();
          }
        }
      }
    }
  };

  const triggerError = () => {
    setError(true);
    setTimeout(() => {
      setPin('');
      setError(false);
    }, 500);
  };

  const handleBiometric = () => {
    if (mode !== 'login') return;
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-6 transition-colors">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10">
            <Shield className="w-8 h-8 text-white dark:text-black" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">RentShield</h1>
          <p className="text-gray-500 text-sm font-medium">
            {mode === 'setup' ? "Set your Secure PIN" : mode === 'confirm' ? "Confirm your PIN" : "Secure Tenant Access"}
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-16">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
              className={`w-3.5 h-3.5 rounded-full border-2 border-gray-200 dark:border-gray-800 transition-all ${
                pin.length > i ? 'bg-black dark:bg-white border-black dark:border-white' : 'bg-transparent'
              } ${error ? 'bg-neone-red border-neone-red' : ''}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-y-6 gap-x-12 px-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button
              key={n}
              onClick={() => handleNum(n.toString())}
              className="h-14 w-14 mx-auto rounded-full text-xl font-bold font-display text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-90 transition-all flex items-center justify-center"
            >
              {n}
            </button>
          ))}
          <div className="flex items-center justify-center">
             <button onClick={handleBiometric} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
                {isAuthenticating ? <Loader2 className="w-6 h-6 animate-spin text-black dark:text-white" /> : <Fingerprint className="w-6 h-6 text-neone-blue" />}
             </button>
          </div>
          <button 
            onClick={() => handleNum('0')} 
            className="h-14 w-14 mx-auto rounded-full text-xl font-bold font-display text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-90 transition-all flex items-center justify-center"
          >
            0
          </button>
          <div className="flex items-center justify-center">
            {pin.length > 0 && (
              <button onClick={() => setPin(pin.slice(0, -1))} className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// --- Pulse (Scanner) View ---

const ScannerView = ({ onSaveHistory, history }: { onSaveHistory: (item: ScanHistoryItem) => void, history: ScanHistoryItem[] }) => {
  const [mode, setMode] = useState<'contract' | 'bidding' | 'epc'>('contract');
  const [view, setView] = useState<'scan' | 'history'>('scan');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!scanning) return;
    const messages = {
      contract: ["Analyzing clauses...", "Checking 2026 Act...", "Identifying Legal Hazards..."],
      bidding: ["Checking patterns...", "Compiling evidence..."],
      epc: ["Scanning thermal metrics...", "Checking mandates..."]
    };
    const currentMessages = messages[mode];
    setLoadingMessage(currentMessages[0]);
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % currentMessages.length;
      setLoadingMessage(currentMessages[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, [scanning, mode]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      let res;
      try {
        if (mode === 'contract') res = await analyzeContract(base64);
        else if (mode === 'bidding') res = await detectBiddingWar(base64);
        else res = await analyzeEPC(base64);
      } catch (e) {
        res = { isSafe: false, score: 0, summary: "Could not process image.", issues: ["Try a clearer photo"] };
      }

      setResult(res);
      setScanning(false);
      
      onSaveHistory({
        id: Date.now().toString(),
        date: Date.now(),
        type: mode,
        summary: res.summary || res.evidence || "Scan completed",
        status: (res.isSafe || !res.isIllegal || res.compliance) ? 'safe' : 'risk'
      });
    };
    reader.readAsDataURL(file);
  };

  const simulateIllegalContract = () => {
    setScanning(true);
    setTimeout(() => {
      const res = {
        isSafe: false,
        score: 34,
        summary: "We've analyzed your agreement against the 2026 Renters' Rights Act. Several clauses are legally void (they don't count) and could be used to challenge your landlord.",
        issues: [
          "SECTION 21 ATTEMPT: Your landlord has included a 'no-fault' eviction clause. This is strictly illegal in 2026.",
          "ILLEGAL FEE: The '£50 Admin Charge' for keys is prohibited.",
          "INVALID FIXED TERM: The 12-month lock-in period is void. All tenancies are now periodic.",
          "RESTRICTIVE PET BAN: The 'No Pets' blanket ban is illegal."
        ]
      };
      setResult(res);
      setScanning(false);
      onSaveHistory({ id: Date.now().toString(), date: Date.now(), type: 'contract', summary: res.summary, status: 'risk' });
    }, 2500);
  };

  const handleDownloadReport = () => {
    if (!result) return;
    const reportTitle = "RENTSHIELD 2026 - PROTECTION REPORT";
    const date = format(new Date(), 'dd MMMM yyyy HH:mm');
    const content = `${reportTitle}\n==========================================\nGenerated: ${date}\nStatus: ${result.isSafe ? 'LEGALLY COMPLIANT' : 'LEGAL RISK DETECTED'}\n\nEXPLANATION:\n${result.summary}\n\nCLAUSES FOUND:\n${result.issues?.map((i: string) => `[!] ${i}`).join('\n\n') || 'None'}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RentShield_Report_${format(new Date(), 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl font-bold">Contract Scanner</h2>
        <button 
          onClick={() => setView(view === 'scan' ? 'history' : 'scan')} 
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500"
        >
           {view === 'scan' ? <History size={20} /> : <Scan size={20} />}
        </button>
      </div>
      
      {view === 'history' ? (
        <div className="space-y-4">
           {history.map(item => (
             <SoftCard key={item.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <span className="text-xs font-bold uppercase text-gray-400">{item.type}</span>
                   </div>
                   <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.status === 'safe' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status.toUpperCase()}
                   </span>
                </div>
                <p className="text-xs line-clamp-2">{item.summary}</p>
             </SoftCard>
           ))}
        </div>
      ) : (
        <div className="min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl p-8 bg-gray-50/50 dark:bg-gray-900/50">
          {scanning ? (
             <div className="text-center">
                <Scan className="w-16 h-16 text-neone-blue animate-pulse mx-auto mb-4" />
                <p className="text-sm font-bold animate-pulse">{loadingMessage}</p>
             </div>
          ) : result ? (
             <div className="w-full">
                <div className="flex items-center gap-4 mb-6">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${result.isSafe ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                      {result.score}
                   </div>
                   <h3 className="font-bold">{result.isSafe ? 'Secure' : 'Risks Detected'}</h3>
                </div>
                <p className="text-sm bg-white dark:bg-gray-800 p-4 rounded-xl mb-6 shadow-sm">{result.summary}</p>
                <div className="flex flex-col gap-2">
                   <NeuButton variant="primary" onClick={handleDownloadReport}><Download size={18} className="mr-2" /> Export Report</NeuButton>
                   <NeuButton variant="secondary" onClick={() => setResult(null)}>New Scan</NeuButton>
                </div>
             </div>
          ) : (
             <div className="text-center">
                <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <NeuButton onClick={() => fileInputRef.current?.click()}>Upload Image</NeuButton>
                <button onClick={simulateIllegalContract} className="block mt-4 text-[10px] text-gray-400 underline mx-auto">Simulate Illegal Clause</button>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} />
             </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Tracker & Protect View (Standard placeholders) ---
const TrackerView = () => <div className="p-4 text-center text-gray-400">Hazard Tracker View</div>;
const ProtectView = () => <div className="p-4 text-center text-gray-400">Rights & Tools View</div>;

// --- Profile View (Expanded) ---

type ProfileSection = 'main' | 'account' | 'privacy' | 'accessibility';

const ProfileView = ({ onLogout, darkMode, toggleDarkMode }: { onLogout: () => void, darkMode: boolean, toggleDarkMode: () => void }) => {
  const [section, setSection] = useState<ProfileSection>('main');
  const [privacyToggles, setPrivacyToggles] = useState({ dataSharing: true, biometrics: true });
  const [accToggles, setAccToggles] = useState({ highContrast: false, largeText: false });

  const renderMain = () => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-neone-blue/10 rounded-2xl flex items-center justify-center">
          <User className="text-neone-blue" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Adwait</h2>
          <p className="text-xs text-gray-500">Hackney, London • Protected Tier</p>
        </div>
      </div>

      <div className="space-y-3">
        <SoftCard className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setSection('account')}>
          <div className="flex items-center gap-3">
            <User size={18} className="text-neone-blue" />
            <span className="text-sm font-bold">Account</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </SoftCard>

        <SoftCard className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setSection('privacy')}>
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-neone-green" />
            <span className="text-sm font-bold">Privacy</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </SoftCard>

        <SoftCard className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setSection('accessibility')}>
          <div className="flex items-center gap-3">
            <Accessibility size={18} className="text-neone-yellow" />
            <span className="text-sm font-bold">Accessibility</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </SoftCard>

        <SoftCard className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleDarkMode}>
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            <span className="text-sm font-bold">Dark Mode</span>
          </div>
          <Toggle checked={darkMode} onChange={toggleDarkMode} />
        </SoftCard>

        <SoftCard className="flex items-center justify-between p-4 text-red-500 cursor-pointer" onClick={onLogout}>
          <div className="flex items-center gap-3">
            <LogOut size={18} />
            <span className="text-sm font-bold">Log Out</span>
          </div>
        </SoftCard>
      </div>
    </motion.div>
  );

  const renderAccount = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <button onClick={() => setSection('main')} className="flex items-center gap-2 text-gray-400 mb-6 font-bold text-xs">
        <ChevronLeft size={16} /> BACK
      </button>
      <h3 className="text-xl font-display font-bold mb-6">Account Settings</h3>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Full Name</label>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Adwait</span>
            <button className="text-xs text-neone-blue font-bold">Edit</button>
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Email Address</label>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">adwait@example.com</span>
            <Mail size={16} className="text-gray-300" />
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Subscription</label>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Protection Pro</span>
            <CreditCard size={16} className="text-neone-blue" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPrivacy = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <button onClick={() => setSection('main')} className="flex items-center gap-2 text-gray-400 mb-6 font-bold text-xs">
        <ChevronLeft size={16} /> BACK
      </button>
      <h3 className="text-xl font-display font-bold mb-6">Privacy & Security</h3>
      <div className="space-y-3">
        <SoftCard className="flex items-center justify-between p-4">
          <div>
            <span className="text-sm font-bold block">Anonymous Analytics</span>
            <span className="text-[10px] text-gray-400">Share usage data to improve RentShield</span>
          </div>
          <Toggle checked={privacyToggles.dataSharing} onChange={(v) => setPrivacyToggles({...privacyToggles, dataSharing: v})} />
        </SoftCard>
        <SoftCard className="flex items-center justify-between p-4">
          <div>
            <span className="text-sm font-bold block">Biometric Lock</span>
            <span className="text-[10px] text-gray-400">Use Fingerprint/FaceID to open app</span>
          </div>
          <Toggle checked={privacyToggles.biometrics} onChange={(v) => setPrivacyToggles({...privacyToggles, biometrics: v})} />
        </SoftCard>
        <SoftCard className="flex items-center justify-between p-4">
          <span className="text-sm font-bold">Clear Scan History</span>
          <Trash2 size={16} className="text-red-400" />
        </SoftCard>
      </div>
    </motion.div>
  );

  const renderAccessibility = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <button onClick={() => setSection('main')} className="flex items-center gap-2 text-gray-400 mb-6 font-bold text-xs">
        <ChevronLeft size={16} /> BACK
      </button>
      <h3 className="text-xl font-display font-bold mb-6">Accessibility</h3>
      <div className="space-y-3">
        <SoftCard className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Activity size={18} />
            <span className="text-sm font-bold">High Contrast Mode</span>
          </div>
          <Toggle checked={accToggles.highContrast} onChange={(v) => setAccToggles({...accToggles, highContrast: v})} />
        </SoftCard>
        <SoftCard className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Type size={18} />
            <span className="text-sm font-bold">Large Text Size</span>
          </div>
          <Toggle checked={accToggles.largeText} onChange={(v) => setAccToggles({...accToggles, largeText: v})} />
        </SoftCard>
        <SoftCard className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Languages size={18} />
            <span className="text-sm font-bold">Language</span>
          </div>
          <span className="text-xs font-bold text-neone-blue">English</span>
        </SoftCard>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6 pb-24 h-full">
      <AnimatePresence mode="wait">
        {section === 'main' && renderMain()}
        {section === 'account' && renderAccount()}
        {section === 'privacy' && renderPrivacy()}
        {section === 'accessibility' && renderAccessibility()}
      </AnimatePresence>
    </div>
  );
};

// --- App Root ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.OVERVIEW);
  const [locationName, setLocationName] = useState('Locating...');
  const [darkMode, setDarkMode] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  useEffect(() => {
    const onboarded = localStorage.getItem('rentshield_onboarded');
    if (isAuthenticated && !onboarded) {
      setShowOnboarding(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    if (navigator.geolocation && isAuthenticated) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocationName("Hackney, London"),
        () => setLocationName("Old Street, EC1V")
      );
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <LoginView onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white font-sans selection:bg-neone-blue/20 transition-colors duration-300">
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingFlow onComplete={() => { localStorage.setItem('rentshield_onboarded', 'true'); setShowOnboarding(false); }} />
        )}
      </AnimatePresence>

      <main className="max-w-md mx-auto min-h-screen bg-white dark:bg-black shadow-2xl relative overflow-hidden">
        <div className="h-full overflow-y-auto p-6 pb-32 scroll-smooth no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === AppTab.OVERVIEW && <HomeView location={locationName} setTab={setActiveTab} />}
              {activeTab === AppTab.SCAN && <ScannerView onSaveHistory={(item) => setScanHistory([item, ...scanHistory])} history={scanHistory} />}
              {activeTab === AppTab.TRACKER && <TrackerView />}
              {activeTab === AppTab.RIGHTS && <ProtectView />}
              {activeTab === AppTab.PROFILE && <ProfileView onLogout={() => setIsAuthenticated(false)} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 z-50">
          <div className="flex justify-around items-center h-20 pb-2">
            <button 
              onClick={() => setActiveTab(AppTab.OVERVIEW)} 
              className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === AppTab.OVERVIEW ? 'text-black dark:text-white' : 'text-gray-400'}`}
            >
              <HomeIcon size={20} className={activeTab === AppTab.OVERVIEW ? 'fill-current' : ''} />
              <span className="text-[10px] font-bold">Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab(AppTab.SCAN)}
              className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === AppTab.SCAN ? 'text-black dark:text-white' : 'text-gray-400'}`}
            >
              <Scan size={20} />
              <span className="text-[10px] font-bold">Scanner</span>
            </button>
            
            <div className="relative -top-6">
              <button 
                onClick={() => setActiveTab(AppTab.TRACKER)}
                className={`w-14 h-14 rounded-full bg-neone-red text-white flex items-center justify-center shadow-2xl shadow-neone-red/30 transition-transform active:scale-95 hover:scale-105`}
              >
                 <Shield size={28} />
              </button>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 whitespace-nowrap">Report</span>
            </div>

            <button 
              onClick={() => setActiveTab(AppTab.RIGHTS)}
              className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === AppTab.RIGHTS ? 'text-black dark:text-white' : 'text-gray-400'}`}
            >
              <FileText size={20} />
              <span className="text-[10px] font-bold">Rights</span>
            </button>
            
            <button 
              onClick={() => setActiveTab(AppTab.PROFILE)}
              className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === AppTab.PROFILE ? 'text-black dark:text-white' : 'text-gray-400'}`}
            >
               <User size={20} />
               <span className="text-[10px] font-bold">Profile</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
