# Pequeno e-commerce

## :page_with_curl: Ídice:
  - [Descrição do projeto:](#memo-descrição-do-projeto)
  - [Funcionalidades:](#gear-funcionalidades)
  - [Bibliotecas utilizadas:](#file_folder-bibliotecas-utilizadas)
  -  [Banco de dados:](#floppy_disk-banco-de-dados)
  - [Como executar:](#arrow_forward-como-executar)

## :memo: Descrição do projeto:

Este projeto foi um desafio proposto no bootcamp GoStack da Rockseat utilizando Node.js.

Essa será uma aplicação que deve permitir a criação de clientes, produtos e pedidos, onde o cliente pode gerar novos pedidos de compra de certos produtos, como um pequeno e-commerce.

A idéia deste desafio é praticar relacionamentos ManyToMany com TypeORM.

## :gear: Funcionalidades:

- [X] Criar pedido.
- [X] Listar pedidos.
- [X] Atulizar a quantidade dos produtos quando criar pedido.
- [X] Criar produto.
- [X] Criar cliente.
## :file_folder: Bibliotecas utilizadas:
- cors.
- express.
- pg.
- typeorm.
- bcryptjs.
- cross-env.
- tsyringe.
- express-async-errors.
## :floppy_disk: Banco de dados:
- postgreSQL.
## :arrow_forward: Como executar:
No terminal clone o projeto.
```
git clone https://github.com/marcosrib/desafio-typeorm-relations-gostack.git
```
Entre na pasta do projeto e instale as dependências executando.
```
yarn ou npm install
```
Para rodar o projeto execute.

```
yarn dev:server
```

