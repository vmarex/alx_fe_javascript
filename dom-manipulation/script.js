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
      // Assuming server sends an array of quotes
      return serverQuotes; // Return the fetched quotes
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
      quotes.push(quote); // Add the quote to local quotes array
      saveQuotes(); // Update local storage
    } catch (error) {
      console.error("Error posting quote:", error);
    }
  }
  
  // Sync quotes with the server
  async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    
    if (serverQuotes) {
      // Merge server quotes into local quotes
      // Here, you can implement a simple conflict resolution strategy
      serverQuotes.forEach(serverQuote => {
        // Check if the quote already exists in the local array
        const exists = quotes.some(localQuote => localQuote.text === serverQuote.title); // Assuming server quote's text is in 'title'
        if (!exists) {
          quotes.push({ text: serverQuote.title, category: "General" }); // Add new quotes from server, category is set to "General" for simplicity
        }
      });
      
      saveQuotes(); // Update local storage with the merged quotes
      console.log("Synced quotes with server.");
      showRandomQuote(); // Optionally show a random quote after syncing
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
  
  // Example usage of syncQuotes to sync with the server periodically
  setInterval(syncQuotes, 30000); // Sync every 30 seconds
  
  // Call init on page load
  window.onload = init;
  