Feature: seguir usuário
como usuário da plataforma 
Eu gostaria de poder seguir outro usuario para receber notificações e acessar seus conteudos mais facilmente

Scenario: seguindo usuario com notificações ativas
    Given Eu estou logado com o usuario "joseCarlos201"
    And Eu nao sigo o usuario "PedroFinancas"
    And Eu estou na página do usuario "PedroFinancas"
    Then Eu devo ver o botão "seguir" para seguir "PedroFinancas"
    When Eu clico em "seguir"
    Then Eu sou perguntado se desejo receber notificações do usuario "PedroFinancas"
    When Eu clico em "sim"
    Then Eu deve continuar na pagina de "PedroFinancas" 
    And Eu devo ver a informação de que eu estou seguindo o usuario
    And O numero de seguidores de "PedroFinancas" deverá ser atualizado

Scenario: deixando de seguir usuario
    Given Eu estou logado com o usuario "joseCarlos201"
    And Eu sigo o usuario "PedroFinancas"
    And Eu estou na página do usuario "PedroFinancas"
    Then Eu devo ver o botao "seguindo"
    When Eu clico em "seguindo"
    Then Eu sou perguntado se tenho certeza que desejo parar de seguir o usuario "PedroFinancas"
    When Eu clico em "sim"
    Then Eu deve continuar na pagina de "PedroFinancas" 
    And Eu devo ver a opção de seguir usuario
    And Eu não devo ver o usuario "PedroFinancas" na minha lista de usuarios seguidos
    And O numero de seguidores de "PedroFinancas" deverá ser atualizado

Scenario: clicando sem querer no botão de deixar de seguir
    Given Eu estou logado com o usuario "joseCarlos201"
    And Eu sigo o usuario "PedroFinancas"
    And Eu estou na página do usuario "PedroFinancas"
    Then Eu devo ver o botao "seguindo"
    When Eu clico em "seguindo"
    Then Eu sou perguntado se tenho certeza que desejo parar de seguir o usuario "PedroFinancas"
    When Eu clico em "não"
    Then Eu deve continuar na pagina de "PedroFinancas" 
    And Eu devo continuar vendo o botão de "seguindo"

Scenario: tentando seguir usuario sem estar logado
    Given Eu não estou logado na plataforma
    And Eu estou na página do usuario "PedroFinancas"
    Then Eu devo ver o botao "seguir"
    When Eu clico em "seguir"
    Then Eu sou avisado de que devo estar logado para seguir um usuario
    And Eu sou redirecionado para a pagina de login

Scenario: tentando seguir a propria conta
    Given Eu estou logado com o usuario "joseCarlos201"
    And Eu estou na página do usuario "joseCarlos201"
    Then Eu não devo ser capaz de clicar no botão de "seguir"

Scenario: listando meus artistas seguidos
    Given Eu estou logado com o usuario "joseCarlos201"
    And Eu sigo os usuarios "PedroFinancas", "InglesComPablo" e "Joca09"
    And Eu estou na pagina principal
    Then Eu devo ver a opção de clicar no botão "seguindo"
    When Eu clico no botão "seguindo"
    Then Eu devo ser levado ate a pagina de usuarios seguidos
    And Eu devo ver listado os usuarios "PedroFinancas", "InglesComPablo" e "joca09"