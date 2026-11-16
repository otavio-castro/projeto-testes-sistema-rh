const { carregarPagina } = require('./support/pagina');

const empresa = { nome: 'Tech Minas', email: 'rh@techminas.com.br', senha: 'empresa123' };
const candidato = { nome: 'Carla Mendes', email: 'carla@email.com', senha: 'senha123' };

describe('login.js', () => {
  beforeEach(() => {
    localStorage.setItem('dbEmpresas', JSON.stringify([empresa]));
    localStorage.setItem('dbCandidatos', JSON.stringify([candidato]));
    carregarPagina('pagina-login/login.html', ['pagina-login/login.js']);
  });

  test('CT01 - autenticarLogin aceita empresa cadastrada e salva o usuário logado', () => {
    expect(autenticarLogin(empresa.email, empresa.senha)).toBe(true);
    expect(JSON.parse(localStorage.getItem('loggedUser'))).toEqual(empresa);
  });

  test('CT02 - autenticarLogin recusa senha incorreta', () => {
    expect(autenticarLogin(empresa.email, 'errada')).toBe(false);
    expect(localStorage.getItem('loggedUser')).toBeNull();
  });

  test('CT03 - autenticarLoginCandi aceita candidato cadastrado', () => {
    expect(autenticarLoginCandi(candidato.email, candidato.senha)).toBe(true);
    expect(autenticarLogin(candidato.email, candidato.senha)).toBe(false);
    expect(JSON.parse(localStorage.getItem('loggedUser'))).toEqual(candidato);
  });
});
