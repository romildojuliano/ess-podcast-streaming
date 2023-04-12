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


		Given I am at the "LoginPage"
		When   I click at the "Register" button
		When  the page updates to the "RegisterPage"
		When  I fill the username field with "user01" that is not contained at the system
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

		