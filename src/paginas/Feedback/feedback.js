import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/config";
import "./feedback.css";

const FeedbackDetalhe = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [mostrarPainel, setMostrarPainel] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const isEmpresa = usuario?.tipo === "empresa";

  const LIMITE = 30; // ajuste o valor desejado

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
  const acimaLimite = confidencia > LIMITE;

  const mapaNotas = {
    1: "Muito Negativo",
    2: "Negativo",
    3: "Neutro",
    4: "Positivo",
    5: "Muito Positivo",
  };
  const corNota = {
    1: "#e20f0fff",      // Muito Negativo 
    2: "#b30000",      // Negativo 
    3: "#7c7c06ff",      // Neutro 
    4: "#054e05ff",      // Positivo 
    5: "#00ff00ff",      // Muito Positivo
  };

  return (
    <div className="Feedback_Pagina">
      
      <h2 className="Feedback_Empresa">{feedback.empresa_nome}</h2>
      <h1 className="Feedback_Titulo">{feedback.titulo}</h1>

      <div className="Feedback_Conteudo">

        {isEmpresa && (
          <div className="Sentimento_Container">

            {!acimaLimite && (
              <span
                className="Sentimento_Label"
                style={{ color: "#777" }}
              >
                Indeterminado
              </span>
            )}

            {acimaLimite && (
              <span
                className="Sentimento_Label"
                style={{ color: corNota[feedback.nota_sentimento] }}
              >
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
                <p
                  style={{
                    color: acimaLimite
                      ? corNota[feedback.nota_sentimento]
                      : "#777",
                    fontWeight: "bold"
                  }}
                >
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
