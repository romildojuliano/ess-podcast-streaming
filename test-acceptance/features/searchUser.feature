Feature: Pesquisar Usuário
    Como um usuário da plataforma de Podcast
    Eu quero pesquisar outros usuários.

Scenario: Pesquisa bem sucedida
    Given Estou na página "Home"
    Given Os usuários "ramonwanderley", "romildojuliano", "mattvie", "lmm3", "lmm4", "joaovictorbelo", "HACardoso" e "LuanCavalcanti07" estão cadastrados na plataforma
    When Eu insiro o valor "ramonwanderley" no campo "Pesquisar Usuários" 
    When Clico no botão "Pesquisar"
    Then Um lista "Resultados da sua pesquisa" é mostrada 
    Then Contém o valor "ramonwanderley"

Scenario: Pesquisa mal sucedida
    Given Estou na página "Home"
    Given Os usuários "ramonwanderley", "romildojuliano", "mattvie", "lmm3", "lmm4", "joaovictorbelo", "HACardoso" e "LuanCavalcanti07" estão cadastrados na plataforma
    When Eu insiro o valor "Jacob" no campo "Pesquisar Usuários" 
    When Clico no botão "Pesquisar"
    Then Uma mensagem "Nenhum Resultado Encontrado" é mostrada

Scenario: Pesquisa utilizando apenas parte do nome do usuário
    Given Estou na página "Home"
    Given Os usuários "ramonwanderley", "romildojuliano", "mattvie", "lmm3", "lmm4", "joaovictorbelo", "HACardoso" e "LuanCavalcanti07" estão cadastrados na plataforma
    When Eu insiro o valor "lmm" no campo "Pesquisar Usuários" 
    When Clico no botão "Pesquisar"
    Then Um lista "Resultados da sua pesquisa" é mostrada 
    Then Contém os valores "lmm3" e "lmm4"

Scenario: Pesquisar todos os usuários
    Given Estou na página "Home"
    Given Os usuários "ramonwanderley", "romildojuliano", "mattvie", "lmm3", "lmm4", "joaovictorbelo", "HACardoso" e "LuanCavalcanti07" estão cadastrados na plataforma
    When Eu insiro o valor "" no campo "Pesquisar Usuários" 
    When Clico no botão "Pesquisar"
    Then Um lista "Resultados da sua pesquisa" é mostrada 
    Then Contém os valores "ramonwanderley", "romildojuliano", "mattvie", "lmm3", "lmm4", "joaovictorbelo", "HACardoso" e "LuanCavalcanti07"
