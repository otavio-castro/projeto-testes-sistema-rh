const { abrirNavegador, limparDados, lerDados, aceitarAlerta } = require('./support/navegador');
const { cadastrarCandidato, cadastrarEmpresa, esperarUrl } = require('./support/paginas');
const massa = require('./support/massa');

describe('Cadastro de usuários', () => {
  let navegador, driver, baseUrl;

  beforeAll(async () => {
    navegador = await abrirNavegador();
    ({ driver, baseUrl } = navegador);
  });

  beforeEach(() => limparDados(driver, baseUrl));

  afterAll(() => navegador.fechar());

  test('CT11 - Cadastrar candidato com dados válidos', async () => {
    await cadastrarCandidato(driver, baseUrl, massa.candidato);

    expect(await aceitarAlerta(driver)).toContain('Cadastro realizado com sucesso!');
    await esperarUrl(driver, 'pagina-login/login.html');
    expect(await lerDados(driver, 'dbCandidatos')).toEqual([massa.candidatoSalvo]);
  });

  test('CT12 - Rejeitar cadastro de candidato com senhas diferentes', async () => {
    await cadastrarCandidato(driver, baseUrl, { ...massa.candidato, confirmeSenha: 'outra123' });

    expect(await aceitarAlerta(driver)).toBe('As senhas não coincidem!');
    expect(await driver.getCurrentUrl()).toContain('pagina-cadastro-candidato/candidato.html');
    expect(await lerDados(driver, 'dbCandidatos')).toBeNull();
  });

  test('CT13 - Cadastrar empresa com dados válidos', async () => {
    await cadastrarEmpresa(driver, baseUrl, massa.empresa);

    expect(await aceitarAlerta(driver)).toBe('Cadastro realizado com sucesso!');
    await esperarUrl(driver, 'pagina-login/login.html');
    expect(await lerDados(driver, 'dbEmpresas')).toEqual([massa.empresaSalva]);
  });
});
