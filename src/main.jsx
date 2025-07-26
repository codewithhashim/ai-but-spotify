import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import DataProvider from './context/DataContext.jsx'
import PlayerContextProvider from './context/PlayerContext.jsx'
import { PlaylistContextProvider } from './context/PlaylistContext.jsx'
import FilterContextProvider from './context/FilterContext.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <DataProvider>
          <FilterContextProvider>
            <PlaylistContextProvider>
              <PlayerContextProvider>
                <App />
              </PlayerContextProvider>
            </PlaylistContextProvider>
          </FilterContextProvider>
        </DataProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
)
