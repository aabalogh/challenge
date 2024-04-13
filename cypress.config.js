const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
			on('before:browser:launch', (browser, launchOptions) => {
				if (browser.family === 'chromium') {
					console.log('Adding Chrome flag: --disable-dev-shm-usage')
					launchOptions.args.push('--disable-dev-shm-usage')
				}
				return launchOptions
			})
		},
		baseUrl: 'https://www.bing.com/',
		watchForFileChanges: false,
		pageLoadTimeout: 30000,
		responseTimeout: 120000,
		requestTimeout: 120000,
		numTestsKeptInMemory: 50,
		defaultCommandTimeout: 30000,
		viewportHeight: 1080,
		viewportWidth: 1920,
		trashAssetsBeforeRuns: true,
		video: true,
		chromeWebSecurity: false,
		redirectionLimit: 1000,
		experimentalInteractiveRunEvents: true,
		experimentalMemoryManagement: true,
		experimentalStudio: true,
		testIsolation: true,
		experimentalMemoryManagement: true,
	},
})
