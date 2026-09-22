import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' toastOptions={{style: {
        background: '#27272a',
        color: '#ffffff',
        border: '1px solid #3f3f46'
      }
      }}/>
      <App />
    </QueryClientProvider>,
  </StrictMode>
)
