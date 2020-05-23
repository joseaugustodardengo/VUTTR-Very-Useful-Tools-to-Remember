# VUTTR (Very Useful Tools to Remember - Ferramentas muito úteis para lembrar)

A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags

## Requisitos para executar a aplicação

  - [Node.js](https://nodejs.org/)
  - [Docker](https://www.docker.com/)

## Para utilizar o projeto

1) Faça o seguinte [comando](https://yarnpkg.com/getting-started/install) após instalar o node, para executar o projeto com o gerenciador de pacotes [Yarn](https://yarnpkg.com/)
2) Após isso poderá fazer o download do projeto através do zip: https://github.com/joseaugustodardengo/vuttr/archive/master.zip ou então realizando o clone do repositório https://github.com/joseaugustodardengo/vuttr.git
3) Acessar a pasta onde salvou os arquivos e executar o comando abaixo para executar o projeto. Esse comando ira criar a nossa aplicação criando um container da nossa aplicação e um banco de dados Postgres com duas tabelas: uma de usuário e outra de ferramentas.
```sh
docker-compose up
```
ou
```sh
sudo docker-compose up
```

## Rotas da aplicação
* A aplicação executa em http://localhost/3000
* ```/users -> utilizando o método POST nessa rota criará um usuário ```
* ```/sessions -> utilizando o método POST nessa rota irá realizar o login na aplicação, de acordo com os usuários cadastrados e terá como resposta um token para ser utilizado OBRIGATORIAMENTE nas rotas a seguir ```
* ```/users -> utilizando o método PUT nessa rota irá alterar o cadastro do usuário ```
* ```/tools -> utilizando o método POST nessa rota irá criar uma ferramenta ```
* ```/tools -> utilizando o método GET nessa rota irá listar todas as ferramentas ```
* ```/tools?tag=node -> utilizando o método GET nessa rota irá listar todas ferramentas que tem a tag 'node' ```
* ```/tools?q=html -> utilizando o método GET nessa rota irá listar todas as ferramentas que tem 'html' no seu cadastro ```
* ```/tools/1 -> utilizando o método GET nessa rota irá listar a ferramenta de acordo com o id que foi informado```
* ```/tools/1 -> utilizando o método PUT nessa rota irá alterar uma ferramenta de acordo com o id que foi informado```
* ```/tools/1 -> utilizando o método DELETE nessa rota irá excluir a ferramenta de acordo com o id que foi informado```

Para mais informçoes de como utilizar essas rotas e quais parâmetros utilizar, tem a documentação da API, que se encontra dentro da pasta do projeto, no arquivo de **api.apib**

### Tecnologias utilizadas na aplicação
* [Node.js](https://nodejs.org/en/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Sequelize](https://sequelize.org/)
* [Prettier](https://prettier.io/)
* [Express](https://expressjs.com/)
* [ESLint](https://eslint.org/)
* [Nodemon](https://nodemon.io/)
