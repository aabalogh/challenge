/*
This is how i would add all elements 
in order to get a better view of the fails by aliases in the runner
I know that the return statement is redundant 
but is the only way to see the aliases that are used in the runner
*/
Cypress.Commands.add('getSearchElement', () => {
	return cy.get('#b-scopeListItem-web').as('searchButton')
})
Cypress.Commands.add('getChatElement', () => {
	return cy.get('#b-scopeListItem-conv').as('chatButton')
})
Cypress.Commands.add('getSidePanelCommonSelector', () => {
	return cy
		.get('[class="cib-serp-main"]')
		.shadow()
		.find('[id="cib-conversation-main"]')
		.as('sidepanelPartialSellector')
})
Cypress.Commands.add('selectTone', tone => {
	let theTone = tone === undefined ? 'Balanced' : tone
	cy.getSidePanelCommonSelector()
		.shadow()
		.find('cib-welcome-container')
		.shadow()
		.find('cib-tone-selector')
		.shadow()
		.find('#tone-options')
		.contains(`${theTone}`)
		.click()
})
Cypress.Commands.add('getChatPannelCommonSelector', () => {
	return cy
		.get('[class="cib-serp-main"]')
		.shadow()
		.find('[id="cib-action-bar-main"]')
		.as('chatPanelCommonSelector')
})
Cypress.Commands.add('getChatContentCommonSelector', () => {
	cy.get('[class="cib-serp-main"]')
		.shadow()
		.find('[id="cib-conversation-main"]')
		.shadow()
		.find('#cib-chat-main > cib-chat-turn')
		.shadow()
		.find('.response-message-group')
		.as('chatContentCommonSelector')
})

Cypress.Commands.add('getNotificationWarning', () => {
	cy.getSidePanelCommonSelector()
		.shadow()
		.find('cib-notification-container')
		.shadow()
		.find('cib-notification')
		.shadow()
		.find('#inline-notification-text')
		.as('notificationWarning')
})
//and it would continue like that for all elements

Cypress.Commands.add('interceptors', () => {
	cy.intercept('**/notifications/**').as('waitNotifs')
	cy.intercept('GET', '**/UpdateConversation**').as('waitUpdateConversation')
	cy.intercept('**/api/v7/suggestions**').as('waitUpdateConversation')
})
Cypress.Commands.add('goToCopilotAndCheckLandingMinimum', () => {
	cy.visit('')
	cy.get('[id="bnp_btn_accept"]')
		.should('be.visible')
		.click()
		.then(() => {
			cy.wait('@waitNotifs')
		})
	cy.get('[data-h="ID=HpApp,7818.1"]').click()
	cy.get('[class="b_wlcmName"]').should('have.text', 'Copilot')
	cy.get('[class="wt_cont"]:visible').should('be.visible')
})
Cypress.Commands.add('checkToolbarElementsVisibility', () => {
	cy.getSearchElement().should('be.visible')
	cy.getSearchElement().should('be.visible')
	cy.getChatElement().should('be.visible')
	cy.get('#b-scopeListItem-notebook').should('be.visible')
	cy.get('.cbtn').should('be.visible')
	cy.get('[aria-label="Microsoft Rewards "]').should('be.visible')
	cy.get('[id="id_mobile"]').should('be.visible').and('have.descendants', 'svg')
	cy.get('[aria-label="Settings and quick links"]')
		.should('be.visible')
		.and('have.attr', 'href')
	cy.get('[role="listitem"]:visible').should('be.visible').and('have.length', 3)
})
Cypress.Commands.add('checkPersonas', () => {
	cy.getSidePanelCommonSelector()
		.find('[slot="side-panel"]')
		.shadow()
		.find('.header')
		.should('be.visible')
		.then($persona => {
			const PERSONASANDTEXT = {
				persona: ['Copilot', 'Designer', 'travel', 'cooking'],
				text: [
					'Copilot',
					'Designer',
					'Vacation planner',
					'Cooking assistant',
					'Fitness trainer',
				],
			}
			PERSONASANDTEXT.persona.forEach((persona, index) => {
				cy.wrap($persona)
					.next()
					.find(`[personatype="${persona}"]`)
					.should('be.visible')
					.shadow()
					.and('contains.text', `${PERSONASANDTEXT.text[index]}`)
			})
		})
})
Cypress.Commands.add('askQuestion', (question, breakAnswer) => {
	cy.getChatPannelCommonSelector()
		.shadow()
		.find('cib-text-input')
		.shadow()
		.find('#searchbox')
		.type(question)
		.then(() => {
			cy.intercept('GET', '**Event.ClientInst&DATA**').as('client')
			cy.wait('@client')
		})
	cy.getChatPannelCommonSelector()
		.shadow()
		.find('[is="cib-button"][description="Submit"]')
		.should('be.visible')
		.click()
		.then(() => {
			cy.wait('@waitUpdateConversation')
		})
	cy.stopRespondingButton()
		.should('be.visible')
		.then(() => {
			Cypress.currentTest.title.includes('changing subject')
				? cy.wait(20000) //Is not a  best practice
				: cy.log("We don't wait for long responses")
			breakAnswer == true
				? cy.stopRespondingButton().click()
				: cy.stopRespondingButton().should('not.be.visible')
		})
})
Cypress.Commands.add('acceptTerms', () => {
	cy.getChatContentCommonSelector()
		.shadow()
		.find('cib-message:nth-child(3)')
		.shadow()
		.find('cib-muid-consent')
		.shadow()
		.find('[class="get-started-btn inline-explicit"]')
		.should('be.visible')
		.click({ force: true })
})
Cypress.Commands.add('checkAnswer', answer => {
	cy.getChatContentCommonSelector()
		.shadow()
		.find('cib-message')
		.shadow()
		.find('[class="ac-textBlock"]')
		.last()
		.should('contain.text', `${answer}`)
})
Cypress.Commands.add('getCounterElement', () => {
	cy.getChatContentCommonSelector()
		.shadow()
		.find('cib-message')
		.shadow()
		.find('.content.footer')
		.last()
		.find('cib-turn-counter')
		.shadow()
		.find('.text')
		.as('counterElement')
})
Cypress.Commands.add('checkAnswersCounter', counter => {
	cy.getChatContentCommonSelector()
		.should('be.visible')
		.shadow()
		.find('cib-message')
		.shadow()
		.find('.content.footer')
		.last()
		.find('cib-turn-counter')
		.shadow()
		.find('.text')
		.then(text => {
			cy.log(text)
			expect(parseInt(text.text().trim().split('\n').shift())).to.equal(counter)
		})
})
Cypress.Commands.add('checkAnswersCounterNotDisplayed', () => {
	cy.getChatContentCommonSelector()
		.shadow()
		.find('cib-message')
		.shadow()
		.find('.content.footer')
		.last()
		.find('cib-turn-counter')
		.shadow()
		.find('.text')
		.should('not.be.visible')
})
Cypress.Commands.add('checkNotificationNotDisplayed', () => {
	cy.getSidePanelCommonSelector()
		.shadow()
		.find('cib-notification-container')
		.shadow()
		.find('cib-notification')
		.should('not.exist')
})
Cypress.Commands.add('stopRespondingButton', () => {
	cy.getChatPannelCommonSelector()
		.shadow()
		.find('cib-typing-indicator')
		.shadow()
		.find('#stop-responding-button')
})
