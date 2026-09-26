import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/app.css";
import "./styles/student-pages.css";
import "./styles/hod-pages.css";
import "./styles/principal-pages.css";
import "./styles/staff-pages.css";
import "./styles/admin-pages.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
