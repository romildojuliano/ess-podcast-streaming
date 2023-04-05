Feature: Podcast subject grouping
    As a user loged in the system
    I want to have acess to podcasts related to the topic of interest

    Scenario: Podcasts Listing
        Given I am at the "Podcast" menu of the "Music Stream App"
        Then The podcasts are displayed by topic
        And A button "see all" is displayed at each topic
    
    Scenario: Acess Podcasts by subject
        Given I am at the "Podcasts" menu
        When I select the "see all" button of the "Finances" type podcasts
        Then I am redirectet to the "Finances" podcasts menu
    
    Scenario: Podcast Insertion in subject group
        Given I am a podcaster loged in the system
        When I upload the podcast "The 2023 FED interest rate" whit the tag of subject "Finance"
        Then The podcast "The 2024 FED interest rate" is propperly inserted at the list of podcasts with subject "Finance"
    
    Scenario: Podcast Deletion from subject group
        Given I am a podcaster loged in the system
        When I delete the podcast "The 2023 stock market" with the tag of subject "Finance"
        Then The podcast "The 2023 stock market" is propperly deleted from the list of podcasts with subject "Finance"