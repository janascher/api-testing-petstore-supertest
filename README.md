<div  align="center">
	<h1>
		📡 Teste de API com SuperTest
	</h1>
</div>

## 🧐 Descrição

Este repositório contém testes automatizados desenvolvidos durante o curso "Formação em Teste de Software" da [Iterasys](https://iterasys.com.br/pt), ministrado pelo professor José Correia. O objetivo do projeto é aplicar testes automatizados utilizando SuperTest para validar a API de treinamento [PetStore](https://petstore.swagger.io/#/).

## 📚 Aprendizados

Durante as aulas, foram abordados os seguintes tópicos:

- Configuração e uso do SuperTest para testes de API.
- Implementação de testes automatizados utilizando Jest.
- Boas práticas de organização de testes.

## 🚀 Funcionalidades Testadas

Os seguintes endpoints da API PetStore foram testados:

- **POST /pet** - Cadastro de um novo pet
- **GET /pet/{petId}** - Consulta de um pet por ID
- **PUT /pet** - Atualização de um pet
- **DELETE /pet/{petId}** - Exclusão de um pet

## 📚 Tecnologias Utilizadas

- **IDE:** VS Code
- **Linguagem:** JavaScript (Node.js)
- **Framework de Teste:** Jest
- **Biblioteca para Testes de API:** SuperTest
- **Gerenciador de Pacotes:** npm

## ⚙️ Configuração do Ambiente

### Iniciando do Zero

#### Definir a versão do Node.js (caso necessário)

Certifique-se de que você está usando a versão correta do Node.js. Caso necessário, use o NVM para definir a versão:

```sh
nvm use 22.14.0
```

Alternativamente, crie um arquivo `.nvmrc` na raiz do projeto para especificar a versão do Node.js:

```sh
echo "22.14.0" > .nvmrc
```

#### Instalar Dependências

Instale o SuperTest e o Jest utilizando o comando abaixo:

```sh
npm install supertest jest --save-dev
```

> **Nota: O `--save-dev` adiciona as dependências às `devDependencies`, indicando que são necessárias apenas durante o desenvolvimento. No entanto, durante as aulas, o comando `npm i supertest jest` foi utilizado pelo professor.**

### Clonando o Repositório

#### Definir a versão do Node.js (caso necessário)

Certifique-se de que você está usando a versão correta do Node.js. Caso necessário, use o NVM para definir a versão:

```sh
nvm use 22.14.0
```

Alternativamente, crie um arquivo `.nvmrc` na raiz do projeto para especificar a versão do Node.js:

```sh
echo "22.14.0" > .nvmrc
```

#### Instalar Dependências

Execute o seguinte comando para instalar todas as dependências necessárias:

```sh
npm install
```

### 🧪 Execução dos Testes

Para executar os testes automatizados, utilize os seguintes comandos:

- **Execução Padrão:**

```sh
npm test
```

- **Execução Sequencial:**

```sh
npm run test:sequential
```

## 📜 Notas sobre Implementação

Durante a implementação dos testes, algumas abordagens foram ajustadas em relação ao que foi demonstrado em aula:

- **Scripts de Teste:** em vez de executar os testes com `npx jest`, foi adicionado um script no `package.json`:

  ```json
  "scripts": {
    "test": "jest",
    "test:sequential": "jest --runInBand"
  }
  ```

  > **Nota: O script `test:sequential` executa os testes em sequência usando `--runInBand`, útil para evitar problemas de paralelismo.**

- **Uso de `async` e `await`:** durante a aula, o professor demonstrou o uso de `then()` para lidar com requisições nos testes. No entanto, adotei o `async` e `await`, pois:
  - Melhora a legibilidade do código.
  - Resolve problemas com valores indefinidos nos testes.
  - Garante que cada chamada assíncrona seja aguardada antes de proceder com as validações.
  - Está alinhado às práticas de desenvolvimento em JavaScript.

## 🦸🏻‍♀️ Autor

<div align="center">
  <a href="https://github.com/janascher">
    <img src="https://avatars.githubusercontent.com/u/79182711?v=4" width="150px;" alt="Janaína Scher" style="border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
    <br />
    <sub>
      <b>Janaína Scher</b> 👩🏻‍💻
    </sub>
    <br />
    <i>Profissional em Teste de Software e Garantia da Qualidade (QA)</i>
  </a>
</div>
