Feature: Podcaster view count display
    As a user of the loged in the system
    I want to see the total of hours a given podcaster have in the total of his episodes

    Scenario: Display the Podcaster ranking
        Given I am at the "Joe Rogan" podcast page
        Then I can see the ranking number of the podcaster among other podcaster in the plataform

    Scenario: Compute the total ammount of visualizations of the podcaster
        Given I am listening to the "Podcast 1" from "Joe Rogan"
        When I click at the "Return" button
        Then The ammount of hours listened to podcasts from "Joe Rogan" is actualized