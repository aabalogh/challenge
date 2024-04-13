# Test Report for Bing AI Chat

## Introduction

The Bing AI Chat underwent a comprehensive testing process to evaluate its functionality, usability, and reliability. This report highlights the test cases performed and provides insights into the observed behavior of the platform.

## Test Cases

### Functional Testing

#### Check Landing Page Displays

- **Toolbar**: The toolbar elements such as Search, Copilot, and Notebook were displayed as expected.
- **Language Selection**: The language selection feature functioned properly.
- **Modes**: The different modes (Creative, Balanced, Precise) were accessible and worked as intended.
- **Chat Carousel**: Clicking on the chat carousel items resulted in the expected prompts.
- **Feedback**: The feedback mechanism provided a seamless user experience.
- **Issues**:

  - The highlight around the themes in the toolbar was confusing and inconsistent.

    - Steps to reproduce:
      - Go to landing page
      - Click on the hamburger menu
      - Click on "Themes"
      - Select a "Theme"
    - Actual results:
      - Once a theme is selected all other themes are highlighted.
    - Expected results:
      - The selected theme should be highlighted.

#### Check Functionality

- **Switch Between Features**: As a user i was able to switch between different features such as search, copilot, and notes effortlessly.
- **Change Language**: The language selection feature worked as expected even tough it's a bit confusing, I would rework the way on how the language is selected. Clicking on the "Romanian" button i would expect to change it to Romanian, not to other language.
- **Sign In**: As a user i was able to sign in to their accounts without any issues.
- **Bing Mobile Experience**: The mobile version of Bing opened correctly.
- **Hamburger Menu**: The hamburger menu functionality worked as expected.
- **Change Themes**: Theme changes had inconsistent behavior and need improvement, the highlight around the selected theme seems buggy or I was unable to catch how that highlight business logic works..
- **Change Appearance**: Changes to the appearance settings were applied correctly.
- **Change GPT Types**: Navigating between different types of GPTs was without issues.

#### Check Chat Functionality

- **Prompt Response**: The platform provided accurate responses to basic prompts such as math calculations and factual questions.
- **Max Character & Special characters Handling**: The platform handled maximum character limits appropriately also special characters and mispellings.
- **Prompt Based Conditions**: Inconsistent responses were observed for prompts based on specific conditions.
- **Base64 Payloads**: Unexpected behavior was encountered when adding payloads in base64 format.
- **Current Date Time**: The platform provided unexpected responses to prompts related to the current date and time.
- **Ask for President**: Queries about the presidents of different countries were answered accurately.
- **Issues**:
  - Some prompts resulted in performance issues and delayed responses. e.g. If you would ask for a long response, instruct it to tell you when it has remaining 100characters, stop the answer and change the subject, it would at some moment display some performance issues and also add the same prompt in the previous space of the prompt.
  - Inconsistencies were observed in the responses to certain conditional prompts, depending on the prompt the conditional prompt where based on name 1+1 would equal other than 2 i would see it struggle to reply resulting into some sort of performance issues i think.
  - Using lighthouse to asses the performance of the page will result into a poor rating for the mobile version.
  
  
- There is a folder called Issues with some screens with the issues and one video.

## Conclusion

The Bing AI Chat platform exhibits above satisfactory performance in terms of functionality and usability. However, several issues were identified during testing, particularly related to theme changes, prompt responses, and performance. These issues need to be addressed to ensure a seamless user experience and improve the overall reliability of the platform.

To setup the project run:

- npm install

To run the tests use:

- npm run tests
- npm run changingSubjects
- npm run mathConditional
- npm run math

I chose to use the custom commands as per best practices and not bring problems that POM design patter introduces in cypress.
You can use multiple custom commands files in order to segregate pages without issues and not get in the situation where you have a big file with thousands of lines, and commands, with lot of changes and multiple merge issues due to the structure.
