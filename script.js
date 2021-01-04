const QuoteContainer = document.getElementById('Quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const newquotebtn = document.getElementById('new-quote');
const twitterbtn = document.getElementById('twitter');
const loader = document.getElementById('loader');
// Get quote from API

//show loading spinner
function showLoadingSpinner() {
    loader.hidden = false;
    QuoteContainer.hidden = true;
}
//Hide loadig spinner
function removerLoadingSpinner() {
    if (!loader.hidden) {
        QuoteContainer.hidden = false;
        loader.hidden = true
    }
}
async function getQuote() {
    showLoadingSpinner()
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data)
            //If author is blank ,add 'Unknown'
        if (data.quoteText == '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce font size for long text
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText
            // authorText.innerText = data.quoteAuthor
            // stop loader and shoe quote
        removerLoadingSpinner()


    } catch (error) {
        console.log(error)
        getQuote()
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
newquotebtn.addEventListener('click', getQuote)
twitterbtn.addEventListener('click', tweetQuote)
    // on load
getQuote();