const { carregarPagina } = require('./support/pagina');

function titulosVisiveis() {
  return [...document.querySelectorAll('.vaga')]
    .filter((vaga) => vaga.style.display !== 'none')
    .map((vaga) => vaga.querySelector('h2').textContent);
}

describe('vagas.js', () => {
  beforeEach(() => {
    carregarPagina('pagina-vagas/vagas.html', ['pagina-vagas/vagas.js']);
  });

  test('CT08 - aplicarFiltro mostra apenas vagas que contêm o termo buscado', () => {
    document.getElementById('searchInput').value = 'VENDAS';

    aplicarFiltro();

    expect(titulosVisiveis()).toEqual(['Vendas']);
  });

  test('CT09 - carregarVagas usa a imagem padrão quando a vaga não tem imagem', () => {
    localStorage.setItem('vagas', JSON.stringify([
      { nome: 'Analista de QA', descricao: 'Testes', salario: 'R$ 4.200', contato: 'rh@tech.com', imagemUrl: '' },
    ]));

    carregarVagas();

    const vaga = document.querySelector('#vagasContainer .vaga');
    expect(vaga.querySelector('h2').textContent).toBe('Analista de QA');
    expect(vaga.querySelector('img').getAttribute('src')).toBe('../imagens/vagas_fotos/default.jpg');
  });
});
