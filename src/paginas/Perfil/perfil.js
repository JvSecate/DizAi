import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../../components/ui/table";
import usuarioImg from "../../assets/img/usuario.png";
import empresaImg from "../../assets/img/empresa.png";
import { BsPencilSquare } from "react-icons/bs";
import { API_URL } from '../../config/config';
import './perfil.css';
import { salvarUsuario } from "../../utils/auth";

export default function Perfil() {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    img: "",
    cnpj: "",
    setor: "",
    descricao: ""
  });

  const [mensagem, setMensagem] = useState('');
  const [tipo, setTipo] = useState(null);
  const [id, setId] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario) return;

    setTipo(usuario.tipo);
    setId(usuario.id);

    if (usuario.tipo === "usuario") {
      fetch(`${API_URL}/usuarios/${usuario.id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            nome: data.nome,
            email: data.email,
            senha: "",
            img: usuarioImg,
            cnpj: "",
            setor: "",
            descricao: ""
          });
        });
    }

    if (usuario.tipo === "empresa") {
      setEmpresaId(usuario.empresa_id);

      fetch(`${API_URL}/empresas/${usuario.empresa_id}`)
        .then(res => res.json())
        .then(empresa => {
          fetch(`${API_URL}/usuarios/${usuario.id}`)
            .then(res => res.json())
            .then(user => {
              setFormData({
                nome: user.nome,
                email: user.email,
                senha: "",
                img: empresaImg,
                cnpj: empresa.cnpj,
                setor: empresa.setor,
                descricao: empresa.descricao
              });
            });
        });
    }
  }, []);

  useEffect(() => {
    if (!id || !tipo) return;

    fetch(`${API_URL}/feedbacks`)
      .then(res => res.json())
      .then(data => {
        if (tipo === "usuario") {
          setFeedbacks(data.filter(fb => fb.usuario_id === id));
        } else {
          setFeedbacks(data.filter(fb => fb.empresa_id === empresaId));
        }
      });
  }, [id, tipo, empresaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyToSend = {
      nome: formData.nome,
      email: formData.email
    };

    if (formData.senha.trim() !== "") {
      bodyToSend.senha = formData.senha;
    }

    const rota = tipo === "usuario" ? "usuarios" : "usuarios";
    
    let response;
    if (tipo === "usuario"){
      response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyToSend)
      });
    }

    else if (tipo === "empresa") {
      response = await fetch(`${API_URL}/empresas/${empresaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: bodyToSend.nome,
          email: bodyToSend.email,
          senha: bodyToSend.senha,
          cnpj: formData.cnpj,
          setor: formData.setor,
          descricao: formData.descricao
        })
      });
    }
    if (!response.ok) {
        setMensagem("Erro ao atualizar");
        return;
    }
    const updated = await response.json();

    salvarUsuario({
      id: updated.id,
      nome: updated.nome,
      email: updated.email,
      tipo,
      empresa_id: empresaId
    });

    setMensagem("Dados atualizados");
    setEditMode(false);

    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="Fundo_Perfil">
      <div className="Painel">
        <div className="Perfil-Card">
          <img className="Img_Perfil" src={formData.img} alt="Foto" />

          <div className="Perfil-Info">
            {!editMode && (
              <>
                <div className="Perfil-Nome">{formData.nome}</div>

                <p className="Perfil-Label"><strong>Email:</strong> {formData.email}</p>

                {tipo === "empresa" && (
                  <>
                    <p className="Perfil-Label"><strong>CNPJ:</strong> {formData.cnpj}</p>
                    <p className="Perfil-Label"><strong>Setor:</strong> {formData.setor}</p>
                    <p className="Perfil-Label"><strong>Descrição:</strong> {formData.descricao}</p>
                  </>
                )}

                <button
                  type="button"
                  className="Edit_Profile_Button"
                  onClick={() => setEditMode(true)}
                >
                  <BsPencilSquare size={18} /> Editar
                </button>
              </>
            )}

            {editMode && (
              <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input className="Dados" name="nome" value={formData.nome} onChange={handleChange} />

                <label>Email</label>
                <input className="Dados" name="email" value={formData.email} onChange={handleChange} />

                <label>Senha</label>
                <input className="Dados" type="password" name="senha" value={formData.senha} onChange={handleChange} />

                {tipo === "empresa" && (
                  <>
                    <label>CNPJ</label>
                    <input className="Dados" name="cnpj" value={formData.cnpj} onChange={handleChange} />

                    <label>Setor</label>
                    <input className="Dados" name="setor" value={formData.setor} onChange={handleChange} />

                    <label>Descrição</label>
                    <textarea className="Dados" name="descricao" value={formData.descricao} onChange={handleChange} />
                  </>
                )}

                {mensagem && <p className="Mensagem-Sucesso">{mensagem}</p>}

                <div className="Alterar-botao-area">
                  <button type="submit" className="Alterar-botao">Salvar</button>
                </div>

                <button type="button" className="Edit_Profile_Button" onClick={() => setEditMode(false)}>
                  Cancelar
                </button>
              </form>
            )}
          </div>
        </div>

        <Table className="Avaliacao-Pesona">
          <TableHeader>
            <TableRow>
              <TableHead className="Titulo-Tabela">Título</TableHead>
              <TableHead className="Titulo-Tabela">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {feedbacks.map(fb => (
              <TableRow key={fb.id}>
                <TableCell>{fb.titulo}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        fb.status === "Não resolvida"
                          ? "#C50000"
                          : fb.status === "Resolvida"
                          ? "#00B327"
                          : "#666"
                    }}
                  >
                    {fb.status}
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
