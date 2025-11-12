import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import './perfil.css';
import { BsPencilSquare } from "react-icons/bs";

export default function Perfil() {
  const [editMode, setEditMode] = useState({
    nome: false,
    email: false,
    senha: false,
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState('');

  // 🔹 Carrega os dados do usuário logado
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
      setFormData({
        nome: usuarioLogado.nome,
        email: usuarioLogado.email,
        senha: usuarioLogado.senha,
      });
    }
  }, []);

  // 🔹 Alterna modo de edição
  const handleToggleEdit = (campo) => {
    setEditMode((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  };

  // 🔹 Atualiza os valores digitados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Salva as alterações no localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Atualiza o usuário logado e a lista geral
    const usuariosAtualizados = usuarios.map((u) =>
      u.email === usuarioLogado.email ? formData : u
    );

    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    localStorage.setItem('usuarioLogado', JSON.stringify(formData));

    setMensagem('Dados atualizados com sucesso!');
    setEditMode({ nome: false, email: false, senha: false });

    // Esconde mensagem após 3 segundos
    setTimeout(() => setMensagem(''), 3000);
  };

  // 🔹 Lista fictícia (exemplo)
  const resposta = [
    { titulo: "Produto entregue com atraso", status: "Resolvida" },
    { titulo: "Atendimento ruim", status: "Não resolvida" },
    { titulo: "Problema no cadastro", status: "Em andamento" },
    { titulo: "Pedido duplicado", status: "Resolvida" },
  ];

  return (
    <div className="Fundo_Perfil">
      <div className="Painel">
        <form className="Tabela_Perfil" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome do Usuário</label>
          <div className="Dados_Perfil">
            <input
              required
              type="text"
              id="nome"
              name="nome"
              className="Dados"
              value={formData.nome}
              onChange={handleChange}
              readOnly={!editMode.nome}
            />
            <button
              type="button"
              className="Edit_Button"
              onClick={() => handleToggleEdit("nome")}
            >
              <BsPencilSquare
                name='Edit'
                size={20}
                color={editMode.nome ? '#04D9B2' : 'black'}
              />
            </button>
          </div>

          <label htmlFor="email">Email</label>
          <div className="Dados_Perfil">
            <input
              required
              type="email"
              id="email"
              name="email"
              className="Dados"
              value={formData.email}
              onChange={handleChange}
              readOnly={!editMode.email}
            />
            <button
              type="button"
              className="Edit_Button"
              onClick={() => handleToggleEdit("email")}
            >
              <BsPencilSquare
                name='Edit'
                size={20}
                color={editMode.email ? '#04D9B2' : 'black'}
              />
            </button>
          </div>

          <label htmlFor="senha">Senha</label>
          <div className="Dados_Perfil">
            <input
              required
              type="password"
              id="senha"
              name="senha"
              className="Dados"
              value={formData.senha}
              onChange={handleChange}
              readOnly={!editMode.senha}
            />
            <button
              type="button"
              className="Edit_Button"
              onClick={() => handleToggleEdit("senha")}
            >
              <BsPencilSquare
                name='Edit'
                size={20}
                color={editMode.senha ? '#04D9B2' : 'black'}
              />
            </button>
          </div>

          {mensagem && (
            <p style={{ color: '#00b327ff', fontWeight: 'bold', marginTop: '10px' }}>
              {mensagem}
            </p>
          )}

          <div className="Alterar-botao-area">
            <button className="Alterar-botao" type="submit">
              Alterar
            </button>
          </div>
        </form>

        <Table className="Avaliacao-Pesona">
          <TableHeader>
            <TableRow>
              <TableHead className="Titulo-Tabela">Título/Razão</TableHead>
              <TableHead className="Titulo-Tabela">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resposta.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.titulo}</TableCell>
                <TableCell className="font-medium">
                  <span
                    style={{
                      color:
                        item.status === "Não resolvida"
                          ? "#c50000ff"
                          : item.status === "Resolvida"
                          ? "#00b327ff"
                          : item.status === "Em andamento"
                          ? "#666666"
                          : "#000",
                    }}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
