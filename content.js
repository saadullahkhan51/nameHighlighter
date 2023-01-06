chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.message === 'highlight_code_naming_conventions') {
        const codeElements = document.querySelectorAll('code');
        let lang = request.language;
        codeElements.forEach(function(codeElement) {
          const codeText = codeElement.innerText;
          if (lang == 'python') {
            tooltipText = codeText.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
          } else {
            tooltipText = codeText.replace(/(_)(.)/g, (match, _, character) => character.toUpperCase());
          }

	        // tooltip HTML
          codeElement.innerHTML = `
              <div class="tooltip">
              ${codeElement.innerText}
              <span class="tooltiptext">${tooltipText}</span>
          `;

          // tooltip CSS
          codeElement.style.position = 'relative';
          codeElement.style.display = 'inline-block';
          codeElement.style.borderBottom = '1px dotted black';
          codeElement.style.background = 'Yellow';

          const tooltiptext = codeElement.querySelector('.tooltiptext');
          tooltiptext.style.visibility = 'hidden';
          tooltiptext.style.minWidth = '120px';
          tooltiptext.style.backgroundColor = 'black';
          tooltiptext.style.color = '#fff';
          tooltiptext.style.textAlign = 'center';
          tooltiptext.style.borderRadius = '10px';
          tooltiptext.style.padding = '5px 10px';
          tooltiptext.style.whiteSpace = 'nowrap';
          tooltiptext.style.boxSizing = 'border-box';
          tooltiptext.style.bottom = '100%';
          tooltiptext.style.left = '50%';
          tooltiptext.style.marginLeft = '-60px';
          tooltiptext.style.position = 'absolute';
          tooltiptext.style.zIndex = '1';
        });
        codeElements.forEach(function (codeElement) {
            codeElement.addEventListener('mouseover', function () {
                const tooltiptext = codeElement.querySelector('.tooltiptext');
                tooltiptext.style.visibility = 'visible';
            });
        });
        codeElements.forEach(function (codeElement) {
            codeElement.addEventListener('mouseout', function () {
                const tooltiptext = codeElement.querySelector('.tooltiptext');
                tooltiptext.style.visibility = 'hidden';
            });
        });
    
        sendResponse({result: 'Code naming conventions highlighted'});
      }
    });
    
