import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Detail from './Componentes/Details/Details'
import Formulario from './Componentes/Formulario/Formulario'

import Landing from './Componentes/Landing/Landing'
import { Route, Routes, useLocation } from 'react-router-dom'
// import Navbar from './Componentes/NavBar/Navbar'
import Home from './componentes/home/Home'
import Acerca from './Componentes/Acerca/acerca'

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/acerca" element={<Acerca/>} />
          <Route path="/detail/:id" element = {<Detail/>}/>
          <Route path="/formulario" element = {<Formulario/>}/>
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>

    </>
  )
}

export default App
