Feature: View the history
    As an user that clicked at history button
    I can see the history page.

Scenario: As an user, i saw a few podcasts in the "history" page
    Given i logged in as "ramonwanderley"
    And i saw "podciencia", "podpolitica" and "podeconomia"
    When I navigate to the "history" page
    Then I can see 'status' : 200
    And  I can see the the number of podcasts listened
    And I can see "podciencia", "podpolitica" and "podeconomia" in the page.

Scenario: As an user, i can't see any podcasts in the "history" page
    Given i logged in as "romildojuliano"
    And i didn't see any podcast in the plataforma
    When I navigate to the "history" page
    Then I see 'status' : 200
    And I see a message "Ainda não ouviu nenhum podcast".



Feature: View the history filtered by a date
    As an user that clicked at history button
    I choosed a date to use as a filter
    I can see the history page with the podcasts listened before the filter.

Scenario: As an user, i saw a few podcasts filtered in the "history" page
    Given I logged in as "ramonwanderley"
    And I saw "podciencia" and "podpolitica" before the date "2023-03-28"
    When I navigate to the "history" page
    And I choosed "2023-03-28" as a date to use as a filter
    Then I can see 'status' : 200
    And  I can see the the number of podcasts listened before the date
    And I can see "podciencia" and "podpolitica" in the page.

Scenario: As an user, i can't see any podcasts filtered in the "history" page
    Given I logged in as "romildojuliano"
    And i didn't see any podcast before the date "2023-03-28"
    When I navigate to the "history" page
    And I choosed "2023-03-28" as a date to use as a filter
    Then I can see 'status' : 200
    And I see a message "Ainda não ouviu nenhum podcast".
