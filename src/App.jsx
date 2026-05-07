import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import Services from './components/Services'
import SuccessCases from './components/SuccessCases'
import Team from './components/Team'
import './App.css'

function App() {
  return (
    <div className="font-sans antialiased min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Welcome />
        <Services />
        <SuccessCases />
        <Team />
      </main>
      
      {/* Simple Footer just to finish the page */}
      <footer className="bg-[#2c3e50] text-white py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} CreaLab Group. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
