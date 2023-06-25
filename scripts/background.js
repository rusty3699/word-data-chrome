// Event listener for extension installation
chrome.runtime.onInstalled.addListener(function() {
  console.log('Word Cloud Extension installed.');
});

// Event listener for receiving messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'extractWords') {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      
      // Execute content script to extract words
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id },
          function: extractWords,
        },
        function(result) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
  
          var words = result[0].result;
          var wordCounts = countWords(words);
          var mostUsedWord = getMostUsedWord(wordCounts);
          console.log('Word counts:', wordCounts);
          console.log('Most used word:', mostUsedWord);
        }
      );
    });
  }
});

// Function to extract words from the webpage
function extractWords() {
  var words = document.body.innerText.toLowerCase().match(/\b\w+\b/g);
  return words || [];
}

// Function to count word occurrences
function countWords(words) {
  var wordCounts = {};
  words.forEach(function(word) {
    if (wordCounts[word]) {
      wordCounts[word]++;
    } else {
      wordCounts[word] = 1;
    }
  });
  return wordCounts;
}

// Function to get the most used word
function getMostUsedWord(wordCounts) {
  var mostUsedWord = '';
  var maxCount = 0;
  for (var word in wordCounts) {
    if (wordCounts[word] > maxCount) {
      mostUsedWord = word;
      maxCount = wordCounts[word];
    }
  }
  return mostUsedWord;
}
