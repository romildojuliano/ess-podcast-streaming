Feature: seguir usuário
como usuário da plataforma 
Eu gostaria de poder seguir outro usuario para receber notificações e acessar seus conteudos mais facilmente

Scenario: seguindo usuario
Given Eu estou logado com o usuario joseCarlos201
And Eu nao sigo o usuario PedroFinancas
And Eu estou na página do usuario PedroFinancas
Then Eu devo ver a opcao de seguir o usuario
When Eu clico em "seguir"
Then Eu sou perguntado se desejo receber notificações do usuario PedroFinancas
When Eu clico em "sim"
Then Eu deve continuar na pagina de PedroFinancas 
And Eu devo ver a informação de que eu estou seguindo o usuario
And Eu devo ver o usuario PedroFinancas listado nos meus usuarios seguidos
And Eu devo receber notificacoes quando PedroFinancas postar um podcast

Scenario: deixando de seguir usuario
Given Eu estou logado com o usuario joseCarlos201
And Eu sigo o usuario PedroFinancas
And Eu estou na página do usuario PedroFinancas
Then Eu devo ver o botao "seguindo"
When Eu clico em "seguindo"
Then Eu sou perguntado se tenho certeza que desejo parar de seguir o usuario PedroFinancas
When Eu clico em "sim"
Then Eu deve continuar na pagina de PedroFinancas 
And Eu devo ver a opção de seguir usuario
And Eu não devo ver o usuario PedroFinancas na minha lista de usuarios seguidos

Scenario: tentando seguir usuario sem estar logado
Given Eu não estou logado na plataforma
And Eu estou na página do usuario PedroFinancas
Then Eu devo ver o botao "seguir"
When Eu clico em "seguir"
Then Eu sou avisado de que devo estar logado para seguir um usuario
And Eu sou redirecionado para a pagina de login

Scenario: tentando seguir a propria conta