// Author: Anish

// Event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  var generateButton = document.getElementById('generateButton');
  generateButton.addEventListener('click', generateWordList);
});

// Function to generate the word list
function generateWordList() {
  // Query the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    // Execute the script to extract words from the tab
    chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      function: extractWords,
    }, function(result) {
      if (!chrome.runtime.lastError && result && result[0] && result[0].result) {
        var words = result[0].result;
        // Display the most used words
        showMostUsedWords(words);
      } else {
        console.error('Failed to extract words:', chrome.runtime.lastError);
      }
    });
  });
}

// Function to extract words from the webpage
function extractWords() {
  var allText = document.body.innerText;
  var words = allText.split(/\s+/);
  return words;
}

// Function to display the most used word and common words
function showMostUsedWords(words) {
  var mostUsedWord = document.getElementById('mostUsedWord');
  mostUsedWord.textContent = '';

  var mostCommonWords = document.getElementById('mostCommonWords');
  mostCommonWords.textContent = '';

  if (words && words.length > 0) {
    var wordCounts = countWords(words);
    var mostUsed = getMostUsedWord(wordCounts);
    mostUsedWord.textContent = 'Most Used Word: ' + mostUsed;

    var mostCommon = getMostCommonWords(wordCounts, 5);
    mostCommon.forEach(function(word) {
      var listItem = document.createElement('li');
      listItem.textContent = word;
      mostCommonWords.appendChild(listItem);
    });
  }
}

// Function to count the frequency of words
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
  var commonWords = [
    'the', 'a', 'an', 'and', 'or', 'is', 'are', 'in', 'on', 'of',
    'to', 'by', 'for', 'with', 'from', 'it', 'that', 'as', 'at',
    'but', 'not', 'be', 'you', 'have', 'has', 'had', 'by', 'we',
    'can', 'do', 'more', 'if', 'they', 'their', 'our', 'us', 'this',
    '&', '.', '-', '|'
    // Add more common words here
  ];

  var mostUsedWord = '';
  var maxCount = 0;
  for (var word in wordCounts) {
    if (
      wordCounts.hasOwnProperty(word) &&
      isNaN(parseInt(word)) &&
      wordCounts[word] > maxCount &&
      !commonWords.includes(word.toLowerCase())
    ) {
      mostUsedWord = word;
      maxCount = wordCounts[word];
    }
  }
  return mostUsedWord;
}

// Function to get the most common words
function getMostCommonWords(wordCounts, count) {
  var commonWords = [
    'the', 'a', 'an', 'and', 'or', 'is', 'are', 'in', 'on', 'of',
    'to', 'by', 'for', 'with', 'from', 'it', 'that', 'as', 'at',
    'but', 'not', 'be', 'you', 'have', 'has', 'had', 'by', 'we',
    'can', 'do', 'more', 'if', 'they', 'their', 'our', 'us', 'this',
    '&', '.', '-', '|'
    // Add more common words here
  ];

  var commonWordCounts = [];
  for (var word in wordCounts) {
    if (
      wordCounts.hasOwnProperty(word) &&
      isNaN(parseInt(word)) &&
      wordCounts[word] > 1 &&
      !commonWords.includes(word.toLowerCase())
    ) {
      commonWordCounts.push({
        word: word,
        count: wordCounts[word]
      });
    }
  }

  commonWordCounts.sort(function(a, b) {
    return b.count - a.count;
  });

  var mostCommonWords = [];
  for (var i = 0; i < count && i < commonWordCounts.length; i++) {
    mostCommonWords.push(commonWordCounts[i].word);
  }

  return mostCommonWords;
}
