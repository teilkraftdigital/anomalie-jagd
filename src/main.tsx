if (import.meta.env.PROD) {
  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = "anomalie-jagd.teilkraft.digital";
  script.src = "https://plausible.wahlemedia.de/js/script.js";
  document.head.appendChild(script);
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
