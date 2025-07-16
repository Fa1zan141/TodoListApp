import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import MainLayout from './components/MainLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <MainLayout>
                <App />
              </MainLayout>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
