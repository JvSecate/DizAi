import React, { Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
import './header.css';
import Logo from '../../../assets/img/logo.png';
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const isResultadosPage = location.pathname === "/resultados";
  const userData = JSON.parse(localStorage.getItem("usuarioLogado"));
  const userType = userData?.tipo;

  let homeLabel = "Avalie aqui";
  let homeLink = "/sistema/usuario";

  if (userType === "empresa") {
    homeLabel = "Avaliações";
    homeLink = "/sistema/empresa";
  } else if (userType === "admin") {
    homeLabel = "Admin";
    homeLink = "/sistema/admin";
  }

  return (
    <Fragment>
      <header className="area-header">
        <div className="header-container">
          <img className="logo_header" src={Logo} alt="Logo do Sistema" />

          <nav className="menu-nav">
            <Link
              className={`Button_Op ${
                location.pathname.includes('/sistema') ? 'active' : ''
              }`}
              to={homeLink}
            >
              {homeLabel}
            </Link>

            <Link
              className={`Button_Op ${
                location.pathname.includes('/perfil') ? 'active' : ''
              }`}
              to="/perfil"
            >
              Perfil
            </Link>

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