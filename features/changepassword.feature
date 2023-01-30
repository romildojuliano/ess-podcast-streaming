Feature: change account password
    As a user that owns an account
    I want to change my account password
    so that I can have my account be more secure

    Scenario: successful password change
    Given I am at the "Settings" page
    And my current password is "1234"
    When I select the Change Password option from the menu
    And I write "1234" as my current password
    And I write "4321" as my new password
    Then I can see a confirmation message
    And I'm still at the "Settings" page

    Scenario: unsuccessful password change (wrong password)
    Given I am at the "Settings" page
    And my current password is "1234"
    When I select the Change Password option from the menu
    And I write "5678" as my current password
    And I write "4321" as my new password
    Then I can see an error message
    And I'm still at the "Settings" page

    Scenario: unsuccessful password change (same password)
    Given I am at the "Settings" page
    And my current password is "1234"
    When I select the Change Password option from the menu
    And I write "1234" as my current password
    And I write "1234" as my new password
    Then I can see an error message
    And I'm still at the "Settings" page
    
    Scenario: unsuccessful password change (blank password field)
    Given I am at the "Settings" page
    And my current password is "1234"
    When I select the Change Password option from the menu
    And I write "1234" as my current password
    And I write "" as my new password
    Then I can see an error message
    And I'm still at the "Settings" page