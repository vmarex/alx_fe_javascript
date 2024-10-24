let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
  ];
  
  // Simulated server endpoint for quotes
  const serverUrl = "https://jsonplaceholder.typicode.com/posts"; // Mock API URL
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Load quotes from local storage
  function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }
  }
  
  // Fetch quotes from the server
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch(serverUrl);
      const serverQuotes = await response.json();
      // Assuming server sends an array of quotes, you can merge or update as necessary
      console.log("Fetched quotes from server:", serverQuotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  }
  
  // Post a new quote to the server
  async function postQuoteToServer(quote) {
    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(quote) // Convert the quote object to JSON string
      });
      
      const data = await response.json(); // Assuming the server returns the posted quote
      console.log("Posted quote to server:", data);
      // Optionally, you can also add the posted quote to the local quotes array
      quotes.push(quote);
      saveQuotes(); // Update local storage
    } catch (error) {
      console.error("Error posting quote:", error);
    }
  }
  
  // Show random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteDisplay').innerText = quotes[randomIndex].text;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      postQuoteToServer(newQuote); // Post to server
      showRandomQuote(); // Show a random quote
      document.getElementById('newQuoteText').value = ""; // Clear input field
      document.getElementById('newQuoteCategory').value = ""; // Clear input field
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Initialize the app
  function init() {
    loadQuotes(); // Load quotes from local storage
    showRandomQuote(); // Show an initial random quote
  }
  
  // Call init on page load
  window.onload = init;
  