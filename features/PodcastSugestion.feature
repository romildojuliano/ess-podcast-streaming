Feature: Topic recomendation
    As a user of the "Music Stream" system
    I wnat to recieve recmoendations of podcasts based on personal tastes and other users visualizations

    Scenario: Acessing podcast tastes on the user profile
        Given I am a user properly loged in the system
        And I am at the "Main" menu of the "Music Stream" system
        When I click at "Podcast Preferences" at the "My Profile" button
        Then I am redirected to the "Podcast Preferences" page

    Scenario: Choosing podcast preferences
        Given I am at the "Podcast Preferences" menu
        When I choose the "Finances" topic from the listened
        And I press the "Confirm Preferences" button
        Then The topic "Finances" is propperly registred as a topic of preferences
        And I am redirected to the "Main" menu

    Scenario: Recomendation based on taste Playlist
        Given I am a user on the "Main" menu
        Then I can see a playlist made by the "Music Stream" with recomended podcasts based on my personal taste
    
    Scenario: Recomendation based on other users Playlist
        Given I am a user on the "Main" menu
        Then I can see a playlist made by the "Music Stream" with recomended podcasts