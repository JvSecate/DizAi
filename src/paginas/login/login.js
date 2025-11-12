import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../assets/img/LogoSistema Fundo_Transparenrte.png';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const empresas = JSON.parse(localStorage.getItem("empresas") || "[]");

    // Procura usuário
    const usuario = usuarios.find(u => u.email === form.email && u.senha === form.senha);
    if (usuario) {
      localStorage.setItem("user", JSON.stringify({ ...usuario, tipo: 'usuario' }));
      navigate("/home");
      return;
    }

    // Procura empresa
    const empresa = empresas.find(e => e.email === form.email && e.senha === form.senha);
    if (empresa) {
      localStorage.setItem("user", JSON.stringify({ ...empresa, tipo: 'empresa' }));
      navigate("/home");
      return;
    }

    setErro("Email ou senha incorretos!");
  };

  return (
    <div className='login_container'>
      <div className='banner_login'>
        <div className='logo_container'>
          <img className='logo_dizai' src={logo} alt="Logo" width={350} height={350}/>
        </div>
        <h1>Login</h1>
      </div>

      <div className='area_login'>
        <form className='login_dados' onSubmit={handleSubmit}>
          {erro && <p className="erro-msg">{erro}</p>}

          <div className='login-item'>
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className='login-item'>
            <label htmlFor="senha">Senha</label>
            <input
              required
              type="password"
              id="senha"
              name="senha"
              value={form.senha}
              onChange={handleChange}
            />
          </div>

          <div className='login-botao-area'>
            <button className='login-botao' type="submit">
              Login
            </button>

            <div className='n-tem-cadastro'>
              Não tem conta?
              <Link className='cadastro-link' to='/cadastro'>
                Cadastre-se aqui.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
