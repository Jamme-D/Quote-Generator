const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//  Show loading wheel
function showLoadingWheel() {
    loader.hidden = false;
    quoteContainer.hidden = true;
} 

// Hide loading wheel
function removeLoadingWheel() {
    loader.hidden = true;
    quoteContainer.hidden = false;
 }

// Show new quote
function newQuote() {
    showLoadingWheel();
    // Pick a random quote form apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if author field is null and replace with quote unknown
    if (!quote.author) {
        authorText.textContent = 'Unkown';
    } else {
        authorText.textContent = quote.author;
    }
    
    // Check quote length to determine style
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    // Set quote and hide loader
    quoteText.textContent = quote.text;
    removeLoadingWheel();

    // // Get quote locally
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // console.log(quote);
}

// Get quotes from API
async function getQuotes() {
    showLoadingWheel();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        // async and await will not be populated until data is fetched from API
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error)
        // Catch error and handle here
    }
}

// To tweet the quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

// // Gets quotes locally on load
// newQuote();
