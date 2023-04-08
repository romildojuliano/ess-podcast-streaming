Feature: Podcast subject grouping
    As a user loged in the system
    I want to have acess to podcasts related to the topic of interest

    Scenario: Podcasts Listing
        Given I am at the "Home" menu of the "Podshare"
        When I click at the "Explore" button
        Then I get redirected to the "Explore" menu
        Then The podcasts are displayed by topic
        Then A button "see all" is displayed at each topic
    
    Scenario: Acess Podcasts by subject
        Given I am at the "Podcasts" menu
        When I select the "see all" button of the "Finances" type podcasts
        Then I am redirectet to the "Finances" podcasts menu
 