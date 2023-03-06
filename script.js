const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.querySelector('.loader')

let apiQuotes = []

// show loading
function showLoading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function completeLoading() {
  loader.hidden = true
  quoteContainer.hidden = false
}

const newQuote = ()=>{
  showLoading()
  let quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
  authorText.textContent = quote.author ? quote.author : "anonymous"
  quoteText.textContent = quote.text
  if(quote.text.length > 120){
    quoteText.classList.add('long-quote')
  }else{
    quoteText.classList.remove('long-quote')
  }
  completeLoading()
}
// getting the quote from api
async function getQuotes() {
  showLoading()
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try{
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote();
  }catch(e){
    console.log(e)
  }
}

// Tweet a quote
const tweetQuote = ()=>{
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`
  window.open(twitterUrl,'_blank')
}

twitterBtn.addEventListener('click', tweetQuote)

newQuoteBtn.addEventListener('click',newQuote)

// ON load
getQuotes()
// loading()