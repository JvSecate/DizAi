import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastro-Empresa.css';
import logo from '../../assets/img/LogoSistema Fundo_Transparenrte.png';

const CadastroEmpresa = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cnpj: ''
  });
  const [erro, setErro] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCadastro(e) {
    e.preventDefault();

    // Valida se senha e confirmar senha coincidem
    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem!');
      return;
    }

    // Pega lista de empresas do localStorage
    const listaEmpresas = JSON.parse(localStorage.getItem("empresas") || "[]");

    // Verifica se já existe empresa com o mesmo email
    const emailExiste = listaEmpresas.some(e => e.email === form.email);
    if (emailExiste) {
      setErro('Já existe uma empresa cadastrada com este email!');
      return;
    }

    // Cria objeto da nova empresa
    const novaEmpresa = {
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      cnpj: form.cnpj
    };

    // Adiciona na lista e salva no localStorage
    listaEmpresas.push(novaEmpresa);
    localStorage.setItem("empresas", JSON.stringify(listaEmpresas));

    // Marca a empresa como logada (para Perfil_Empresa)
    localStorage.setItem("empresaLogado", JSON.stringify(novaEmpresa));

    alert("Cadastro realizado com sucesso!");
    navigate("/home");
  }

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
              <label htmlFor='confirmarSenha'>Confirmar Senha</label>
              <input 
                required
                type='password' 
                id='confirmarSenha'
                name='confirmarSenha'
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

          <div className='cadastro-botao-area'>
            <button className='cadastro-botao' type="submit">
              Cadastrar
            </button>

            <div className='tem-cadastro'>
              Cadastrar como Usuário?
              <Link className='login-link' to='/cadastro'>
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
          <img className='logo_dizai' src={logo} alt="Logo" width={350} height={350}/>
        </div>
        <h1>Cadastro<br/>Empresa</h1>
      </div>
    </div>
  );
};

export default CadastroEmpresa;
