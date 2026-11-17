const VISIBILIDADE_DO_MENU = {
  visitante: { cadastro: true, entrar: true, meuPerfil: false, sair: false, cadastrarVaga: false, cadastrarVagas: false },
  candidato: { cadastro: false, entrar: false, meuPerfil: true, sair: true, cadastrarVaga: false, cadastrarVagas: false },
  empresa: { cadastro: false, entrar: false, meuPerfil: true, sair: true, cadastrarVaga: true, cadastrarVagas: true },
};

function perfilAtual() {
  if (localStorage.getItem("isLoggedIn") !== "true") return "visitante";
  return localStorage.getItem("userType") === "empresa" ? "empresa" : "candidato";
}

function atualizarBotoes() {
  const visibilidade = VISIBILIDADE_DO_MENU[perfilAtual()];

  Object.entries(visibilidade).forEach(([id, visivel]) => {
    const botao = document.getElementById(id);
    if (botao) botao.classList.toggle("d-none", !visivel);
  });
}

// Ação para o botão "Sair"
document.getElementById("sair").addEventListener("click", function () {
  localStorage.setItem("isLoggedIn", false);
  localStorage.removeItem("userType"); // Remove o tipo de usuário ao sair
  localStorage.removeItem("loggedUser");

  atualizarBotoes();
  alert("Você saiu com sucesso!");

  // Redireciona para a página inicial após logout
  window.location.href = "../home-page-index.html";
});

// Função para carregar os dados do perfil
function carregarPerfil() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser")); // Recupera o usuário logado
    const userType = localStorage.getItem("userType"); // Tipo de usuário
  
    if (!loggedUser) {
      alert("Nenhum usuário logado. Redirecionando para a página de login.");
      window.location.href = "../pagina-login/login.html"; // Redireciona se não houver usuário logado
      return;
    }
  
    // Preenche os dados no HTML
    document.getElementById("user-name").textContent =
      loggedUser.nome || "Não informado";
    document.getElementById("user-email").textContent =
      loggedUser.email || "Não informado";
  
    const avatar = document.getElementById("avatar"); // Alvo da imagem do avatar
    const extraInfo = document.getElementById("extra-info");
  
    if (userType === "empresa") {
      // Informações e avatar para empresas
      extraInfo.innerHTML = `
        <p><strong>CNPJ:</strong> ${loggedUser.cnpj || "Não informado"}</p>
        <p><strong>Cidade:</strong> ${loggedUser.cidade || "Não informado"}</p>
        <p><strong>Estado:</strong> ${loggedUser.estado || "Não informado"}</p>
      `;
      avatar.src = "../imagens/logos/pessoa.png"; // Avatar específico para empresas
    } else if (userType === "candidato") {
      // Informações e avatar para candidatos
      extraInfo.innerHTML = `
        <p><strong>Gênero:</strong> ${loggedUser.genero || "Não informado"}</p>
        <p><strong>Escolaridade:</strong> ${loggedUser.escolaridade || "Não informado"}</p>
        <p><strong>Vaga de Interesse:</strong> ${loggedUser.vaga || "Não informado"}</p>
      `;
  
      avatar.src = "../imagens/logos/pessoa.png";
    }
  }
  

// Função para realizar logout
function realizarLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
  localStorage.removeItem("loggedUser");
  window.location.href = "../pagina-login/login.html";
}

// Adiciona eventos para carregar o perfil e gerenciar logout
document.addEventListener("DOMContentLoaded", carregarPerfil);
document.getElementById("sair").addEventListener("click", realizarLogout);

// Atualizar a interface ao carregar a página
window.onload = function () {
  atualizarBotoes();
};
