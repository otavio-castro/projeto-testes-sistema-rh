const BANCOS_DE_USUARIOS = [
  { chave: "dbEmpresas", tipo: "empresa" },
  { chave: "dbCandidatos", tipo: "candidato" },
];

function buscarUsuario(chave, email, senha) {
  const usuarios = JSON.parse(localStorage.getItem(chave)) || [];
  return usuarios.find((usuario) => usuario.email === email && usuario.senha === senha);
}

function autenticarUsuario(email, senha) {
  for (const { chave, tipo } of BANCOS_DE_USUARIOS) {
    const usuario = buscarUsuario(chave, email, senha);
    if (usuario) {
      localStorage.setItem("loggedUser", JSON.stringify(usuario));
      return tipo;
    }
  }
  return null;
}

function realizarLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;
  const tipo = autenticarUsuario(email, senha);

  if (!tipo) {
    alert("Email ou senha incorretos.");
    return;
  }

  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("userType", tipo);
  alert("Login realizado com sucesso!");
  window.location.href = "../home-page/index.html";
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  realizarLogin();
});
