
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// 註冊 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // 自動判斷是否在 GitHub 子目錄下
    const isGitHubPages = window.location.hostname.includes('github.io');
    const swPath = isGitHubPages ? '/Shikoku2026/sw.js' : './sw.js';
    
    navigator.serviceWorker.register(swPath).then(registration => {
      console.log('SW registered on:', swPath);
    }).catch(error => {
      console.error('SW registration failed:', error);
    });
  });
}
