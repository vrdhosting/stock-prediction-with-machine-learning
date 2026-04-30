import { useState } from 'react'
import './App.css'
import './assets/css/style.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AuthProvider from './AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>

            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>

          <Footer />
        </BrowserRouter>

      </AuthProvider>
        

      
    </>
  )
}

export default App
