const { By } = require('selenium-webdriver');
const { abrirNavegador, limparDados, gravarDados, aceitarAlerta } = require('./support/navegador');
const { cadastrarVaga, clicar, titulosVisiveis, esperarUrl } = require('./support/paginas');
const massa = require('./support/massa');

describe('Vagas', () => {
  let navegador, driver, baseUrl;

  beforeAll(async () => {
    navegador = await abrirNavegador();
    ({ driver, baseUrl } = navegador);
  });

  beforeEach(() => limparDados(driver, baseUrl));

  afterAll(() => navegador.fechar());

  test('CT17 - Empresa cadastra vaga e ela aparece na consulta', async () => {
    await gravarDados(driver, massa.sessaoEmpresa);

    await cadastrarVaga(driver, baseUrl, massa.vaga);

    expect(await aceitarAlerta(driver)).toBe('Vaga cadastrada com sucesso!');
    await esperarUrl(driver, 'pagina-vagas/vagas.html');
    expect(await titulosVisiveis(driver, '#vagasContainer .vaga', 'h2')).toEqual([massa.vaga.nome]);
  });

  test('CT18 - Buscar vaga pelo título', async () => {
    await driver.get(`${baseUrl}/pagina-vagas/vagas.html`);

    await driver.findElement(By.id('searchInput')).sendKeys('Marketing');

    expect(await titulosVisiveis(driver, '.vaga', 'h2')).toEqual(['Marketing']);
  });

  test('CT20 - Demonstrar interesse na segunda vaga cadastrada', async () => {
    await gravarDados(driver, {
      vagas: [
        { ...converter(massa.vaga), nome: 'Analista de QA' },
        { ...converter(massa.vaga), nome: 'Desenvolvedor Java' },
      ],
    });
    await driver.get(`${baseUrl}/pagina-vagas/vagas.html`);

    const cadastradas = await driver.findElements(By.css('#vagasContainer .vaga'));
    await clicar(driver, await cadastradas[1].findElement(By.css('.saiba-mais')));
    await clicar(driver, await driver.findElement(By.id('btnInteressar')));
    expect(await aceitarAlerta(driver)).toBe('Você demonstrou interesse na vaga!');
    await clicar(driver, await driver.findElement(By.id('interestedCheckbox')));

    expect(await titulosVisiveis(driver, '.vaga', 'h2')).toEqual(['Desenvolvedor Java']);
  });
});

function converter(vaga) {
  return {
    nome: vaga.nome,
    descricao: vaga.descricao,
    empresa: vaga.cnpj,
    requisitos: vaga.cidade,
    salario: vaga.estado,
    contato: vaga.senha,
    imagemUrl: vaga.imagemUrl,
  };
}
