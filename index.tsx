
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
    const isSandbox = hostname.includes('usercontent.goog') || hostname.includes('ai.studio');

    // Skip registration in AI Studio sandbox environments which don't support cross-origin service workers.
    if (!isSandbox) {
      // Use Vite's environment variable to get the correct base path.
      // It will be '/Shikoku2026/' for the production build and '/' for local development.
      const swPath = `${import.meta.env.BASE_URL}sw.js`;
      
      navigator.serviceWorker.register(swPath).then(registration => {
        console.log('SW registered successfully with scope:', registration.scope);
      }).catch(error => {
        console.warn('SW registration failed:', error);
      });
    } else {
      console.log('Service Worker registration skipped for sandbox environment.');
    }
  });
}
