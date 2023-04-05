Feature: Podcast view count diplay
    As a user loged in the system
    I want to see the ammount of viusalizations a given podcast have recieved

    Scenario: Display podcast viusalizations
        Given I am at the "Joe Rogan" podcast page
        When I see the "Podcast 1" icon at the screen
        Then The ammount of hours listened to that podcast is displayed
    
    Scenario: Computing the tototal ammount of visualization hours of the podcast
        Given I am listening the "Podcast 1" from "Joe Rogan"
        When I click at the "Return" button
        Then The ammount of hours listened to the "Podcast 1" is actualized
    
    Scenario: List the most listened podcasts from a podcaster
        Given I am at the menu of the "Joe Rogan" podcaster
        Then I can see the list of the most viewed podcasts from "Joe Rogan"
        And The total of views is displayed by the side of each podcast name
    
    Scenario: Playlist of the most listened podcast in a Month
        Given I am at the "Main" menu of the "Music Stream"
        Then I can see the playlist of the most viewe podcast in the Month
    
