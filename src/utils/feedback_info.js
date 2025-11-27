export const mapaNotas = {
  1: "Muito Negativo",
  2: "Negativo",
  3: "Neutro",
  4: "Positivo",
  5: "Muito Positivo",
};

export const corNota = {
  1: "#ff4c4c",   // Muito Negativo
  2: "#b30000",   // Negativo
  3: "#e6e600",   // Neutro
  4: "#006600",   // Positivo
  5: "#00b300",   // Muito Positivo
};

export const conf_min = 35; // Confiança minima para exibir nota

export function formatarData(dtString) {
  const dt = new Date(dtString);
  return dt.toLocaleDateString("pt-BR");
}
