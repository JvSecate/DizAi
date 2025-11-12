import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { BsPencilSquare } from "react-icons/bs";
import "./perfil_Empresa.css";

export default function Perfil_Empresa() {
  const [editMode, setEditMode] = useState({
    nome: false,
    email: false,
    senha: false,
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    img: "",
  });

  const [mensagem, setMensagem] = useState("");

  // Função para carregar dados do localStorage
  const carregarEmpresa = () => {
    const empresaLogado = JSON.parse(localStorage.getItem("empresaLogado"));
    if (empresaLogado) {
      setFormData({
        nome: empresaLogado.nome || "",
        email: empresaLogado.email || "",
        senha: empresaLogado.senha || "",
        img: empresaLogado.img || "",
      });
    }
  };

  useEffect(() => {
    carregarEmpresa();
  }, []);

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

    const empresaLogado = JSON.parse(localStorage.getItem("empresaLogado"));
    const empresas = JSON.parse(localStorage.getItem("empresa") || "[]");

    // Atualiza o usuário logado e a lista geral
    const empresasAtualizadas = empresas.map((u) =>
      u.email === empresaLogado.email ? formData : u
    );

    localStorage.setItem("empresa", JSON.stringify(empresasAtualizadas));
    localStorage.setItem("empresaLogado", JSON.stringify(formData));

    setMensagem("Dados atualizados com sucesso!");
    setEditMode({ nome: false, email: false, senha: false });

    // Atualiza os dados exibidos
    carregarEmpresa();

    setTimeout(() => setMensagem(""), 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resposta = [
    { titulo: "Produto entregue com atraso", status: "Resolvida" },
    { titulo: "Produto com defeito", status: "Não resolvida" },
    { titulo: "Atendimento ruim", status: "Em andamento" },
  ];

  return (
    <div className="Fundo_Perfil_Empresa">
      <div className="Painel_Empresa">
        {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}
        <form className="Tabela_Perfil_Empresa" onSubmit={handleSubmit}>
          <div className="Perfil-Imagem-Container">
            <img
              className="Img_Perfil"
              src={formData.img || "https://via.placeholder.com/120?text=Logo"}
              alt="Foto de perfil"
            />

            <div className="Perfil-Botoes-Imagem">
              <label htmlFor="image-upload" className="Botao-Imagem Alterar-Foto">
                Alterar
              </label>
              {formData.img && (
                <button
                  type="button"
                  className="Botao-Imagem Remover-Foto"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, img: "" }))
                  }
                >
                  Remover
                </button>
              )}
            </div>

            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Nome */}
          <label htmlFor="nome">Nome da Empresa</label>
          <div className="Dados_Perfil">
            <input
              type="text"
              id="nome"
              name="nome"
              className="Dados"
              value={formData.nome}
              onChange={handleChange}
              readOnly={!editMode.nome}
              required
            />
            <button
              type="button"
              className="Edit_Button"
              onClick={() => handleToggleEdit("nome")}
            >
              <BsPencilSquare
                size={20}
                color={editMode.nome ? "#04D9B2" : "black"}
              />
            </button>
          </div>

          {/* Email */}
          <label htmlFor="email">Email</label>
          <div className="Dados_Perfil">
            <input
              type="email"
              id="email"
              name="email"
              className="Dados"
              value={formData.email}
              onChange={handleChange}
              readOnly={!editMode.email}
              required
            />
            <button
              type="button"
              className="Edit_Button"
              onClick={() => handleToggleEdit("email")}
            >
              <BsPencilSquare
                size={20}
                color={editMode.email ? "#04D9B2" : "black"}
              />
            </button>
          </div>

          {/* Senha */}
          <label htmlFor="senha">Senha</label>
          <div className="Dados_Perfil">
            <input
              type="password"
              id="senha"
              name="senha"
              className="Dados"
              value={formData.senha}
              onChange={handleChange}
              readOnly={!editMode.senha}
              required
            />
            <button
              type="button"
              className="Edit_Button"
              onClick={() => handleToggleEdit("senha")}
            >
              <BsPencilSquare
                size={20}
                color={editMode.senha ? "#04D9B2" : "black"}
              />
            </button>
          </div>

          <div className="Alterar-botao-area">
            <button className="Alterar-botao" type="submit">
              Salvar Alterações
            </button>
          </div>
        </form>

        {/* Tabela de Avaliações */}
        <Table className="Avaliacao-Pesona">
          <TableCaption>Avaliações Recebidas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="Titulo-Tabela">Título / Razão</TableHead>
              <TableHead className="Titulo-Tabela">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resposta.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.titulo}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        item.status === "Não resolvida"
                          ? "#C50000"
                          : item.status === "Resolvida"
                          ? "#00B327"
                          : "#666",
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
