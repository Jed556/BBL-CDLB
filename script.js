const form = document.querySelector('#form');
const submitBtn = document.querySelector('#submit-btn');
const extractBtn = document.querySelector('#extract-btn');
const openBtn = document.querySelector('#open-btn');
const downloadBtn = document.querySelector('#download-btn');
const result = document.querySelector('#result');
let url = '';
let originalUrl = '';

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const urlInput = document.querySelector('#url');
    url = removePrefix(urlInput.value);
    originalUrl = extractOriginalUrl(url);

    if (originalUrl !== '') {
        extractBtn.classList.remove('disabled');
        extractBtn.classList.add('enabled');
        openBtn.classList.remove('disabled');
        openBtn.classList.add('enabled');
        downloadBtn.classList.remove('disabled');
        downloadBtn.classList.add('enabled');
    }

    return false;
});

extractBtn.addEventListener('click', function() {
    if (originalUrl !== '') {
        result.innerHTML = `
      <h2>Result</h2>
      <pre>${originalUrl}</pre>
    `;

        result.style.display = 'block';
    }
});

openBtn.addEventListener('click', function() {
    if (url !== '') { window.open(url, '_blank'); }
});

downloadBtn.addEventListener('click', function() {
    if (originalUrl !== '') { window.location.href = originalUrl; }
});


function extractOriginalUrl(url) {
    const start = url.indexOf('originalUrl=') + 12;
    const end = url.indexOf('&', start);

    if (end === -1) {
        return decodeURIComponent(url.slice(start));
    }

    return decodeURIComponent(url.slice(start, end));
}

function removePrefix(url) {
    if (url.startsWith('view-source:')) {
        return url.replace('view-source:', '');
    }
    return url;
}