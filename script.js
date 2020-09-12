(function() {
    // Getting all DOM elements
    const text = document.getElementById('text');
    const author = document.getElementById('author');
    const twitter = document.getElementById('twitter');
    const newQuote = document.getElementById('newQuote');
    const spinner = document.querySelector('.spinner');
    const container = document.querySelector('.container');

    // Display Loader
    function dipslaySpinner() {
        container.hidden = true;
        spinner.hidden = false;
    }

    // Hide Loader
    function hideSpinner() {
        container.hidden = false;
        spinner.hidden = true;
    }

    // Toggle long text class for quotes over 120 characters
    function toggleClassLong(str) {
        text.classList.remove('text--long');

        if (str.length > 120) {
            text.classList.add('text--long');
        } else {
            text.classList.remove('text--long');
        }
    }

    // Display quote
    function displayQuote(data) {
        toggleClassLong(data.quoteText);
        text.innerText = data.quoteText;

        // Replacing empty author
        if (data.quoteAuthor === '') {
            data.quoteAuthor = 'Unknown';
        }
        author.innerHTML = `&minus; ${data.quoteAuthor} &minus;`;
        hideSpinner();
    }

    // Tweet quote
    function tweetQuote() {
        const quote = text.innerText;
        const auth = author.innerHTML;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${auth}`;
        window.open(twitterUrl, '_blank');
    }

    // Getting new quote
    async function getNewQuote() {
        try {
            dipslaySpinner();
            const proxy = 'https://arcane-sierra-82632.herokuapp.com/';
            const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
            const res = await fetch(proxy + url);
            const data = await res.json();
            displayQuote(data);
        } catch(err) {
            console.log(err);
            getNewQuote();
        }
    }

    // Getting new quote on page load
    getNewQuote();

    // Event listener for NEW QUOTE
    newQuote.addEventListener('click', e => {
        e.preventDefault();
        getNewQuote();
    });

    // Event listener Twitter
    twitter.addEventListener('click', e => {
        e.preventDefault();
        tweetQuote();
    });
})();
