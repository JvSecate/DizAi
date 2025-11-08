import React, { Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
import './header.css'
import Logo from '../../../assets/img/LogoSistema Fundo_Transparenrte.png'
import { FaSearch } from "react-icons/fa";

const Header = () => {
    const location = useLocation();
    const isResultadosPage = location.pathname === "/resultados";
    return (
        <Fragment>
            <header className='area-header'>
                <div className='header-container'>
                    <div className='area'>
                        <img className='logo_header' src={Logo}/>
                        <Link className='Button_Op' to="/home">
                            Home
                        </Link>
                        <Link className='Button_Op' to="/sistema">
                            Reclame Aqui
                        </Link>
                        <Link className='Button_Op' to="/perfil">
                            Perfil
                        </Link>
                        <Link className='Button_Op' to="/">
                            Sair
                        </Link>
                        {!isResultadosPage && (
                            <Link className="Button_Search" to="/resultados">
                            <FaSearch className="icon-search" />
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header