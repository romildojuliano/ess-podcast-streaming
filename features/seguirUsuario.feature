Feature: seguir usuário
como usuário da plataforma 
Eu gostaria de poder seguir outro usuario para receber notificações e acessar seus conteudos mais facilmente

Scenario: seguindo usuario ativando notificações 
Given Eu estou logado com o usuario joseCarlos201
And Eu nao sigo o usuario PedroFinancas
And Eu estou na página do usuario PedroFinancas
Then Eu devo ver a opcao de seguir o usuario
When Eu clico em "seguir"
Then Eu sou perguntado se desejo receber notificações do usuario PedroFinancas
When Eu clico em "sim"
Then Eu deve continuar na pagina de PedroFinancas 
And Eu devo ver a informação de que eu estou seguindo o usuario 
And Eu devo receber notificacoes quando PedroFinancas postar um podcast