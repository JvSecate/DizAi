import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";

import { API_URL } from "../../config/config";
import { mapaNotas, corNota, conf_min, formatarData } from "../../utils/feedback_info";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import "./sistema_empresa.css";

export default function FeedbacksEmpresa() {
  const [empresaId, setEmpresaId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc"
  });

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario || usuario.tipo !== "empresa") return;
    setEmpresaId(usuario.empresa_id);
  }, []);

  useEffect(() => {
    if (!empresaId) return;

    fetch(`${API_URL}/feedbacks`)
      .then(res => res.json())
      .then(data => {
        const fil = data.filter(fb => fb.empresa_id === empresaId);
        setFeedbacks(fil);
      });
  }, [empresaId]);

  const sortBy = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

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

        const validA = confA > conf_min ? a.nota_sentimento : 999;
        const validB = confB > conf_min ? b.nota_sentimento : 999;

        valA = validA;
        valB = validB;
      }

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFeedbacks(sorted);
  };

  const sortIcon = (column) => {
    if (sortConfig.key !== column)
      return <FaSort size={14} style={{ opacity: 0.5 }} />;

    return sortConfig.direction === "asc"
      ? <FaSortUp size={14} />
      : <FaSortDown size={14} />;
  };

  return (
    <div className="Fundo_FeedbackEmpresa">
      <div className="Painel_FeedbackEmpresa">
        
        <div className="FeedbackEmpresa-Tabela">
          <h2>Feedbacks Recebidos</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <button className="SortButton" onClick={() => sortBy("titulo")}>
                    Título {sortIcon("titulo")}
                  </button>
                </TableHead>

                <TableHead>
                  <button className="SortButton" onClick={() => sortBy("nota_sentimento")}>
                    Sentimento {sortIcon("nota_sentimento")}
                  </button>
                </TableHead>

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

                    <TableCell style={{ color: valido ? corNota[fb.nota_sentimento] : "#777" }}>
                      {valido ? mapaNotas[fb.nota_sentimento] : "Indeterminado"}
                    </TableCell>

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
  );
}
