import React, { Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
import './header.css';
import Logo from '../../../assets/img/LogoSistema Fundo_Transparenrte.png';
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const isResultadosPage = location.pathname === "/resultados";
  const userData = JSON.parse(localStorage.getItem("user"));
  const userType = userData?.tipo;

  return (
    <Fragment>
      <header className="area-header">
        <div className="header-container">
          <img className="logo_header" src={Logo} alt="Logo do Sistema" />

          <nav className="menu-nav">
            <Link
              className={`Button_Op ${location.pathname === '/home' ? 'active' : ''}`}
              to="/home"
            >
              Home
            </Link>

            <Link
              className={`Button_Op ${
                location.pathname.includes('/sistema') ? 'active' : ''
              }`}
              to={userType === "empresa" ? "/sistema/empresa" : "/sistema/usuario"}
            >
              Reclame Aqui
            </Link>

            {userType === "empresa" ? (
              <Link
                className={`Button_Op ${
                  location.pathname.includes('/perfil/empresa') ? 'active' : ''
                }`}
                to="/perfil/empresa"
              >
                Perfil Empresa
              </Link>
            ) : (
              <Link
                className={`Button_Op ${
                  location.pathname.includes('/perfil/usuario') ? 'active' : ''
                }`}
                to="/perfil/usuario"
              >
                Perfil Usuário
              </Link>
            )}

            <Link className="Button_Op" to="/">
              Sair
            </Link>

            {!isResultadosPage && (
              <Link className="Button_Search" to="/resultados" aria-label="Pesquisar">
                <FaSearch className="icon-search" />
              </Link>
            )}
          </nav>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
