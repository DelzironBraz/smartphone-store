# Teste para Front-End (ReactJS) da Melhor Comunicação

Este repositório é dedicado ao teste técnico para a **Melhor Comunicação**. O desenvolvimento deste teste foi realizado em aproximadamente **6 horas e meia em um dia**. O objetivo principal foi demonstrar as habilidades com ReactJS, integração com APIs e o desenvolvimento de uma interface responsiva e intuitiva.

## Como Rodar o Projeto

Para rodar este projeto em seu ambiente local, siga os seguintes passos:

### 1. Criação do Arquivo `.env`

Para configurar as variáveis de ambiente necessárias, crie um arquivo `.env` na raiz do projeto. Você pode utilizar o arquivo `.env.example` como modelo. Copie as variáveis de ambiente para o seu arquivo `.env` e preencha com os valores apropriados.

> **Importante**: A API da Melhor Comunicação não estava funcionando durante o desenvolvimento, então, para contornar esse problema, foi criado um **ambiente de teste**.

### 2. Configuração do Ambiente de Teste

Para usar os dados mockados no ambiente de teste, defina a variável `VITE_NOTE_ENV` no arquivo `.env` como `test`. Isso fará com que o sistema utilize dados simulados armazenados no **LocalStorage**, proporcionando uma melhor experiência de UI/UX.

### 3. Instalação das Dependências

Com o arquivo `.env` configurado, instale as dependências do projeto utilizando o comando:

```bash
npm install
```
Este comando deve ser executado apenas uma vez para instalar todas as dependências necessárias.

### 4. Inicializando o Projeto
Após a instalação das dependências, inicie o projeto com o seguinte comando:

```bash
npm run dev
```

Isso iniciará o servidor de desenvolvimento, e você poderá acessar o projeto em http://localhost:5173/.

### 5. Integração com a API
Mesmo que a API da Melhor Comunicação não esteja funcionando corretamente, a integração com a API foi implementada e está disponível no diretório services. Isso permite que a estrutura do projeto já esteja pronta para consumir a API assim que ela estiver funcional.