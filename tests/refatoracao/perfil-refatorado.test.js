const path = require('path');
const { carregarPagina, estaOculto } = require('../unit/support/pagina');

const DEPOIS = path.join(__dirname, '..', '..', 'refatoracao', 'depois');

function entrarComo(tipo) {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userType', tipo);
}

describe('Refatoração 2 - atualizarBotoes (telaperfil.js)', () => {
  beforeEach(() => {
    carregarPagina('pagina-perfil/telaperfil.html', ['telaperfil.js'], { raizScripts: DEPOIS });
  });

  test('visitante vê "Entrar" e não vê "Sair"', () => {
    atualizarBotoes();

    expect(estaOculto('entrar')).toBe(false);
    expect(estaOculto('sair')).toBe(true);
  });

  test('empresa vê "Cadastrar Vaga" mesmo sem o botão da home na página', () => {
    entrarComo('empresa');

    expect(() => atualizarBotoes()).not.toThrow();
    expect(estaOculto('cadastrarVaga')).toBe(false);
    expect(estaOculto('meuPerfil')).toBe(false);
  });

  test('candidato não vê "Cadastrar Vaga"', () => {
    entrarComo('candidato');

    atualizarBotoes();

    expect(estaOculto('cadastrarVaga')).toBe(true);
    expect(estaOculto('sair')).toBe(false);
  });
});
