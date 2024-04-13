/// <reference types="Cypress" />
describe('Running Questions with stopping the answer and changing the subject', () => {
	beforeEach(() => {
		cy.interceptors()
	})
	it('It navigates to copilot and checks the landing page and asks changing subject questions', () => {
		cy.goToCopilotAndCheckLandingMinimum()
		cy.selectTone('Precise')
		cy.checkToolbarElementsVisibility()
		cy.fixture('changingSubject.json').then(questions => {
			questions.forEach((qaPair, index) => {
				cy.askQuestion(qaPair.question, true)
				cy.checkAnswer(qaPair.answer).then(() => {
					index == 0
						? cy.acceptTerms()
						: index < 3
							? cy.checkAnswersCounterNotDisplayed()
							: index > 3
								? cy.checkNotificationNotDisplayed()
								: cy.log('they fixed this')
				})
			})
		})
	})
})
