# Projeto de Testes – Sistema de RH “Me Contrate”

Trabalho prático da disciplina **Teste e Manutenção de Software** (Sistemas de Informação – PUC Minas).

O sistema testado é o Trabalho Interdisciplinar **Sistema de RH “Me Contrate”** (2024/2):

- Código-fonte original: https://github.com/ICEI-PUC-Minas-PBE-ADS-TI/pbe-si-ads-2024-2-tiaw-t1-sistema-de-rh
- Sistema publicado: https://icei-puc-minas-pbe-ads-ti.github.io/pbe-si-ads-2024-2-tiaw-t1-sistema-de-rh/codigo-fonte/home-page/index.html

A pasta `sistema/` contém uma cópia sem alterações da pasta `codigo-fonte/` do TI, distribuída sob a licença CC BY 4.0 pelos seus autores.

## Integrantes

| Integrante | Responsabilidade |
|---|---|
| Arthur Souza Carvalho | Testes de unidade CT01 a CT05 |
| Gustavo Rodrigues de Almeida | Testes de unidade CT06 a CT10 |
| Marlon Magalhaes Carvalho | Testes Selenium CT11 a CT16 |
| Moises Samuel Rezende Maia | Testes Selenium CT17 a CT20 e refatoração |
| Otavio Nascimento de Castro | Estrutura do projeto, plano de testes e apresentação |
| Sarah Palhares Araujo | Testes manuais CT21 a CT30 e relatório de defeitos |

## Estrutura

```
sistema/              código do TI (alvo dos testes)
tests/unit/           10 testes de unidade (Jest + jsdom)
tests/selenium/       10 testes funcionais automatizados (Selenium WebDriver)
tests/refatoracao/    testes que comprovam o comportamento após a refatoração
refatoracao/antes/    métodos originais
refatoracao/depois/   métodos refatorados
docs/                 plano de testes, testes manuais com prints e apresentação
```

## Como executar

Pré-requisitos: Node.js 18 ou superior e Google Chrome instalado.

```bash
npm install
npm run test:unit          # CT01 a CT10
npm run test:selenium      # CT11 a CT20 (abre o Chrome)
npm run test:refatoracao   # testes das refatorações
npm test                   # tudo
```

A suíte Selenium inicia sozinha um servidor local com o conteúdo de `sistema/`. Para testar a versão publicada, defina `BASE_URL` com o endereço da pasta `codigo-fonte`. Para rodar sem abrir a janela do navegador, defina `HEADLESS=1`.

## Resultado

| Técnica | Casos | Aprovados | Reprovados |
|---|---|---|---|
| Unidade (Jest) | 10 | 8 | 2 (CT06, CT10) |
| Funcionais automatizados (Selenium) | 10 | 9 | 1 (CT20) |
| Funcionais manuais | 10 | 6 | 4 (CT22, CT24, CT26, CT30) |
| **Total** | **30** | **23** | **7** |

Os testes reprovados apontam defeitos reais do TI. A descrição completa dos casos, dos 10 defeitos encontrados e das propostas de solução está em [`docs/plano-de-testes.pdf`](docs/plano-de-testes.pdf).
