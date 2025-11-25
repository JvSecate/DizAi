import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastro_empresa.css';
import logo from '../../assets/img/logo.png';
import { API_URL } from '../../config/config';
import { salvarUsuario } from "../../utils/auth";

const CadastroEmpresa = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cnpj: '',
    setor: '',
    descricao: ''
  });

  const [erro, setErro] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não conferem!");
      return;
    }

    const empresaData = {
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      cnpj: form.cnpj,
      setor: form.setor || null,
      descricao: form.descricao || null
    };

    try {
      const response = await fetch(`${API_URL}/empresas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empresaData)
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        setErro(err?.detail || "Erro ao cadastrar.");
        return;
      }

      const empresa = await response.json();
      salvarUsuario(empresa);

      alert("Cadastro realizado com sucesso!");
      navigate("/sistema/empresa");

    } catch (error) {
      console.error("Erro ao conectar com API:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className='cadastro_container'>
      <div className='area_cadastro'>
        <form className='cadastro_dados' onSubmit={handleCadastro}>
          
          {erro && <p className="erro-msg">{erro}</p>}

          <div className='cadastro-item'>
            <label htmlFor="nome">Nome da Empresa</label>
            <input
              required
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className='cadastro-item'>
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

          <div className='Area_senha'>
            <div className='cadastro-item'>
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

            <div className='cadastro-item'>
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input
                required
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={form.confirmarSenha}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='cadastro-item'>
            <label htmlFor='cnpj'>CNPJ</label>
            <input
              required
              type='text'
              id='cnpj'
              name='cnpj'
              value={form.cnpj}
              onChange={handleChange}
            />
          </div>

          <div className='cadastro-item'>
            <label htmlFor='setor'>Setor (opcional)</label>
            <input
              type='text'
              id='setor'
              name='setor'
              value={form.setor}
              onChange={handleChange}
            />
          </div>

          <div className='cadastro-item'>
            <label htmlFor='descricao'>Descrição (opcional)</label>
            <textarea
              id='descricao'
              name='descricao'
              value={form.descricao}
              onChange={handleChange}
            />
          </div>

          <div className='cadastro-botao-area'>
            <button className='cadastro-botao' type="submit">
              Cadastrar
            </button>

            <div className='tem-cadastro'>
              Cadastrar como Usuário?
              <Link className='login-link' to='/cadastro/usuario'>
                Clique aqui.
              </Link>
            </div>

            <div className='voltar-login'>
              Já tem uma conta?
              <Link className='login-link' to='/'>
                Voltar para o Login
              </Link>
            </div>
          </div>

        </form>
      </div>

      <div className='banner_cadastro'>
        <div className='logo_container'>
          <img className='logo_dizai' src={logo} alt="Logo" width={350} height={350} />
        </div>
        <h1>Cadastro<br />Empresa</h1>
      </div>
    </div>
  );
};

export default CadastroEmpresa;