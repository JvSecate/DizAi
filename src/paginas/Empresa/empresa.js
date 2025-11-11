import React from 'react'
import './empresa.css'
import { useParams } from 'react-router-dom'

const empresas = [
  {
    id: "1",
    nome: "Nintendo",
    setor: "Arte e Entretenimento - Jogos",
    descricao: "A Nintendo Co., Ltd. é uma desenvolvedora japonesa de jogos eletrônicos.",
    status: { positivo: 25, neutro: 25, negativo: 50 },
    avaliacoes: [
      { titulo: "Meu Nintendo Online Não...", status: "Respondido" },
      { titulo: "A Entrega Foi Horrível!!!", status: "Não Respondido" },
    ],
  },
  {
    id: "2",
    nome: "Sony",
    setor: "Tecnologia e Entretenimento",
    descricao: "A Sony é uma das maiores empresas de eletrônicos de consumo do mundo.",
    status: { positivo: 50, neutro: 30, negativo: 20 },
    avaliacoes: [
      { titulo: "Adoro o PS5", status: "Respondido" },
      { titulo: "Controle com defeito", status: "Não Respondido" },
    ],
  },
];

const Empresa = () => {
  const { id } = useParams()
  const empresa = empresas.find(e => e.id === id) || empresas[0]

  return (
    <div className='Fundo-Empresa'>
      <div className="empresa-container">
        <div className='Painel-empresa'>
          <div className="empresa-header">
            <img className="Logo" alt={empresa.nome} />
            <div>
              <h1>{empresa.nome}</h1>
              <h2>{empresa.setor}</h2>
              <p>{empresa.descricao}</p>
            </div>
            <button>Avaliar</button>
          </div>
          <div className='detalhes-empresa'>
            <div className="empresa-status">
              <h2>Status</h2>
              <table>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Percentual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Positivo</td>
                    <td>{empresa.status.positivo}%</td>
                  </tr>
                  <tr>
                    <td>Neutro</td>
                    <td>{empresa.status.neutro}%</td>
                  </tr>
                  <tr>
                    <td>Negativo</td>
                    <td>{empresa.status.negativo}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="empresa-avaliacoes">
              <h2>Avaliações</h2>
              <table>
                <thead>
                  <tr>
                    <th>Título/Razão</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {empresa.avaliacoes.map((a, i) => (
                    <tr key={i}>
                      <td>{a.titulo}</td>
                      <td>{a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Empresa
