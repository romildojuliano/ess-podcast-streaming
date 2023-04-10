Feature: Pesquisar Usuário
    Como um usuário da plataforma de Podcast
    Eu quero pesquisar outros usuários.

Scenario: Pesquisa bem sucedida
    Given Estou na página "Search"
    And Os usuários "Lucas", "Ramon" e "Matheus" estão cadastrados na plataforma
    When Eu insiro o valor "Lucas" no campo "Pesquisar Usuários" 
    And Clico no botão "Pesquisar"
    Then Um lista "Resultados da sua pesquisa" é mostrada 
    And Contém o valor "Lucas"

Scenario: Pesquisa mal sucedida
    Given Estou na página "Search"
    And Os usuários "Lucas" e "Ramon" estão cadastrados na plataforma
    When Eu insiro o valor "Matheus" no campo "Pesquisar Usuários" 
    And Clico no botão "Pesquisar"
    Then Uma mensagem "Nenhum Resultado Encontrado" é mostrada

Scenario: Pesquisa utilizando apenas parte do nome do usuário
    Given Estou na página "Search"
    And Os usuários "Lucas Rios", "Lucas Mota" e "Fernando Souza" estão cadastrados na plataforma
    When Eu insiro o valor "Lucas" no campo "Pesquisar Usuários" 
    And Clico no botão "Pesquisar"
    Then Um lista "Resultados da sua pesquisa" é mostrada 
    And Contém os valores "Lucas Rios" e "Lucas Mota"

Scenario: Pesquisar todos os usuários
    Given Estou na página "Search"
    And Os usuários "Lucas", "Ramon" e "Matheus" estão cadastrados na plataforma
    When Eu insiro o valor "" no campo "Pesquisar Usuários" 
    And Clico no botão "Pesquisar"
    Then Um lista "Resultados da sua pesquisa" é mostrada 
    And Contém os valores "Lucas", "Ramon" e "Matheus"
