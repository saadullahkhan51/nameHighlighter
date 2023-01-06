document.getElementById('highlight-button').addEventListener('click', function () {
  const language = document.getElementById('language').value;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: 'highlight_code_naming_conventions', language: language }, function (response) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = 'Result: ' + response.result;
      alert("Highlighting Complete");
    });
  });
});

