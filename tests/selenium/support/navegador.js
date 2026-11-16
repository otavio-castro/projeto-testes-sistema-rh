const { Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { iniciarServidor } = require('./servidor');

const ESPERA = 10000;

async function abrirNavegador() {
  const opcoes = new chrome.Options().addArguments('--window-size=1366,900');
  if (process.env.HEADLESS === '1') opcoes.addArguments('--headless=new');
  if (process.env.CHROME_ARGS) opcoes.addArguments(...process.env.CHROME_ARGS.split(';'));
  if (process.env.CHROME_BIN) opcoes.setChromeBinaryPath(process.env.CHROME_BIN);

  const servidor = process.env.BASE_URL ? null : await iniciarServidor();
  const baseUrl = (process.env.BASE_URL || servidor.url).replace(/\/$/, '');
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(opcoes).build();

  return {
    driver,
    baseUrl,
    async fechar() {
      await driver.quit();
      if (servidor) await servidor.parar();
    },
  };
}

async function limparDados(driver, baseUrl) {
  await driver.get(`${baseUrl}/home-page/index.html`);
  await driver.executeScript('localStorage.clear()');
}

async function gravarDados(driver, dados) {
  await driver.executeScript((itens) => {
    Object.entries(itens).forEach(([chave, valor]) => {
      localStorage.setItem(chave, typeof valor === 'string' ? valor : JSON.stringify(valor));
    });
  }, dados);
}

function lerDados(driver, chave) {
  return driver.executeScript((nome) => JSON.parse(localStorage.getItem(nome)), chave);
}

async function aceitarAlerta(driver) {
  await driver.wait(until.alertIsPresent(), ESPERA);
  const alerta = await driver.switchTo().alert();
  const texto = await alerta.getText();
  await alerta.accept();
  return texto;
}

module.exports = { ESPERA, abrirNavegador, limparDados, gravarDados, lerDados, aceitarAlerta };
