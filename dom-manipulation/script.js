// Initialize an array of quotes
let quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The purpose of our lives is to be happy.", category: "Life" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
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
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Show the random quote
    quoteDisplay.innerHTML = `"${quotes[randomIndex].text}" - Category: ${quotes[randomIndex].category}`;
  }
  
  // Add event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    // Ensure that both fields have values
    if (newQuoteText !== "" && newQuoteCategory !== "") {
      // Add the new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      
      // Clear input fields
      document.getElementById('newQuoteText').value = "";
      document.getElementById('newQuoteCategory').value = "";
      
      // Update the DOM to show the newly added quote and refresh the quote list
      alert('New quote added successfully!');
      showLastAddedQuote(newQuoteText, newQuoteCategory);
      displayAllQuotes();
    } else {
      alert('Please fill in both the quote text and the category.');
    }
  }
  
  // Function to display the last added quote in the quote display area
  function showLastAddedQuote(text, category) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${text}" - Category: ${category}`;
  }
  
  // Initial call to display all existing quotes when the page loads
  displayAllQuotes();
  