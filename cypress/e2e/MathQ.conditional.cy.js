/// <reference types="Cypress" />
describe('Running math questions with conditional statements based on Name', () => {
	beforeEach(() => {
		cy.interceptors()
	})
	it('It navigates to copilot and checks the landing page and asks questions that should yeld result based on conditions', () => {
		cy.goToCopilotAndCheckLandingMinimum()
		cy.selectTone('Precise')
		cy.checkToolbarElementsVisibility()
		cy.fixture('Q&AMath.conditional.json').then(questions => {
			questions.forEach((questionAnswer, index) => {
				cy.askQuestion(questionAnswer.question)
				cy.checkAnswer(questionAnswer.answer).then(() => {
					index == 0 ? cy.acceptTerms() : cy.checkAnswersCounter(index + 1)
				})
			})
		})
		cy.getNotificationWarning()
			.should('be.visible')
			.and('contain.text', `You've reached the conversation limit for today.`)
	})
})
