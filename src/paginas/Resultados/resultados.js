import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./resultados.css";
import { API_URL } from "../../config/config"; 
import empresaImg from "../../assets/img/empresa.png";

const Resultados = () => {
  const [busca, setBusca] = useState("");
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await fetch(`${API_URL}/empresas`);
        const data = await res.json();

        const empresasComScore = await Promise.all(
          data.map(async (empresa) => {
            try {
              const scoreRes = await fetch(`${API_URL}/empresas/${empresa.id}/avg`);
              const scoreData = await scoreRes.json();
              return { ...empresa, media_sentimento: scoreData.media_nota };
            } catch {
              return { ...empresa, media_sentimento: null };
            }
          })
        );

        empresasComScore.sort((a, b) => {
          if (a.media_sentimento === null) return 1;
          if (b.media_sentimento === null) return -1;
          return b.media_sentimento - a.media_sentimento;
        });

        setEmpresas(empresasComScore);
      } catch (err) {
        console.error("Erro ao buscar empresas:", err);
      }
    };

    fetchEmpresas();
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
            <button className="botao-buscar" onClick={() => {}}>
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
                    <p>
                      {empresa.media_sentimento !== null 
                        ? `Nota: ${empresa.media_sentimento} ★`
                        : "Não avaliado"}
                    </p>
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
