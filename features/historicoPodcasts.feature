Feature: Which podcasts the user listened
	As a user loged in the system
	I want to see all the podcasts i listened

	Scenario: Display a list of podcasts
	Given I am at the any page
	When I click at "user"
	And I click at "History"
	Then I am redirected to the user's "my history" page
	And I see the podcasts heard by the user
	And I am able to listen to podcasts heard by the user

	Scenario: View another user's history
	Given I'm on another user's profile
	When I select the "History"
	Then I am redirected to the target user's "my history" page
	And I see the podcasts heard by the target user
	And I am able to listen to podcasts heard by the target user

	Scenario: Back to the previous page
	Given I'm in the "History" page
	When I click at "previous" button
	Then I go back to the previous page

