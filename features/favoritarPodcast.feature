Feature: Favoritar Podcast
Como um usuário da plataforma
Eu quero favoritar meus podcasts favoritos e acompanhar.


Scenario: Favoritar podcast
Given eu estou logado como "Ramon Wanderley"
And estou página do podcast "Requisitos"
And em favoritos tenho o podcast "GIT"
When eu favoritar o podcast "Requisitos"
Then aparecerá um alerta "Favoritado com sucesso"
And salvará no sistema "Requisitos" nos favoritos de "Ramon Wanderley"
And o simbolo de favorito aparecerá.

Scenario: Listar favoritos
Given eu estou logado como "Ramon Wanderley"
And em favoritos tenho os podcasts "GIT", "Requisitos"
When eu navegar para página "favoritos"
Then aparecerá os podcasts "GIT", "Requisitos".

Scenario: Nada favoritado
Given eu estou logado como "Ramon Wanderley"
And em favoritos  tenho "0" podcasts 
When eu navegar para página "favoritos"
Then aparecerá a mensagem "Nenhum podcast em favoritos".

Scenario: Desfavoritar podcast
Given eu estou logado como "Ramon Wanderley"
And estou página do podcast "GIT"
And em favoritos o podcast "GIT"
When eu favoritar o podcast "GIT"
Then aparecerá um alerta "Desfavoritado"
And apagará no sistema "GIT" nos favoritos de "Ramon Wanderley"
And o simbolo de favorito desaparecerá.
