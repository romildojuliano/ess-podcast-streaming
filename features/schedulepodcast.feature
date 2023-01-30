Feature: schedule podcast publishing
    As a user that creates content for the app
    I want to schedule when my podcast will be available to the public
    so that I can have my podcast published without worrying about it being late

    Scenario: schedule new podcast
        Given I am at the "Channel management" page
        And today's timestamp is "Sunday, 29-Jan-23 22:22:51 UTC"
        And I see no "Podcast 99" file in the list of existing podcasts
        When I select the Schedule option on the menu
        And I select the file "Podcast 99"
        And I select the "Monday, 30-Jan-23 22:22:51 UTC" timestamp
        Then I can see a confirmation message
        And I'm still at the "Channel management" page
        And I can see "Podcast 99" file in the list of existing podcasts
        And I can't see "Podcast 99" file in the list of published podcasts

    Scenario: invalid schedule (duplicated podcast)
        Given I am at the "Channel management" page
        And today's timestamp is "Sunday, 29-Jan-23 22:22:51 UTC"
        And I see "Podcast 99" file in the list of existing podcasts
        When I select the Schedule option on the menu
        And I select the file "Podcast 99"
        And I select the "Monday, 30-Jan-23 22:22:51 UTC" timestamp
        Then I can see an error message
        And I'm still at the "Channel management" page

    Scenario: invalid schedule (timestamp already passed)
        Given I am at the "Channel management" page
        And today's timestamp is "Monday, 30-Jan-23 22:22:51 UTC"
        And I see no "Podcast 99" file in the list of existing podcasts
        When I select the Schedule option on the menu
        And I select the file "Podcast 99"
        And I select the "Sunday, 29-Jan-23 22:22:51 UTC" timestamp
        Then I can see an error message
        And I'm still at the "Channel management" page

    Scenario: invalid schedule (timestamp nonexistent)
        Given I am at the "Channel management" page
        And I see no "Podcast 99" file in the list of existing podcasts
        When I select the Schedule option on the menu
        And I select the file "Podcast 99"
        And I select the "Sunday, 30-Jan-23 22:22:51 UTC" timestamp
        Then I can see an error message
        And I'm still at the "Channel management" page