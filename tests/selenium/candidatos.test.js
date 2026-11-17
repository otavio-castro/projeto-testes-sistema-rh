const { By, until } = require('selenium-webdriver');
const { ESPERA, abrirNavegador, limparDados } = require('./support/navegador');
const { titulosVisiveis } = require('./support/paginas');

describe('Consulta de candidatos', () => {
  let navegador, driver, baseUrl;

  beforeAll(async () => {
    navegador = await abrirNavegador();
    ({ driver, baseUrl } = navegador);
  });

  beforeEach(() => limparDados(driver, baseUrl));

  afterAll(() => navegador.fechar());

  test('CT19 - Pesquisar candidato pela vaga procurada', async () => {
    await driver.get(`${baseUrl}/pagina-candidatos/candidatos.html`);
    await driver.wait(until.elementsLocated(By.css('.candidato-card')), ESPERA);

    await driver.findElement(By.id('pesquisaCandidato')).sendKeys('Designer');

    expect(await titulosVisiveis(driver, '.candidato-card', '.card-title')).toEqual(['Maria Oliveira']);
  });
});
