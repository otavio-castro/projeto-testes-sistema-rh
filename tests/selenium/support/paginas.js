const { By, until } = require('selenium-webdriver');
const { ESPERA } = require('./navegador');

async function preencher(driver, campos) {
  for (const [id, valor] of Object.entries(campos)) {
    await driver.findElement(By.id(id)).sendKeys(valor);
  }
}

async function cadastrarCandidato(driver, baseUrl, candidato) {
  await driver.get(`${baseUrl}/pagina-cadastro-candidato/candidato.html`);
  await preencher(driver, candidato);
  await driver.findElement(By.id('btn')).click();
}

async function cadastrarEmpresa(driver, baseUrl, empresa) {
  await driver.get(`${baseUrl}/pagina-cadastro-empresa/empresa.html`);
  await preencher(driver, empresa);
  await driver.findElement(By.id('btn')).click();
}

async function cadastrarVaga(driver, baseUrl, vaga) {
  await driver.get(`${baseUrl}/cadastro-vaga/cadastro_vaga.html`);
  await preencher(driver, vaga);
  await driver.findElement(By.id('btn')).click();
}

async function fazerLogin(driver, baseUrl, email, senha) {
  await driver.get(`${baseUrl}/pagina-login/login.html`);
  await preencher(driver, { email, password: senha });
  await driver.findElement(By.css('#loginForm button')).click();
}

async function clicar(driver, elemento) {
  await driver.executeScript('arguments[0].scrollIntoView({ block: "center", behavior: "instant" })', elemento);
  await elemento.click();
}

async function estaVisivel(driver, id) {
  return driver.findElement(By.id(id)).isDisplayed();
}

async function titulosVisiveis(driver, seletorItem, seletorTitulo) {
  const titulos = [];
  for (const item of await driver.findElements(By.css(seletorItem))) {
    if (await item.isDisplayed()) {
      titulos.push(await item.findElement(By.css(seletorTitulo)).getText());
    }
  }
  return titulos;
}

function esperarUrl(driver, trecho) {
  return driver.wait(until.urlContains(trecho), ESPERA);
}

module.exports = {
  cadastrarCandidato,
  cadastrarEmpresa,
  cadastrarVaga,
  fazerLogin,
  clicar,
  estaVisivel,
  titulosVisiveis,
  esperarUrl,
};
