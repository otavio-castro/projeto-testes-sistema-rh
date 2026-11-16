// O jsdom não implementa innerText, usado pelo código do sistema.
Object.defineProperty(window.HTMLElement.prototype, 'innerText', {
  configurable: true,
  get() {
    return this.textContent;
  },
  set(valor) {
    this.textContent = valor;
  },
});

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '';
  window.onload = null;
  window.alert = jest.fn();
});

// O jsdom não navega entre páginas; os redirecionamentos do sistema são ignorados nos testes.
const erroOriginal = console.error;
jest.spyOn(console, 'error').mockImplementation((erro, ...resto) => {
  if (String(erro?.message ?? erro).includes('Not implemented: navigation')) return;
  erroOriginal(erro, ...resto);
});
