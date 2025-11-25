import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import "./home.css"

export default function FeedbackTable() {
  const feedbacks = [
    {
      titulo: "Produto entregue com atraso",
      empresa: "Nintendo",
      descricao: "O Fulano Não Me Deu O ...",
      status: "Resolvida",
      sentimento: "Negativo",
    },
    {
      titulo: "Atendimento rápido e eficiente",
      empresa: "Nintendo",
      descricao: "O Fulano Não Me Deu O ...",
      status: "Resolvida",
      sentimento: "Positivo",
    },
    {
      titulo: "Aplicativo travando com frequência",
      empresa: "Nintendo",
      descricao: "O Fulano Não Me Deu O ...",
      status: "Em andamento",
      sentimento: "Neutro",
    },
    {
      titulo: "Entrega cancelada sem aviso",
      empresa: "Nintendo",
      descricao: "O Fulano Não Me Deu O ...",
      status: "Não resolvida",
      sentimento: "Negativo",
    },
  ]
  const avaliacao = [
    {
      Nome_Empresa:"Sony",
      Nota:"4",
    },
    {
      Nome_Empresa:"Nintendo",
      Nota:"2,5",
    },
    {
      Nome_Empresa:"Microsoft",
      Nota:"4",
    },
    {
      Nome_Empresa:"SEGA",
      Nota:"3",
    },
    {
      Nome_Empresa:"Konami",
      Nota:"1,5",
    }
  ]

  return (
    <div className="Fundo">
      <div className="Tabela_Position">
        <Table className="Tabela">
          <TableHeader>
            <TableRow>
              <TableHead className="Titulo-Tabela">Título da Reclamação</TableHead>
              <TableHead className="Titulo-Tabela">Empresa</TableHead>
              <TableHead className="Titulo-Tabela">Descicao</TableHead>
              <TableHead className="Titulo-Tabela">Status</TableHead>
              <TableHead className="Titulo-Tabela">Sentimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.titulo}</TableCell>
                <TableCell className="font-medium">{item.empresa}</TableCell>
                <TableCell className="font-medium">{item.descricao}</TableCell>
                <TableCell>
                  <span
                    style={{ color: item.status == "Não resolvida" ? '#c50000ff' :
                      item.status == "Resolvida" ? '#00b327ff' :
                      item.status == "Em andamento" ? "#666666" : '#000' }}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    style={{ color: item.sentimento == "Negativo" ? '#c50000ff' :
                      item.sentimento == "Positivo" ? '#00b327ff' :
                      item.sentimento == "Neutro" ? "#666666" : '#000' }}
                  >
                    {item.sentimento}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table className="Tabela-1">
          <TableHeader>
            <TableRow>
              <TableHead className="Titulo-Tabela">Empresa</TableHead>
              <TableHead className="Titulo-Tabela">Avaliação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {avaliacao.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.Nome_Empresa}</TableCell>
                <TableCell className="font-medium">{item.Nota}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
