/// <reference types="Cypress" />
describe('Running math questions with positive and negative feedback', () => {
	beforeEach(() => {
		cy.interceptors()
	})
	it('It navigates to copilot and checks the landing page and asks questions', () => {
		cy.goToCopilotAndCheckLandingMinimum()
		cy.selectTone('Precise')
		cy.checkToolbarElementsVisibility()
		cy.fixture('Q&AMath.json').then(questions => {
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
