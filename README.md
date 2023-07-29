# word-data-chrome

# Word Frequency Analyzer Chrome Extension

The Word Frequency Analyzer Chrome extension is a simple tool that allows you to analyze the frequency of words on a webpage and find the most used word. It provides a user-friendly interface in the form of a popup window where you can generate the word list and view the most used word.

## Features
- Extracts words from the active webpage.
- Counts the frequency of each word.
- Excludes common words like "the," "a," and "to" from the analysis.
- Displays the most used word on the popup window.
- Disokays the top 5 used words on the popup window.

## How to Use
1. Install the extension in your Chrome browser.
2. Navigate to a webpage.
3. Click the extension icon to open the popup window.
4. Click the "Generate Word List" button to extract the words and display the most used word.

## Code Overview
The code consists of the following main components:

- `popup.html`: Defines the structure of the extension's popup window.
- `popup.js`: Contains the main logic of the extension.
- `manifest.json`: Provides the configuration for the Chrome extension.

## Getting Started
1. Clone the repository: `git clone https://github.com/rusty3699/word-data-chrome.git`
2. Open Chrome and go to `chrome://extensions/`.
3. Enable the "Developer mode" toggle.
4. Click "Load unpacked" and select the cloned repository folder.
5. The extension should now be installed in your Chrome browser.

## Customization
- You can modify the `commonWords` array in `popup.js` to add or remove common words that you want to exclude from the analysis.
- Feel free to customize the appearance and functionality of the popup window in `popup.html` and `popup.js` as per your requirements.

# This is in development. Please feel free to contribute to this project.  
- Will be live on chrome extension web store soon :)
- To DO:- UI, icons, and more features.

# TO DO:-
- Publish to Chrome
- Get User Insights
- Save USer Insights in DB
Made with ❤️ Anish Tipnis

