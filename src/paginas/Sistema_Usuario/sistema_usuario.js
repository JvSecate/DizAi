import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./sistema_usuario.css";
import ImgWomen from '../../assets/img/image 1.png';
import { API_URL } from "../../config/config";

const Sistema = () => {
  const navigate = useNavigate();
  const [empresaTexto, setEmpresaTexto] = useState("");
  const [empresaId, setEmpresaId] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [empresaSugestoes, setEmpresaSugestoes] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const [mensagem, setMensagem] = useState("");

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    fetch(`${API_URL}/empresas`)
      .then(res => res.json())
      .then(data => setEmpresas(data));
  }, []);

  const handleEmpresaChange = (e) => {
    const texto = e.target.value;
    setEmpresaTexto(texto);

    if (texto.trim() === "") {
      setEmpresaSugestoes([]);
      setEmpresaId(null);
      return;
    }

    const filtradas = empresas.filter(emp =>
      emp.cnpj?.toLowerCase().includes(texto.toLowerCase()) ||
      emp.nome?.toLowerCase().includes(texto.toLowerCase())
    );

    setEmpresaSugestoes(filtradas.slice(0, 5));
    setEmpresaId(null);
  };

  const selecionarEmpresa = (empresa) => {
    setEmpresaTexto(empresa.nome || empresa.cnpj);
    setEmpresaId(empresa.id);
    setEmpresaSugestoes([]);
  };

  const enviarAvaliacao = async (e) => {
    e.preventDefault();

    if (!empresaId) {
      setMensagem("Selecione uma empresa válida.");
      return;
    }

    const body = {
      titulo: titulo,
      conteudo: conteudo,
      usuario_id: usuarioLogado.id,
      empresa_id: empresaId
    };

    const response = await fetch(`${API_URL}/feedbacks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      setMensagem("Erro ao enviar avaliação.");
      return;
    }

    const data = await response.json();

    navigate(`/feedback/${data.id}`);

    setEmpresaTexto("");
    setEmpresaId(null);
    setTitulo("");
    setConteudo("");
    setMensagem(""); 
  };

  return (
    <Fragment>
      <div className='Avaliacao_Pagina'>
        <div className='Tabela_Avaliacao'>
          <h1 className='Text_1'>Deseja Avaliar o Serviço?</h1>
          <h2 className='Text_2'><b>Comente Aqui</b></h2>

          <form onSubmit={enviarAvaliacao}>
            <div className='Tabela_Dados'>

              <div className='Dados_1'>

                {/* Empresa input + suggestions */}
                <div className='Dados_Avaliacao SugestoesWrapper'>
                  <label>Empresa</label>
                  <input
                    required
                    type="text"
                    value={empresaTexto}
                    onChange={handleEmpresaChange}
                    placeholder="Digite o nome da empresa..."
                  />

                  {empresaSugestoes.length > 0 && (
                    <div className="Sugestoes-Box">
                      {empresaSugestoes.map(emp => (
                        <div
                          key={emp.id}
                          className="Sugestao"
                          onClick={() => selecionarEmpresa(emp)}
                        >
                          {emp.nome || emp.cnpj}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Título/Razão */}
                <div className='Dados_Avaliacao'>
                  <label htmlFor="razao">Título/Razão</label>
                  <input
                    required
                    type="text"
                    id="razao"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>

              </div>

              {/* Descrição */}
              <div className='Dados_2'>
                <div className='Dados_Avaliacao'>
                  <label htmlFor="conteudo">Descreva seu problema</label>
                  <textarea
                    required
                    id="conteudo"
                    rows="6"
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                  />
                </div>
              </div>

            </div>

            {mensagem && <p className="Mensagem">{mensagem}</p>}

            <div className='Container_Button'>
              <button className='Enviar' type="submit">Enviar</button>
            </div>
          </form>
        </div>

        <div className='Banner_imgWomen'>
          <img src={ImgWomen} className='Imagen_Women' />
        </div>
      </div>
    </Fragment>
  );
};

export default Sistema;
