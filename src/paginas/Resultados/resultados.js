import React, { useState } from "react";
import "./resultados.css";
import imagemFundo from "../../assets/img/3786391_78792 1.svg";

const Resultados = () => {
  const [busca, setBusca] = useState("");

  const usuarios = [
    {
      id: 1,
      nome: "Nintendo",
      categoria: "Arte e Entretenimento",
      descricao:
        "A Nintendo Co., Ltd. é uma desenvolvedora e publicadora japonesa de jogos eletrônicos e consoles sediada em Quioto, no Japão.",
      imagem:
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg",
    },
    {
      id: 2,
      nome: "Sony",
      categoria: "Tecnologia e Entretenimento",
      descricao:
        "A Sony é uma das maiores empresas de eletrônicos de consumo e entretenimento do mundo.",
      imagem:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/1920px-Sony_logo.svg.png",
    },
    {
      id: 3,
      nome: "Microsoft",
      categoria: "Tecnologia e Software",
      descricao:
        "A Microsoft é uma empresa multinacional americana que desenvolve, licencia e apoia uma ampla gama de produtos de software.",
      imagem:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
  ];

  const resultadosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="Fundo_Resultado">
      <div className="resultados-container">
        <div className="Painel_Resultados">
          <div className="busca-container">
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="campo-busca"
            />
            <button
              className="botao-buscar"
              onClick={() => alert(`Buscando por: ${busca}`)}
            >
              Buscar
            </button>
          </div>
          <div className="lista-usuarios">
            {resultadosFiltrados.length > 0 ? (
              resultadosFiltrados.map((usuario) => (
                <div className="usuario-card" key={usuario.id}>
                  <img
                    src={usuario.imagem}
                    alt={usuario.nome}
                    className="usuario-imagem"
                  />
                  <div className="usuario-info">
                    <h1>{usuario.nome}</h1>
                    <h2>{usuario.categoria}</h2>
                    <p>{usuario.descricao}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="sem-resultados">Nenhum resultado encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultados;
