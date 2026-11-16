const { carregarPagina, dispararCarregamento, preencher, enviarFormulario } = require('./support/pagina');

const valido = {
  nome: 'Carla Mendes',
  genero: 'feminino',
  vaga: 'Analista de Testes',
  escolaridade: 'Superior completo',
  email: 'carla@email.com',
  senha: 'senha123',
  confirmeSenha: 'senha123',
};

describe('candidato.js', () => {
  beforeEach(() => {
    carregarPagina('pagina-cadastro-candidato/candidato.html', ['pagina-cadastro-candidato/candidato.js']);
    dispararCarregamento();
  });

  test('CT04 - Recusa e-mail sem domínio no cadastro de candidato', () => {
    preencher({ ...valido, email: 'carla@email' });

    enviarFormulario();

    expect(window.alert).toHaveBeenCalledWith('Por favor, insira um email válido.');
    expect(localStorage.getItem('dbCandidatos')).toBeNull();
  });

  test('CT05 - Recusa nome com menos de 4 caracteres', () => {
    preencher({ ...valido, nome: 'Ana' });

    enviarFormulario();

    expect(window.alert).toHaveBeenCalledWith('O nome deve ter pelo menos 4 caracteres.');
    expect(localStorage.getItem('dbCandidatos')).toBeNull();
  });
});
