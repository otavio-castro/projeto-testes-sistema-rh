const candidato = {
  nome: 'Carla Mendes',
  genero: 'Feminino',
  vaga: 'Analista de Testes',
  escolaridade: 'Superior completo',
  email: 'carla.mendes@email.com',
  senha: 'senha123',
  confirmeSenha: 'senha123',
};

const empresa = {
  nome: 'Tech Minas',
  email: 'rh@techminas.com.br',
  cnpj: '12.345.678/0001-90',
  cidade: 'Belo Horizonte',
  estado: 'MG',
  senha: 'empresa123',
  confirmeSenha: 'empresa123',
};

const vaga = {
  nome: 'Analista de QA',
  descricao: 'Planejar e executar testes de software.',
  cnpj: 'Tech Minas',
  cidade: 'Selenium e Jest',
  estado: 'R$ 4.200',
  senha: 'rh@techminas.com.br',
  imagemUrl: '../imagens/vagas_fotos/default.jpg',
};

const empresaSalva = {
  nome: empresa.nome,
  email: empresa.email,
  cnpj: empresa.cnpj,
  cidade: empresa.cidade,
  estado: empresa.estado,
  senha: empresa.senha,
};

const candidatoSalvo = {
  nome: candidato.nome,
  vaga: candidato.vaga,
  escolaridade: candidato.escolaridade,
  email: candidato.email,
  senha: candidato.senha,
  genero: 'feminino',
};

const sessaoEmpresa = {
  dbEmpresas: [empresaSalva],
  loggedUser: empresaSalva,
  isLoggedIn: 'true',
  userType: 'empresa',
};

module.exports = { candidato, empresa, vaga, empresaSalva, candidatoSalvo, sessaoEmpresa };
