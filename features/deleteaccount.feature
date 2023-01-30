Feature: delete account
    As a user that owns an account
    I want to delete my account
    so that I can stop using the app services

    Scenario: successful account deletion
    Given I am at the "Settings" page
    And my current password is "1234"
    When I select the Delete Account option from the menu
    And I write "1234" as my current password
    Then I can see a good bye message
    And I'm now at the "Home" page

    Scenario: unsuccessful account deletion
    Given I am at the "Settings" page
    And my current password is "1234"
    When I select the Delete Account option from the menu
    And I write "5678" as my current password
    Then I can see an error message
    And I'm still at the "Settings" page