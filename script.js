// Get quotes from API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; // use let instead, will change value later.

// show Loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}
// hide loading
function complete() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
	loading();
	// Pick a random quote from array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	// Check if author = null / replace with unknown
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}
	if (quote.text.length > 110) {
		quoteText.classList.add('long-quote')
	} else {
		quoteText.classList.remove('long-quote')
	}
	// set quote hide loader
	quoteText.textContent = quote.text;
	complete();
}

async function getQuotes() {
	loading();
	const apiURL = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiURL); // const will not be populated until api response
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		//Catch Error here
	}
}

// Tweet a quote
function tweetQuote() {
	const twitterURl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterURl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
