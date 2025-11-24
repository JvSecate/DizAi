import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../../components/ui/table";
import usuarioImg from "../../assets/img/usuario.png";
import empresaImg from "../../assets/img/empresa.png";
import { BsPencilSquare } from "react-icons/bs";
import { API_URL } from '../../config/config';
import './perfil.css';
export default function Perfil() {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    img: ""
  });

  const [mensagem, setMensagem] = useState('');
  const [tipo, setTipo] = useState(null);
  const [id, setId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const empresa = JSON.parse(localStorage.getItem("empresaLogado"));

    if (usuario) {
      setTipo("usuario");
      setId(usuario.id);

      fetch(`${API_URL}/usuarios/${usuario.id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            nome: data.nome,
            email: data.email,
            senha: "",
            img: usuarioImg
          });
        });
    }

    if (empresa) {
      setTipo("empresa");
      setId(empresa.id);

      fetch(`${API_URL}/empresas/${empresa.id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            nome: data.nome,
            email: data.email,
            senha: "",
            img: empresaImg
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
          setFeedbacks(data.filter(fb => fb.empresa_id === id));
        }
      });
  }, [id, tipo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !tipo) return;

    const rota = tipo === "usuario" ? "usuarios" : "empresas";

    const bodyToSend = { ...formData };
    if (formData.senha.trim() === "") {
      delete bodyToSend.senha;
    }

    const response = await fetch(`${API_URL}/${rota}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyToSend)
    });

    if (!response.ok) {
      setMensagem("Erro ao atualizar");
      return;
    }

    const updated = await response.json();

    if (tipo === "usuario") {
        
      localStorage.setItem("usuarioLogado", JSON.stringify({
        id: updated.id,
        nome: updated.nome,
        email: updated.email
      }));
    } else {
      localStorage.setItem("empresaLogado", JSON.stringify({
        id: updated.id,
        nome: updated.nome,
        email: updated.email,
      }));
    }

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

                {mensagem && (
                  <p className="Mensagem-Sucesso">{mensagem}</p>
                )}

                <div className="Alterar-botao-area">
                  <button type="submit" className="Alterar-botao">Salvar</button>
                </div>

                <button
                  type="button"
                  className="Edit_Profile_Button"
                  onClick={() => setEditMode(false)}
                >
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
