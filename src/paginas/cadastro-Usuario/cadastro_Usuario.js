import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastro_Usuario.css';
import logo from '../../assets/img/LogoSistema Fundo_Transparenrte.png';

const CadastroUsuario = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCadastro = (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não conferem!");
      return;
    }

    const usuarioData = { nome: form.nome, email: form.email, senha: form.senha };
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (listaUsuarios.some(u => u.email === form.email)) {
      alert("Email já cadastrado!");
      return;
    }

    listaUsuarios.push(usuarioData);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    localStorage.setItem("userLogado", JSON.stringify(usuarioData));

    alert("Cadastro realizado com sucesso!");
    navigate("/perfil-usuario");
  };

  return (
    <div className='cadastro_container'>
      <div className='area_cadastro'>
        <form className='cadastro_dados' onSubmit={handleCadastro}>
          <div className='cadastro-item'>
            <label htmlFor="nome">Nome</label>
            <input required type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} />
          </div>

          <div className='cadastro-item'>
            <label htmlFor="email">Email</label>
            <input required type="email" id="email" name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className='Area_senha'>
            <div className='cadastro-item'>
              <label htmlFor="senha">Senha</label>
              <input required type="password" id="senha" name="senha" value={form.senha} onChange={handleChange} />
            </div>

            <div className='cadastro-item'>
              <label htmlFor='confirmarSenha'>Confirmar Senha</label>
              <input required type='password' id='confirmarSenha' name='confirmarSenha' value={form.confirmarSenha} onChange={handleChange} />
            </div>
          </div>

          <div className='cadastro-botao-area'>
            <button className='cadastro-botao' type="submit">Cadastrar</button>
            <div className='tem-cadastro'>
              Cadastrar como Empresa?
              <Link className='login-link' to='/cadastro_empresa'>Clique aqui.</Link>
            </div>
            <div className='voltar-login'>
              Já tem uma conta?
              <Link className='login-link' to='/'>Voltar para o Login</Link>
            </div>
          </div>
        </form>
      </div>

      <div className='banner_cadastro'>
        <div className='logo_container'>
          <img className='logo_dizai' src={logo} alt="Logo" width={350} height={350}/>
        </div>
        <h1>Cadastro<br/>Usuário</h1>
      </div>
    </div>
  );
};

export default CadastroUsuario;
