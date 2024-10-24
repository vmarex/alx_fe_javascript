let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
  ];
  
  // Simulated server endpoint for quotes
  const serverUrl = "https://jsonplaceholder.typicode.com/posts"; // Use a mock API
  
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
  
  // Show a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
  }
  
  // Add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();  // Save to local storage
      populateCategories();  // Update category dropdown
      alert('New quote added successfully!');
      syncWithServer(); // Sync with the server after adding a quote
    }
  }
  
  // Populate the category dropdown based on unique categories
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Filter quotes by selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    if (filteredQuotes.length > 0) {
      const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      quoteDisplay.textContent = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
    } else {
      quoteDisplay.textContent = "No quotes available for this category.";
    }
  }
  
  // Sync quotes with the server
  function syncWithServer() {
    // Simulating server data fetching
    fetch(serverUrl)
      .then(response => response.json())
      .then(serverQuotes => {
        // Here we should compare serverQuotes with local quotes
        // For simulation, let's assume serverQuotes are new quotes
        const newQuotes = serverQuotes.slice(0, 5).map(quote => ({
          text: quote.title, // Simulate using the title as quote text
          category: "Server" // Assign a default category
        }));
  
        // Check for conflicts and merge quotes
        newQuotes.forEach(serverQuote => {
          const exists = quotes.some(localQuote => localQuote.text === serverQuote.text);
          if (!exists) {
            quotes.push(serverQuote); // Add new quotes from server
          } else {
            // Conflict resolution: Notify the user
            alert(`Conflict detected for quote: "${serverQuote.text}". Keeping local version.`);
          }
        });
  
        saveQuotes(); // Save updated quotes to local storage
        populateCategories(); // Update the category dropdown
      })
      .catch(error => console.error("Error fetching from server:", error));
  }
  
  // Export quotes as JSON file
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
  }
  
  // Import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes(); // Save to local storage
      populateCategories(); // Update category dropdown
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Initialize the app on page load
  window.onload = function() {
    loadQuotes(); // Load quotes from local storage
    populateCategories(); // Populate categories
    showRandomQuote(); // Show a random quote
    setInterval(syncWithServer, 30000); // Sync with server every 30 seconds
  };
  