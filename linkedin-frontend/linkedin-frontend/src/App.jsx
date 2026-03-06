import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import History from './pages/History';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181f',
            color: '#f0f0f5',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            fontSize: '13.5px',
            fontFamily: "'DM Sans', sans-serif",
          },
          success: {
            iconTheme: { primary: '#6ee7b7', secondary: '#0a0a0f' },
          },
          error: {
            iconTheme: { primary: '#f472b6', secondary: '#0a0a0f' },
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
