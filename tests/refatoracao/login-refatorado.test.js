const path = require('path');
const { carregarPagina, preencher, enviarFormulario } = require('../unit/support/pagina');

const DEPOIS = path.join(__dirname, '..', '..', 'refatoracao', 'depois');
const empresa = { nome: 'Tech Minas', email: 'rh@techminas.com.br', senha: 'empresa123' };
const candidato = { nome: 'Carla Mendes', email: 'carla@email.com', senha: 'senha123' };

describe('Refatoração 1 - realizarLogin / autenticarUsuario', () => {
  beforeEach(() => {
    localStorage.setItem('dbEmpresas', JSON.stringify([empresa]));
    localStorage.setItem('dbCandidatos', JSON.stringify([candidato]));
    carregarPagina('pagina-login/login.html', ['login.js'], { raizScripts: DEPOIS });
  });

  test('identifica empresa e candidato com a mesma função', () => {
    expect(autenticarUsuario(empresa.email, empresa.senha)).toBe('empresa');
    expect(autenticarUsuario(candidato.email, candidato.senha)).toBe('candidato');
    expect(autenticarUsuario(empresa.email, 'errada')).toBeNull();
  });

  test('mantém o comportamento do login pelo formulário', () => {
    preencher({ email: candidato.email, password: candidato.senha });

    enviarFormulario('loginForm');

    expect(window.alert).toHaveBeenCalledWith('Login realizado com sucesso!');
    expect(localStorage.getItem('userType')).toBe('candidato');
    expect(JSON.parse(localStorage.getItem('loggedUser'))).toEqual(candidato);
  });

  test('não sobrescreve o usuário logado quando o e-mail existe nas duas bases', () => {
    localStorage.setItem('dbCandidatos', JSON.stringify([{ ...candidato, email: empresa.email, senha: empresa.senha }]));
    preencher({ email: empresa.email, password: empresa.senha });

    enviarFormulario('loginForm');

    expect(localStorage.getItem('userType')).toBe('empresa');
    expect(JSON.parse(localStorage.getItem('loggedUser'))).toEqual(empresa);
  });
});
