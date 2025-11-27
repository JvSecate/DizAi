import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/config";
import { mapaNotas, corNota, formatarData, conf_min } from "../../utils/feedback_info";
import "./feedback.css";

const FeedbackDetalhe = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [novaResposta, setNovaResposta] = useState("");
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

  useEffect(() => {
    const fetchRespostas = async () => {
      try {
        const res = await fetch(`${API_URL}/respostas`);
        const allRespostas = await res.json();
        const respostasFiltradas = allRespostas.filter(r => r.feedback_id === parseInt(id));

        const respostasComNomes = await Promise.all(respostasFiltradas.map(async (r) => {
          let nome = "Desconhecido";
          if (r.usuario_id) {
            const resUser = await fetch(`${API_URL}/usuarios/${r.usuario_id}`);
            if (resUser.ok) {
              const userData = await resUser.json();
              nome = userData.nome;
            }
          }
          return { ...r, nome };
        }));

        setRespostas(respostasComNomes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRespostas();
  }, [id]);

  if (mensagem) return <p className="Mensagem">{mensagem}</p>;
  if (!feedback) return <p className="Mensagem">Carregando feedback...</p>;

  const confidencia = (feedback.conf_sentimento * 100).toFixed(1);
  const acimaLimite = confidencia > conf_min;

  const handleSubmitResposta = async (e) => {
    e.preventDefault();
    if (!novaResposta.trim()) return;

    const body = {
      feedback_id: feedback.id,
      usuario_id: usuario.id,
      resposta: novaResposta.trim()
    };

    const res = await fetch(`${API_URL}/respostas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      alert("Erro ao enviar resposta");
      return;
    }

    const created = await res.json();

    const resUser = await fetch(`${API_URL}/usuarios/${created.usuario_id}`);
    const userData = await resUser.json();

    setRespostas(prev => [...prev, { ...created, nome: userData.nome }]);
    setNovaResposta("");
  };

  return (
    <div className="Feedback_Pagina">
      <h2 className="Feedback_Empresa">{feedback.empresa_nome}</h2>
      <h1 className="Feedback_Titulo">{feedback.titulo}</h1>
      <div className="Feedback_Conteudo">
        <p className="Feedback_Data">{formatarData(feedback.criado_em)}</p>
        {(!isEmpresa || acimaLimite) && (
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

      <div style={{ marginTop: "10px" }}>
        <h3>Respostas</h3>
        {respostas.length === 0 && <p>Nenhuma resposta ainda.</p>}
        {respostas.map(r => (
          <div key={r.id} className="Feedback_Conteudo" style={{ background: "#A0F2CC", marginBottom: "1px" }}>
            <p style={{ fontWeight: "600" }}>{r.nome}</p>
            <p>{r.resposta}</p>
          </div>
        ))}

        {(usuario.id === feedback.usuario_id || usuario.empresa_id === feedback.empresa_id) && (
          <form onSubmit={handleSubmitResposta} style={{ marginTop: "20px" }}>
            <textarea
              value={novaResposta}
              onChange={(e) => setNovaResposta(e.target.value)}
              placeholder="Escreva sua resposta..."
              className="Dados"
              style={{ width: "100%", minHeight: "80px" }}
            />
            <button type="submit" className="Alterar-botao" style={{ marginTop: "10px", marginBottom: "20px" }}>
              Enviar Resposta
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackDetalhe;
