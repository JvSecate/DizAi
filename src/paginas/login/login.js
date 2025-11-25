import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../assets/img/logo.png';
import { API_URL } from '../../config/config';
import { salvarUsuario } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setErro("Email ou senha incorretos!");
        return;
      }

      const user = await response.json();
      salvarUsuario(user);

      navigate("/sistema/usuario");

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro no servidor. Tente novamente mais tarde.");
    }
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
              Não tem uma conta?
              <Link className='cadastro-link' to='/cadastro/usuario'>
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