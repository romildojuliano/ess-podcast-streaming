Feature: seguir usuário
como usuário da plataforma 
Eu gostaria de poder seguir outro usuario para receber notificações e acessar seus conteudos mais facilmente

Scenario: seguindo usuario
    Given Eu estou na página do usuario "lmm3"
    And Eu estou logado com o usuario "joaovictorbelo"
    And Eu nao sigo o usuario "lmm3"
    Then Eu devo ver a opção "SEGUIR" para seguir o usuario
    When Eu escolho "SEGUIR"
    Then Eu devo continuar na pagina de "lmm3"
    And Eu devo ver a informação de que eu estou "SEGUINDO" o usuario

Scenario: clicando sem querer no botão de deixar de seguir
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu sigo o usuario "lmm3"
    And Eu estou na página do usuario "lmm3"
    Then Eu devo ver a informação de que eu estou "SEGUINDO" o usuario
    When Eu escolho parar de seguir
    Then Eu sou perguntado se tenho certeza que desejo parar de seguir o usuario
    When Eu escolho cancelar
    Then Eu devo continuar na pagina de "lmm3" 
    And Eu devo ver a informação de que eu estou "SEGUINDO" o usuario

Scenario: deixando de seguir usuario
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu sigo o usuario "lmm3"
    And Eu estou na página do usuario "lmm3"
    Then Eu devo ver a informação de que eu estou "SEGUINDO" o usuario
    When Eu escolho parar de seguir
    Then Eu sou perguntado se tenho certeza que desejo parar de seguir o usuario
    When Eu escolho prosseguir
    Then Eu devo continuar na pagina de "lmm3" 
    And Eu devo ver a opção "SEGUIR" para seguir o usuario

Scenario: tentando seguir a propria conta
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu estou na página do usuario "joaovictorbelo"
    Then Eu não devo ver a opção "SEGUIR"

Scenario: listando meus artistas seguidos
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu sigo apenas os usuarios "lmm3" e "mattvie"
    Then Eu devo ver a opção de ir para a pagina de "Seguindo"
    When Eu escolho ir para a página de "Seguindo"
    Then Eu devo ser levado ate a pagina de usuarios seguidos
    And Eu devo ver listado os usuarios "lmm3" e "mattvie"