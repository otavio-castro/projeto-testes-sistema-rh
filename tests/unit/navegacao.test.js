const { carregarPagina, estaOculto } = require('./support/pagina');

describe('atualizarBotoes', () => {
  test('CT07 - Empresa logada vê "Cadastrar Vaga" e não vê "Entrar"', () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', 'empresa');
    carregarPagina('home-page/index.html', ['home-page/script.js']);

    atualizarBotoes();

    expect(estaOculto('cadastrarVaga')).toBe(false);
    expect(estaOculto('cadastrarVagas')).toBe(false);
    expect(estaOculto('meuPerfil')).toBe(false);
    expect(estaOculto('entrar')).toBe(true);
    expect(estaOculto('cadastro')).toBe(true);
  });

  test('CT10 - Visitante não logado não vê o botão "Sair" na página de perfil', () => {
    carregarPagina('pagina-perfil/telaperfil.html', ['pagina-perfil/telaperfil.js']);

    atualizarBotoes();

    expect(estaOculto('sair')).toBe(true);
    expect(estaOculto('entrar')).toBe(false);
  });
});
