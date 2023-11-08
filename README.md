# -- Projeto: AUTH

Autenticação utilizando o módulo passport + NodeJS, Express e MongoDB.

**Acesso online: https://auth-ll4d.onrender.com**

OBS: Pode levar até 30 segundos para carregar devido ao serviço de deploy utilizado.

## 🚀 Funcionamento

* O método de autenticação utilizado é do tipo "local" (módulo passport), salvando o usuário e senha no MongoDB.

OBS: A senha é salva em hash através do módulo bcryptjs.

* A sessão/usuário ativo é salvo e mantido por middleware em app.js através do passport.

Acesso em qualquer tela através da variável global: currentUser


### 🔧 Instalação

Para a instalação, basta abrir o terminal de comando na pasta raiz e executar:
```
npm install
```

Para configurar o banco de dados, crie um arquivo .env na raiz do diretório com conteúdo:
```
# Variáveis de Ambiente, MONGO DB
MONGO_URI = <uri_do_mongo_db>
```

## ⚙️Executar

Para executar o projeto, no terminal, insira o comando:
```
nodemon app.js
```

Após, acesse a URL: **localhost:3000**


## 🛠️ Construído com

* [NodeJS](http://www.dropwizard.io/1.0.2/docs/), [Express](https://expressjs.com/pt-br/), [MongoDB/Mongoose](https://mongoosejs.com/).
* [Passport](https://www.passportjs.org/) - Autenticação.
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Gerar hash de senhas.


## ✒️ Autor

* **Arthur A.** - *Tudo* - [Arthur A.](https://github.com/arthuralbert990)
