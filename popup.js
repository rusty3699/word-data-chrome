document.addEventListener('DOMContentLoaded', function() {
    var generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', generateWordList);
  });
  
  function generateWordList() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: extractWords,
      }, function(result) {
        if (!chrome.runtime.lastError && result && result[0] && result[0].result) {
          var words = result[0].result;
          showMostUsedWord(words);
        } else {
          console.error('Failed to extract words:', chrome.runtime.lastError);
        }
      });
    });
  }
  
  function extractWords() {
    var allText = document.body.innerText;
    var words = allText.split(/\s+/);
    return words;
  }
  
  function showMostUsedWord(words) {
    var mostUsedWord = document.getElementById('mostUsedWord');
    mostUsedWord.textContent = '';
  
    if (words && words.length > 0) {
      var wordCounts = countWords(words);
      var mostUsed = getMostUsedWord(wordCounts);
      mostUsedWord.textContent = 'Most Used Word: ' + mostUsed;
    }
  }
  
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
  
  function getMostUsedWord(wordCounts) {
    var commonWords = ['the', 'a', 'an', 'and', 'or', 'is', 'are', 'in', 'on', 'of','to'];
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
  