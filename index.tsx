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
    const hostname = window.location.hostname;
    const isGitHubPages = hostname.includes('github.io');
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isSandbox = hostname.includes('usercontent.goog') || hostname.includes('ai.studio');

    // 只在 GitHub Pages 或 本地開發環境嘗試註冊
    // 跳過 AI Studio 沙盒環境，因為該環境不支援 Service Worker 的跨網域 Origin
    if ((isGitHubPages || isLocalhost) && !isSandbox) {
      const swPath = isGitHubPages ? '/Shikoku2026/sw.js' : '/sw.js';
      
      navigator.serviceWorker.register(swPath).then(registration => {
        console.log('SW registered successfully on:', swPath);
      }).catch(error => {
        // 即使失敗也不影響 App 運行
        console.warn('SW registration skipped or failed:', error);
      });
    } else {
      console.log('Service Worker registration skipped for this environment.');
    }
  });
}
