const { carregarPagina, preencher, enviarFormulario } = require('./support/pagina');

describe('cadastro_vaga.js', () => {
  beforeEach(() => {
    carregarPagina('cadastro-vaga/cadastro_vaga.html', ['cadastro-vaga/cadastro_vaga.js']);
  });

  test('CT06 - Requisitos curtos geram mensagem sobre requisitos', () => {
    preencher({
      nome: 'Analista de QA',
      descricao: 'Executar testes',
      cnpj: 'Tech Minas',
      cidade: 'Jest',
      estado: 'R$ 4.200',
      senha: 'rh@techminas.com.br',
      imagemUrl: '',
    });

    enviarFormulario();

    expect(window.alert).toHaveBeenCalledWith('Os requisitos devem ter pelo menos 6 caracteres.');
    expect(localStorage.getItem('vagas')).toBeNull();
  });
});
