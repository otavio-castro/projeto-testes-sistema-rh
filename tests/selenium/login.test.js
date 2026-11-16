const { abrirNavegador, limparDados, gravarDados, lerDados, aceitarAlerta } = require('./support/navegador');
const { fazerLogin, estaVisivel, esperarUrl } = require('./support/paginas');
const massa = require('./support/massa');

describe('Login', () => {
  let navegador, driver, baseUrl;

  beforeAll(async () => {
    navegador = await abrirNavegador();
    ({ driver, baseUrl } = navegador);
  });

  beforeEach(async () => {
    await limparDados(driver, baseUrl);
    await gravarDados(driver, {
      dbEmpresas: [massa.empresaSalva],
      dbCandidatos: [massa.candidatoSalvo],
    });
  });

  afterAll(() => navegador.fechar());

  test('CT14 - Login de empresa com credenciais válidas', async () => {
    await fazerLogin(driver, baseUrl, massa.empresa.email, massa.empresa.senha);

    expect(await aceitarAlerta(driver)).toBe('Login realizado com sucesso!');
    await esperarUrl(driver, 'home-page/index.html');
    expect(await estaVisivel(driver, 'meuPerfil')).toBe(true);
    expect(await estaVisivel(driver, 'sair')).toBe(true);
    expect(await estaVisivel(driver, 'cadastrarVaga')).toBe(true);
    expect(await estaVisivel(driver, 'entrar')).toBe(false);
  });

  test('CT15 - Login com senha incorreta', async () => {
    await fazerLogin(driver, baseUrl, massa.empresa.email, 'senhaErrada');

    expect(await aceitarAlerta(driver)).toBe('Email ou senha incorretos.');
    expect(await driver.getCurrentUrl()).toContain('pagina-login/login.html');
    expect(await lerDados(driver, 'isLoggedIn')).toBeNull();
  });

  test('CT16 - Login de candidato não exibe a opção Cadastrar Vaga', async () => {
    await fazerLogin(driver, baseUrl, massa.candidato.email, massa.candidato.senha);

    expect(await aceitarAlerta(driver)).toBe('Login realizado com sucesso!');
    await esperarUrl(driver, 'home-page/index.html');
    expect(await estaVisivel(driver, 'meuPerfil')).toBe(true);
    expect(await estaVisivel(driver, 'cadastrarVaga')).toBe(false);
    expect(await estaVisivel(driver, 'cadastrarVagas')).toBe(false);
  });
});
