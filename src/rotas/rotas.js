import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../paginas/Login/login'
import Cadastro_Usuario from '../paginas/Cadastro_Usuario/cadastro_usuario'
import Cadastro_Empresa from '../paginas/Cadastro_Empresa/cadastro_empresa'
import Sistema_Usuario from '../paginas/Sistema_Usuario/sistema_usuario'
import Sistema_Empresa from '../paginas/Sistema_Empresa/sistema_empresa'
import PrivateRoute from './privateRotas'
import Perfil from '../paginas/Perfil/perfil'
import Resultados from '../paginas/Resultados/resultados'
import Empresa from '../paginas/Empresa/empresa'
import Feedback from '../paginas/Feedback/feedback'

const Rotas = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/cadastro/usuario' element={<Cadastro_Usuario/>} />
        <Route path='/cadastro/empresa' element={<Cadastro_Empresa/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/sistema/usuario' element={<Sistema_Usuario/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
          <Route path='/resultados' element={<Resultados/>}/>
          <Route path='/empresa/:id' element={<Empresa/>}/>
          <Route path='/sistema/empresa' element={<Sistema_Empresa/>}/>
          <Route path="/feedback/:id" element={<Feedback />} />
        </Route>
    </Routes>
  )
}

export default Rotas