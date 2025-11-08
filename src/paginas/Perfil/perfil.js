import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import './perfil.css'
import { BsPencilSquare } from "react-icons/bs";


export default function Perfil() {
  const [editMode, setEditMode] = useState({
    nome: false,
    email: false,
    senha: false,
  });

  const [formData, setFormData] = useState({
    nome: "Seu Nome",
    email: "seu@email.com",
    senha: "123456",
  });

  const handleToggleEdit = (campo) => {
    setEditMode((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados salvos:", formData);
  };
  const resposta = [
    {
      titulo: "Produto entregue com atraso",
      status: "Resolvida",
    },
    {
      titulo: "Produto entregue com atraso",
      status: "Não resolvida",
    },
    {
      titulo: "Produto entregue com atraso",
      status: "Resolvida",
    },
    {
      titulo: "Produto entregue com atraso",
      status: "Em andamento",
    }
  ]

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
            <BsPencilSquare name='Edit' size={20} color={editMode.nome ? '#A0F2CC' : 'black'} />
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
              <BsPencilSquare name='Edit' size={20} color={editMode.email ? '#A0F2CC' : 'black'} />
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
              <BsPencilSquare name='Edit' size={20} color={editMode.senha ? '#A0F2CC' : 'black'} />
            </button>
          </div>

          <div className="Alterar-botao-area">
            <button className="Alterar-botao" type="submit">
              Alterar
            </button>
          </div>
        </form>
      <Table className="Avaliacao-Pesona">
        <TableHeader>
          <TableRow>
            <TableHead className="Titulo-Tabela">Empresa</TableHead>
            <TableHead className="Titulo-Tabela">Avaliação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resposta.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.titulo}</TableCell>
              <TableCell className="font-medium">
                <span
                  style={{ color: item.status == "Não resolvida" ? '#c50000ff' :
                    item.status == "Resolvida" ? '#00b327ff' :
                    item.status == "Em andamento" ? "#666666" : '#000' }}
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
