import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/config";
import { mapaNotas, corNota, formatarData, conf_min} from "../../utils/feedback_info";
import "./feedback.css";

const FeedbackDetalhe = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [mostrarPainel, setMostrarPainel] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const isEmpresa = usuario?.tipo === "empresa";

  useEffect(() => {
    fetch(`${API_URL}/feedbacks/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Feedback não encontrado");
        return res.json();
      })
      .then(data => setFeedback(data))
      .catch(err => setMensagem(err.message));
  }, [id]);

  if (mensagem) return <p className="Mensagem">{mensagem}</p>;
  if (!feedback) return <p className="Mensagem">Carregando feedback...</p>;

  const confidencia = (feedback.conf_sentimento * 100).toFixed(1);
  const acimaLimite = confidencia > conf_min;

  return (
    <div className="Feedback_Pagina">
      <h2 className="Feedback_Empresa">{feedback.empresa_nome}</h2>
      <h1 className="Feedback_Titulo">{feedback.titulo}</h1>
      <p className="Feedback_Data">{formatarData(feedback.criado_em)}</p>

      <div className="Feedback_Conteudo">

        {isEmpresa && (
          <div className="Sentimento_Container">

            {!acimaLimite && (
              <span className="Sentimento_Label" style={{ color: "#777" }}>
                Indeterminado
              </span>
            )}

            {acimaLimite && (
              <span className="Sentimento_Label" style={{ color: corNota[feedback.nota_sentimento] }}>
                {mapaNotas[feedback.nota_sentimento]}
              </span>
            )}

            <button
              className="Sentimento_Btn"
              onClick={() => setMostrarPainel(!mostrarPainel)}
            >
              Detalhes
            </button>

            {mostrarPainel && (
              <div className="Sentimento_Detalhes">
                <p style={{
                  color: acimaLimite ? corNota[feedback.nota_sentimento] : "#777",
                  fontWeight: "bold"
                }}>
                  Nota: {acimaLimite ? mapaNotas[feedback.nota_sentimento] : "Indeterminado"}
                </p>
                <p>Confiança: {confidencia}%</p>
              </div>
            )}

          </div>
        )}

        <p>{feedback.conteudo}</p>
      </div>
    </div>
  );
};

export default FeedbackDetalhe;
