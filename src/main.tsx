
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import App from './components/App/App.tsx';

import 'modern-normalize/modern-normalize.css';
import './index.css';

const queryClient = new QueryClient(); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Обертаємо App у провайдер */}
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
