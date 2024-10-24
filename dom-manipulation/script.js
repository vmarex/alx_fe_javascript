// Initialize quotes array and load from local storage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The purpose of our lives is to be happy.", category: "Life" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to display all quotes
  function displayAllQuotes() {
    const quoteList = document.getElementById('quoteList');
    quoteList.innerHTML = ''; // Clear the list before updating
  
    // Loop through the quotes array and add each quote to the list
    quotes.forEach(quote => {
      const li = document.createElement('li');
      li.textContent = `"${quote.text}" - Category: ${quote.category}`;
      quoteList.appendChild(li);
    });
  }
  
  // Function to display a random quote and store it in session storage
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Show the random quote
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${selectedQuote.text}" - Category: ${selectedQuote.category}`;
    
    // Store the last viewed quote in session storage
  