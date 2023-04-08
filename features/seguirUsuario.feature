Feature: seguir usuário
como usuário da plataforma 
Eu gostaria de poder seguir outro usuario para receber notificações e acessar seus conteudos mais facilmente

Scenario: seguindo usuario com notificações ativas
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu nao sigo o usuario "lmm3"
    And Eu estou na página do usuario "lmm3"
    Then Eu devo ver a opção "seguir" para seguir "lmm3"
    When Eu escolho "seguir"
    Then Eu deve continuar na pagina de "lmm3" 
    And Eu devo ver a informação de que eu estou seguindo o usuario

Scenario: deixando de seguir usuario
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu sigo o usuario "lmm3"
    And Eu estou na página do usuario "lmm3"
    Then Eu devo ver a informação "seguindo"
    When Eu escolho parar de seguir
    Then Eu sou perguntado se tenho certeza que desejo parar de seguir o usuario "lmm3"
    When Eu escolho "sim"
    Then Eu deve continuar na pagina de "lmm3" 
    And Eu devo ver a opção de seguir usuario

Scenario: clicando sem querer no botão de deixar de seguir
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu sigo o usuario "lmm3"
    And Eu estou na página do usuario "lmm3"
    Then Eu devo ver a informação "seguindo"
    When Eu escolho parar de seguir
    Then Eu sou perguntado se tenho certeza que desejo parar de seguir o usuario "lmm3"
    When Eu escolho "não"
    Then Eu deve continuar na pagina de "lmm3" 
    And Eu devo continuar vendo o botão de "seguindo"

Scenario: tentando seguir usuario sem estar logado
    Given Eu não estou logado na plataforma
    And Eu estou na página do usuario "lmm3"
    Then Eu devo ver a opção de "seguir"
    When Eu escolho "seguir"
    Then Eu sou avisado de que devo estar logado para seguir um usuario
    And Eu sou redirecionado para a pagina de login

Scenario: tentando seguir a propria conta
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu estou na página do usuario "joaovictorbelo"
    Then Eu não devo ver a opção "seguir"

Scenario: listando meus artistas seguidos
    Given Eu estou logado com o usuario "joaovictorbelo"
    And Eu sigo os usuarios "lmm3" e "mattvie"
    And Eu estou na pagina principal
    Then Eu devo ver a opção de ir para a pagina de "seguindo"
    When Eu escolho ir para a página de "seguindo"
    Then Eu devo ser levado ate a pagina de usuarios seguidos
    And Eu devo ver listado os usuarios "lmm3" e "mattvie"