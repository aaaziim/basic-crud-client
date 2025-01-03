import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import About from './components/About.jsx';
import Users from './components/Users.jsx';
import SingleUser from './components/SingleUser.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/users" element={<Users />}   />
      <Route path="/users/:id" element={<SingleUser />}   />
      <Route path="/about" element={<About /> } />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
