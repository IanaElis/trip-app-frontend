import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Router from '../src/routes/Router.jsx'

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import { AuthContextProvider } from './context/AuthContext.jsx'
import NavBar from './components/NavBar/NavBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
          <Router />
    </AuthContextProvider>
  </StrictMode>,
)
