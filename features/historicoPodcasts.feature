Feature: Which podcasts the user listened
	As a user loged in the system
	I want to see all the podcasts i listened

	Scenario: Display a list of podcasts
	Given I am at the any page
	When I click at "user"
	And I click at "History"
	Then The page refreshes showing only the podcasts listeneds