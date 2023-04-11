Feature: Favoritar Podcast
Como um usuário da plataforma
Eu quero favoritar meus podcasts favoritos e acompanhar.


Scenario: Favoritar podcast
Given eu estou logado como "ramonwanderley"
And estou na página do podcast "Brexit"
And em favoritos tenho o podcast "GIT e GITHUB"
When eu favoritar o podcast "Brexit"
Then aparecerá um alerta "Favoritado com sucesso!"
And salvará no sistema "Brexit" nos favoritos de "ramonwanderley"
And o simbolo de favorito aparecerá.

Scenario: Listar favoritos
Given eu estou logado como "ramonwanderley"
And em favoritos tenho os podcasts "GIT e GITHUB", "Brexit"
When eu navegar para página "favorites"
Then aparecerá os podcasts "GIT e GITHUB", "Brexit".

Scenario: Nada favoritado
Given eu estou logado como "romildojuliano"
And em favoritos tenho "0" podcasts 
When eu navegar para página "favorites"
Then aparecerá a mensagem "Nada ainda em Favoritos".

Scenario: Desfavoritar podcast
Given eu estou logado como "ramonwanderley"
And estou na página do podcast "GIT e GITHUB"
And em favoritos tenho os podcasts "GIT e GITHUB", "Brexit"
When eu favoritar o podcast "GIT e GITHUB"
Then aparecerá um alerta "Desfavoritado com sucesso!"
And apagará no sistema "GIT e GITHUB" nos favoritos de "ramonwanderley"
And o simbolo de favorito desaparecerá.
