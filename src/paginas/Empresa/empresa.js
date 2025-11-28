import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./empresa.css";
import { API_URL } from "../../config/config";

import empresaImg from "../../assets/img/empresa.png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";

import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { mapaNotas, corNota, conf_min, formatarData } from "../../utils/feedback_info";

export default function Empresa() {
  const { id } = useParams();

  const [empresa, setEmpresa] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [usuario, setUsuario] = useState(null);
  const [mediaSentimento, setMediaSentimento] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (u) setUsuario(u);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/empresas/${id}`)
      .then(res => res.json())
      .then(data => setEmpresa(data))
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    fetch(`${API_URL}/feedbacks`)
      .then(res => res.json())
      .then(data => {
        const fil = data.filter(fb => fb.empresa_id === parseInt(id));
        setFeedbacks(fil);
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    fetch(`${API_URL}/empresas/${id}/avg`)
      .then(res => res.json())
      .then(data => setMediaSentimento(data.media_nota))
      .catch(() => setMediaSentimento(null));
  }, [id]);

  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });

    const sorted = [...feedbacks].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      if (key === "criado_em") {
        valA = new Date(valA);
        valB = new Date(valB);
      }
      if (key === "nota_sentimento") {
        const confA = a.conf_sentimento * 100;
        const confB = b.conf_sentimento * 100;
        valA = confA > conf_min ? a.nota_sentimento : 999;
        valB = confB > conf_min ? b.nota_sentimento : 999;
      }

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFeedbacks(sorted);
  };

  const sortIcon = (column) => {
    if (sortConfig.key !== column) return <FaSort size={14} style={{ opacity: 0.5 }} />;
    return sortConfig.direction === "asc" ? <FaSortUp size={14} /> : <FaSortDown size={14} />;
  };

  if (!empresa) return null;

  const mostrarSentimento = usuario?.tipo === "empresa" && usuario.empresa_id === empresa.id;

  return (
    <div className="Fundo-Empresa">
      <div className="empresa-container">
        <div className="Painel-empresa">
          <div className="empresa-header">
            <img className="Logo" src={empresaImg} alt={empresa.nome} />

            <div>
              <h1>{empresa.nome}</h1>
              <h2>{empresa.setor}</h2>
              <p>{empresa.descricao}</p>
              {empresa.email && (
                <p style={{ fontWeight: 500, marginTop: "5px" }}>Email: {empresa.email}</p>
              )}
              <p style={{ fontWeight: 500, marginTop: "5px" }}>
                {mediaSentimento !== null 
                  ? <>Nota: {mediaSentimento} &#9733;</> 
                  : "Não avaliado"}
              </p>
            </div>

            {usuario?.tipo !== "empresa" && (
              <Link
                to={`/sistema/usuario`}
                state={{ empresaId: empresa.id, empresaNome: empresa.nome }}
              >
                <button>Avaliar</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="empresa-container">
        <div className="FeedbackEmpresa-Fora">
          <div className="FeedbackEmpresa-Tabela">
            <h2>Feedbacks</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <button className="SortButton" onClick={() => sortBy("titulo")}>
                      Título {sortIcon("titulo")}
                    </button>
                  </TableHead>

                  {mostrarSentimento && (
                    <TableHead>
                      <button className="SortButton" onClick={() => sortBy("nota_sentimento")}>
                        Sentimento {sortIcon("nota_sentimento")}
                      </button>
                    </TableHead>
                  )}

                  <TableHead>
                    <button className="SortButton" onClick={() => sortBy("criado_em")}>
                      Data {sortIcon("criado_em")}
                    </button>
                  </TableHead>

                  <TableHead>
                    <button className="SortButton" onClick={() => sortBy("status")}>
                      Status {sortIcon("status")}
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {feedbacks.map(fb => {
                  const conf = fb.conf_sentimento * 100;
                  const valido = conf > conf_min;

                  return (
                    <TableRow key={fb.id}>
                      <TableCell>
                        <Link to={`/feedback/${fb.id}`} className="FeedbackEmpresa-Link">
                          {fb.titulo}
                        </Link>
                      </TableCell>

                      {mostrarSentimento && (
                        <TableCell style={{ color: valido ? corNota[fb.nota_sentimento] : "#777" }}>
                          {valido ? mapaNotas[fb.nota_sentimento] : "Indeterminado"}
                        </TableCell>
                      )}

                      <TableCell>{formatarData(fb.criado_em)}</TableCell>

                      <TableCell
                        style={{
                          color:
                            fb.status === "Aberto"
                              ? "#C50000"
                              : fb.status === "Respondida"
                              ? "#00B327"
                              : "#555"
                        }}
                      >
                        {fb.status}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
