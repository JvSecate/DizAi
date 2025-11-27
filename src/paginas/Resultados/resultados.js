import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./resultados.css";
import { API_URL } from "../../config/config"; 
import empresaImg from "../../assets/img/empresa.png";

const Resultados = () => {
  const [busca, setBusca] = useState("");
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/empresas`)
      .then((res) => res.json())
      .then((data) => setEmpresas(data))
      .catch((err) => console.error("Erro ao buscar empresas:", err));
  }, []);

  const resultadosFiltrados = empresas.filter((empresa) =>
    empresa.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="Fundo_Resultado">
      <div className="resultados-container">
        <div className="Painel_Resultados">
          <div className="busca-container">
            <input
              type="text"
              placeholder="Buscar empresa..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="campo-busca"
            />
            <button
              className="botao-buscar"
              onClick={() => {}}
            >
              Buscar
            </button>
          </div>

          <div className="lista-usuarios">
            {resultadosFiltrados.length > 0 ? (
              resultadosFiltrados.map((empresa) => (
                <Link
                  key={empresa.id}
                  to={`/empresa/${empresa.id}`}
                  className="usuario-card"
                >
                  <img
                    src={empresaImg}
                    alt={empresa.nome}
                    className="usuario-imagem"
                  />
                  <div className="usuario-info">
                    <h1>{empresa.nome}</h1>
                    <h2>{empresa.setor}</h2>
                    <p>{empresa.descricao}</p>
                  </div>
                </Link>
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
