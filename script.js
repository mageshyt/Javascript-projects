const QuoteContainer = document.getElementById('Quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const newquotebtn = document.getElementById('new-quote');
const twitterbtn = document.getElementById('twitter');
const loader = document.getElementById('loader');
// Get quote from API
let apiQuotes = [];


//show loading spinner
function loading() {
    loader.hidden = false;
    QuoteContainer.hidden = true;
}
//Hide loadig spinner
function complete() {
    if (!loader.hidden) {
        QuoteContainer.hidden = false;
        loader.hidden = true
    }
}

function newQuote() {
    loading();
    // Pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuote() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
//tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} by- ${author}`
    window.open(twitterUrl, '_blank')
}
//Event list
newquotebtn.addEventListener('click', newQuote)
twitterbtn.addEventListener('click', tweetQuote)
    // on load
getQuote();
