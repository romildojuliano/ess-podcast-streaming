Feature: create new user
	As a potential user that wants to listen to podcasts
	I want to create an account with an username, email,
	password and birthday, having my new account stored
	at the login database

	Scenario: success on new user registration - general
		# Cenário antigo

		# Given the system has no user with username "user01"
		# And the system has no email "user@mail.com"
		# When I try to register with the username "user01" and email "user@mail.com"
		# Then the username "user01" is properly stored in the system
		# And I see a confirmation that my account is created
		# And i am redirected to the personal information page


		Given I am at the "Login Page"
		And   I click at the "Register" button
		Then  the page updates to the "Register Page"
		Given I fill the username field with "user01" that is not contained at the system
		*   	I fill the email field with "user@email.com" that is contained at the system
    *     I fill the password with "R1CbsKa2", which satisfies the passwords conditions
    *     I set the birthday to "13/02/1998", where I am over 18 years 
    And   thus not needing an responsible account
    When  I accept the "Terms of Service"
    And   Click at the "Complete Register" button
    Then  my account is created and I am moved to the "Main Page"
  

  Scenario: failed on new user registration -- invalid email
    Given the following user already exist:
      | username | email            | birthday    |  
      | bola7    | bola7@proton.me  | 03/07/1998  |

    Given I am at the "Login Page"
		And   I click at the "Register" button
		Then  the page updates to the "Register Page"
		Given I fill the username field with "user01" that is not contained at the system
		*   	I fill the email field with "bola7@proton.me" which is contained at the system
    Then  A message shows up saying "Email already used!"
    # This test case works for any unvalid emails, i.e defined with special characters


  Scenario: failed on new user registration -- invalid username
    Given the following user already exist:
      | username | email            | birthday    |  
      | bola7    | bola7@proton.me  | 03/07/1998  |

    Given I am at the "Login Page"
		And   I click at the "Register" button
		Then  the page updates to the "Register Page"
		When I fill the username field with "bola7" which is already contained at the system
    Then  A message shows up saying "User already exists!"
    # This test case works for any unvalid usernames, i.e defined with special characters


  Scenario: failed on new user registration -- invalid password
    Given I am at the "Login Page"
		And   I click at the "Register" button
		Then  the page updates to the "Register Page"
		When I fill the username field with "user01" that is not contained at the system
		*   	I fill the email field with "user@email.com" that is not contained at the system
    *     I fill the password with "abccde", which does not satisfies the passwords conditions
    Then  A message shows up saying "Password needs to be 8 characters long, numbers included!"
    # The case also works for any unvalid passowrd

######################################################################################################
######################################################################################################

Feature: create new user as child
  As a potential user that wants to listen to podcasts
	Bob wants to create an account with an username, email,
	password and birthday, having his new account stored
	at the login database

  Background: 
    Given the user name is "Bob Jr."
    And   his birthday date is "13/02/2017"
    And   his responsible parent has the following credentials storead at database:
      | username    | email                | birthday    |  
      | bobfather   | bobfather@gmail.com  | 03/07/1998  |

  Scenario: success on new user registration -- child
    Given he is at the "Login Page"
    And   click at the "Register" button
    Then  the page updates to the "Register Page"
    Then  he fills the username field with "bobxD" that is not contained at the system
    *     fills the email field with "bobjr@email.com" that is contained at the system
    *     fills the password with "R1CbsKa2", which satisfies the passwords conditions
    *     sets the birthday to "13/02/2017", which makes him under 18 years 
    Then  he is asked to fill the "Responsible Account Email" field
    Then he fills the field with "bobfather@gmail.com", which is a registered user email
    Then  he is able to proceed at the registering
    When  he accepts the "Terms of Service"
    And   Click at the "Complete Register" button
    Then  his account is created and he is moved to the "Main Page"

  Scenario: failed on new user registration -- child -- invalid responsible email
    Given he is at the "Login Page"
    And   click at the "Register" button
    Then  the page updates to the "Register Page"
    Given he fills the username field with "bobxD" that is not contained at the system
    *     fills the email field with "bobjr@email.com" that is contained at the system
    *     fills the password with "R1CbsKa2", which satisfies the passwords conditions
    *     and sets the birthday to "13/02/2017", which makes him over 18 years 
    Then  he is asked to fill the "Responsible Account Email" field
    When he fills the field with "invalid@email.com", which is an unvalid email
    Then  A message shows up saying "Email not registered"

	# Scenario: I try to register with an invalid password
	# 	Given that i tried to register with the password "qwerty"
	# 	And passwords must contain at least 8 characters and a number
	# 	Then the account should not be created
	# 	And i should see an alert that the password must be stronger

	# //cenario de falha 1
	# //cenario de falha 2

	# Scenario: add user photo
	# 	Given that i am in the personal information page
	# 	And upload a valid format picture from my device
	# 	And i save the information
	# 	Then the picture should be saved on my account in the database
	# 	And i should see the validation that the picture was accepted
	# 	And i should be redirected to the conclusion page
