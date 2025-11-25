export function salvarUsuario(usuario) {
  localStorage.setItem("usuarioLogado", JSON.stringify({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
    empresa_id: usuario.empresa_id || null,
    token: usuario.token || null
  }));
}

export function limparSessao() {
  localStorage.removeItem("usuarioLogado");
}
