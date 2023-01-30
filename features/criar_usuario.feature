Feature: create new user
  As a potential user that wants to listen to podcasts
  I want to create an account with an username, email and password
  and where i can set my interests
  
  Scenario: new user registration
    Given the system has no user with username "user01" 
    And the system has no email "user@mail.com"
    When I try to register with the username "user01" and email "user@mail.com"
    Then the username "user01" is properly stored in the system
    And I see a confirmation that my account is created
    And i am redirected to the personal information page

  Scenario: I try to register with an invalid password
    Given that i tried to register with the password "qwerty"
    And passwords must contain at least 8 characters and a number
    Then the account should not be created 
    And i should see an alert that the password must be stronger

    //cenario de falha 1
    //cenario de falha 2

  Scenario: add user photo
    Given that i am in the personal information page
    And upload a valid format picture from my device
    Then the picture should be saved on my account in the database