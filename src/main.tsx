import App from './App.tsx'
import './i18n'
import { createRoot } from 'react-dom/client'
import './index.css'

// Performance: disable StrictMode in production to eliminate double renders
// and reduce initial bundle overhead.
createRoot(document.getElementById('root')!).render(
  <App />,
)