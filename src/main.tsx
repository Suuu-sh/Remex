import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './style.css';

if (import.meta.env.PROD && window.location.hostname === 'remex-site.suuu-sh.workers.dev') {
  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({token: '99c3b8daa75d4cc4b193e9fe8e5e5437'});
  document.head.appendChild(beacon);
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
