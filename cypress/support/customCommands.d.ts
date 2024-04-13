declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * @example
		 * cy.getSearchElement()
		 * Retrieves the search element on the page.
		 */
		getSearchElement(): Chainable<any>

		/**
		 * @example
		 * cy.getChatElement()
		 * Retrieves the chat element on the page.
		 */
		getChatElement(): Chainable<any>

		/**
		 * @example
		 * cy.getSidePanelCommonSelector()
		 * Retrieves the common selector for the side panel on the page.
		 */
		getSidePanelCommonSelector(): Chainable<any>

		/**
		 * @example
		 * cy.selectTone('Balanced')
		 * Clicks on the tone button to select the specified tone.
		 * Options available: 'Creative', 'Balanced', 'Precise'
		 */
		selectTone(tone: string): Chainable<any>

		/**
		 * @example
		 * cy.getChatPannelCommonSelector()
		 * Retrieves the common selector for the chat panel on the page.
		 */
		getChatPannelCommonSelector(): Chainable<any>

		/**
		 * @example
		 * cy.getChatContentCommonSelector()
		 * Retrieves the common selector for the chat content on the page.
		 */
		getChatContentCommonSelector(): Chainable<any>

		/**
		 * @example
		 * cy.getNotificationWarning()
		 * Retrieves the notification warning element on the page.
		 */
		getNotificationWarning(): Chainable<any>

		/**
		 * @example
		 * cy.interceptors()
		 * Executes interceptors for the page.
		 */
		interceptors(): Chainable<any>

		/**
		 * @example
		 * cy.goToCopilotAndCheckLandingMinimum()
		 * Navigates to the copilot page and checks the minimum landing requirements.
		 */
		goToCopilotAndCheckLandingMinimum(): Chainable<any>

		/**
		 * @example
		 * cy.checkToolbarElementsVisibility()
		 * Checks the visibility of toolbar elements on the page.
		 */
		checkToolbarElementsVisibility(): Chainable<any>

		/**
		 * @example
		 * cy.checkPersonas()
		 * Checks the personas on the page.
		 */
		checkPersonas(): Chainable<any>

		/**
		 * @example
		 * cy.askQuestion('Question text')
		 * Sends a question to the chat with the specified text.
		 * Using the true/false bool you can break the answer in order to ask another question before finishing the answer
		 */
		askQuestion(question: string, breakAnswer: bool): Chainable<any>

		/**
		 * @example
		 * cy.acceptTerms()
		 * Accepts the terms on the page.
		 */
		acceptTerms(): Chainable<any>

		/**
		 * @example
		 * cy.checkAnswer('Expected Answer')
		 * Checks if the provided answer matches the expected answer in the chat.
		 */
		checkAnswer(answer: string): Chainable<any>

		/**
		 * @example
		 * cy.checkAnswersCounter(3)
		 * Checks the answers counter against the specified value.
		 */
		checkAnswersCounter(counter: number): Chainable<any>

		/**
		 * @example
		 * cy.stopRespondingButton()
		 * Retrieves the stop responding button element on the page.
		 */
		stopRespondingButton(): Chainable<any>
	}
}
