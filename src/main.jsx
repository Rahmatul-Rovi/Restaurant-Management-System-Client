import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import AuthProvider from './providers/AuthProvider'
import CartProvider from './providers/CartProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}> 
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
        </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)