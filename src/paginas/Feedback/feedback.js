import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/config";
import "./feedback.css";

const FeedbackDetalhe = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [mensagem, setMensagem] = useState("");

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

  return (
    <div className="Feedback_Pagina">
      
      <h2 className="Feedback_Empresa">{feedback.empresa_nome}</h2>

      <h1 className="Feedback_Titulo">{feedback.titulo}</h1>

      <div className="Feedback_Conteudo">
        <p>{feedback.conteudo}</p>
      </div>

    </div>
  );
};

export default FeedbackDetalhe;
