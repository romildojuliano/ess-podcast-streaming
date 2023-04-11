Feature: add podcast
    As an user that creates content for the app
    I want to publish my podcast to the public
    so that my viewers can consume it ASAP

    Scenario: add new podcast
        Given I am at the "Channel management" page
        And I see no "Podcast 99" file in the list of existing podcasts
        When I select the Upload option on the menu
        And I write the name of the file "Podcast 99"
        And I select the subject "Politics"
        And I write the link to "Podcast 99"
        And I click the Submit button
        Then I can see a confirmation message
        And I'm still at the "Channel management" page
        And I can see "Podcast 99" file in the list of existing podcasts

    Scenario: add duplicated podcast
        Given I am at the "Channel management" page
        And I see "Podcast 99" file in the list of existing podcasts
        When I select the Upload option on the menu
        And I select the file "Podcast 99"
        Then I can see an error message
        And I'm still at the "Channel management" page