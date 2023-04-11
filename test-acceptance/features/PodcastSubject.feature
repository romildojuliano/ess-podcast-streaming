Feature: Podcast subject grouping
    As a user loged in the system
    I want to have acess to podcasts related to the topic of interest

    Scenario: Podcasts Listing
        Given I am at the "Explore" menu of the "Podshare" app
        Then I get redirected to the "Explore" menu
        Then The podcasts are displayed by topic
        Then A button "see all" is displayed at each topic
    
    Scenario: Acess Podcasts by subject
        Given I am at the "Podcasts" menu
        When I select the "see all" button of the "Politics" type podcasts
        Then I am redirectet to the "Politics" podcasts menu
 
    Scenario: Podcast Insertion in subject group
        Given I am a podcaster loged in the system with five podcasts registered with "Politics" subject
        When I upload the podcast "Brazilian Elections" whit the tag of subject "Politics"
        Then The podcast "Brazilian Elections" is propperly inserted at the list of podcasts with subject "Politics" having the system six podcasts with "Politics" subject

    Scenario: Podcast Deletion from subject group
        Given I am a podcaster loged in the system with six podcasts registered with "Politics" subject
        When I delete the podcast "Brazilian Elections" with the tag of subject "Politics"
        Then The podcast "Brazilian Elections" is propperly deleted from the list of podcasts with subject "Politics" having the system five podcasts with "Politics" subject