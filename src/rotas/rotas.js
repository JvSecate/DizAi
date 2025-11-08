import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../paginas/login/login'
import Cadastro from '../paginas/cadastro-Usuario/cadastro_Usuario'
import Home from '../paginas/Home/home'
import PrivateRoute from './privateRotas'
import Sistema from '../paginas/Sistema/sistema'
import Perfil from '../paginas/Perfil/perfil'
import Cadastro_Empresa from '../paginas/cadastro-Empresa/cadastro-Empresa'
import Resultados from '../paginas/Resultados/resultados'

const Rotas = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/cadastro' element={<Cadastro/>} />
        <Route path='/cadastro_empresa' element={<Cadastro_Empresa/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/sistema' element={<Sistema/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
          <Route path='/resultados' element={<Resultados/>}/>
        </Route>
    </Routes>
  )
}

export default Rotas