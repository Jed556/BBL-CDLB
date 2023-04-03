const form = document.querySelector('#form');
const submitBtn = document.querySelector('#submit-btn');
const extractBtn = document.querySelector('#extract-btn');
const openBtn = document.querySelector('#open-btn');
const downloadBtn = document.querySelector('#download-btn');
const result = document.querySelector('#result');
let url, originalUrl = '';

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const urlInput = document.querySelector('#url');
    url = urlInput.value;
    originalUrl = extractOriginalUrl(url);

    if (originalUrl !== '') {
        submitBtn.style.backgroundColor = "#0077cc";
        extractBtn.classList.remove('disabled');
        extractBtn.classList.add('enabled');
        openBtn.classList.remove('disabled');
        openBtn.classList.add('enabled');
        downloadBtn.classList.remove('disabled');
        downloadBtn.classList.add('enabled');
    }

    return false;
});

extractBtn.addEventListener('click', function () {
    result.innerHTML = `
      <h2>Result</h2>
      <pre>${originalUrl}</pre>
    `;

    result.style.display = 'block';
});

openBtn.addEventListener('click', function () {
    window.open(url, '_blank');
});

downloadBtn.addEventListener('click', function () {
    window.location.href = originalUrl;
});


function extractOriginalUrl(url) {
    const start = url.indexOf('originalUrl=') + 12;
    const end = url.indexOf('&', start);

    if (end === -1) {
        return decodeURIComponent(url.slice(start));
    }

    return decodeURIComponent(url.slice(start, end));
}