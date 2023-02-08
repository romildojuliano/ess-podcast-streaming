Feature: Podcast subject grouping
    As a user loged in the system
    I want to have acess to podcasts related to the topic of interest

    Scenario: Acess Podcasts List
        Given I am at the "Main" menu of the "Music Stream App"
        When I select the  "Poscasts" button
        Then I am redirected to the "Podcasts" menu
    
    Scenario: Acess Podcasts by subject
        Given I am at the "Podcasts" menu
        When I select the "see all" button of the "Finances" type podcasts
        Then I am redirectet to the "Finances" podcasts menu
    
    Scenario: Return to the "Main" menu
        Given I am at the "Podcasts" menu
        When I select the "Return" button
        Then I am redirected to the "Podcasts" menu
    
    Scenario: Podcast Insertion
        Given I am a podcaster loged in the system
        When I upload a podcast whit the tag of subject "Finances"
        Then The podcast is inserted at the list of podcasts with subject "Finances"
