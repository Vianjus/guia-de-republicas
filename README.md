# Guia de Republicas
Traballho prático da Matéria de Engenharia de Softwares 2, no qual a equipe irá criar um projeto e suas issues para organizarmos e desenvolvermos o tema escolhido que é um site mostruário das repúblicas de  Ouro Preto.
* [Project](https://github.com/users/Vianjus/projects/1)
* [Requisitos](https://github.com/Vianjus/guia-de-republicas/edit/main/docs/requisitos.md)
## Integrantes
* [Camila Torres](https://github.com/Camilatda)
* [Estefanio](https://github.com/estefanio-git)
* [Henrique Lauar](https://github.com/henriquelauar)
* [João Pedro Andrade](https://github.com/Jpcarvalhoxx)
* [Paulo Eduardo Armani](https://github.com/pauloearmani)
* [Tiago Mol](https://github.com/tiagoqwert)
* [Vinicius Anjos](https://github.com/Vianjus)

## [Documentação e Relatório do Trabalho](https://github.com/Vianjus/guia-de-republicas/edit/main/docs/Documentação_Guia_de_Repúblicas.pdf)
  
## Instalação

01- Baixar todas as tecnologias (React, Node.js e Postgresql) e instalá-las.\n
02- Clonar o repositório do Github caso tenha o git instalado, caso não tenha, baixar o zip e descompactar.
03- No Postgre, criar o Banco de Dados nomeando de “guia_republicas”.
04- No Postgre, rodar o script “guia_de_republicas_db.sql”, que está no diretório principal, que irá criar todas as tabelas e   relações do banco de dados.
05- Agora dentro do diretório backend\guia_rep, irá criar um arquivo nomeado “.env” com esse código nele, troque “SENHA” pela suas senha criada para o postgresql, caso não tenha inserido as configurações padrões troque também o grupo e a porta de localhost.
  DATABASE_URL=postgresql://postgres:SENHA$@localhost:5432/guia_republicas
  PORT=3001
  JWT_SECRET=a9fd2e1a92ab445f92124f3c56c5b98e5db68a9f81335e7bb843d7ce8fef9cf5
  JWT_EXPIRES_IN=1h
06- Agora irá precisar instalar os módulos do front e back, você dará o código “npm install” em 3 diretórios, no raiz, no backend\guia_rep e no costs. Sempre que o código for atualizado drasticamente o processo é recomendado ser feito novamente.
07- Agora com todos os preparativos iniciais (os processos 1 a 5 são necessários somente a primeira vez no site) os servidores de back e front estão prontos para subir, lembre-se de deixar aberto o pgAdmin do postgresql para o banco rodar.
08- No diretório backend\guia_rep dê o comando no terminal “npm run dev” para rodar o servidor do backend.
09- Já no diretório costs dê o comando em outro terminal “spm start” para rodar o servidor de frontend, caso sucesso, já irá abrir no navegador o site.

10- Pronto, agora você tem o site rodando localmente com o banco de dados, backend e frontend.
