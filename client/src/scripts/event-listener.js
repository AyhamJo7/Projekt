import { encodeImageFileAsBase64 } from '../imgEncoder.js'; // Import Base64 encoding function
import { createCard } from '../card.js'; // Import card creation function

// Set this to `false` to disable debugging logs
const DEBUG = false;

// Override console.log to suppress output if DEBUG is false
const originalConsoleLog = console.log;
console.log = (...args) => {
  if (DEBUG) {
    originalConsoleLog(...args);
  }
};

// Override console.error to suppress output if DEBUG is false
const originalConsoleError = console.error;
console.error = (...args) => {
  if (DEBUG) {
    originalConsoleError(...args);
  }
};

if (DEBUG) {
  console.log('event-listener.js loaded'); // Debugging: Confirm script is loaded
}

// Event listener for form submission
document.getElementById('submitButton')?.addEventListener('click', async () => {
  if (DEBUG) {
    console.log('Submit button clicked'); // Debugging: Confirm button click
  }

  // Validate form inputs
  if (!validateForm()) {
    if (DEBUG) {
      console.log('Form validation failed'); // Debugging: Form validation failed
    }
    alert('Bitte füllen Sie alle Pflichtfelder aus.'); // Alert for missing inputs
    return;
  }

  // Validate date range
  const dateValue = document.getElementById('date').value; // Get date value
  const year = new Date(dateValue).getFullYear(); // Extract year from date
  if (year < 1900 || year > 2500) {
    if (DEBUG) {
      console.log('Invalid date range'); // Debugging: Invalid date range
    }
    alert('Bitte geben Sie ein Datum zwischen 1900 und 2500 ein.'); // Alert for invalid date
    return;
  }

  // Create a new item from form inputs
  const newItem = createNewItem(dateValue);
  if (DEBUG) {
    console.log('New item created:', newItem); // Debugging: Log new item
  }

  try {
    // Encode the uploaded image as Base64
    newItem.image = await processImageUpload();
    if (DEBUG) {
      console.log('Image processed:', newItem.image ? 'Image found' : 'No image'); // Debugging: Log image status
    }

    // Send the new item to the server
    if (DEBUG) {
      console.log('Sending new item to server:', newItem); // Debugging: Log item being sent
    }
    await fetchPost(newItem);

    // Display a success message
    if (DEBUG) {
      console.log('Item successfully posted to server'); // Debugging: Log success
    }
    alert('Eintrag erfolgreich!');

    // Refresh the list of items
    if (DEBUG) {
      console.log('Fetching updated items from server'); // Debugging: Log fetch attempt
    }
    const items = await fetchGet();
    if (DEBUG) {
      console.log('Fetched items:', items); // Debugging: Log fetched items
    }

    // Generate and display cards
    generateCards(items);
  } catch (error) {
    console.error('Fehler beim Kodieren des Bildes oder Senden des Eintrags:', error); // Log error
    alert('Fehler beim Hinzufügen des Eintrags. Bitte versuchen Sie es erneut.');
  }
});

// Validation function for form fields
function validateForm() {
  if (DEBUG) {
    console.log('Validating form'); // Debugging: Log form validation
  }
  const requiredFields = ['name', 'description', 'price', 'date']; // Required fields
  let isValid = true;

  // Check each required field
  requiredFields.forEach((id) => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      if (DEBUG) {
        console.log(`Field ${id} is empty`); // Debugging: Log empty field
      }
      field.classList.add('error'); // Highlight invalid fields
      isValid = false;
    } else {
      field.classList.remove('error'); // Remove highlight for valid fields
    }
  });

  if (DEBUG) {
    console.log('Form validation result:', isValid); // Debugging: Log validation result
  }
  return isValid; // Return whether the form is valid
}

// Function to create a new item from form inputs
function createNewItem(dateValue) {
  if (DEBUG) {
    console.log('Creating new item'); // Debugging: Log item creation
  }
  return {
    name: document.getElementById('name').value.trim(), // Item name
    description: document.getElementById('description').value.trim(), // Item description
    price: parseFloat(document.getElementById('price').value), // Item price
    date: dateValue, // Valid purchase date
    categories: getSelectedCategories(), // Selected categories
    image: '', // Placeholder for the image
  };
}

// Function to get selected categories
function getSelectedCategories() {
  if (DEBUG) {
    console.log('Getting selected categories'); // Debugging: Log category selection
  }
  const checkboxes = document.querySelectorAll("input[name='categories']:checked"); // All selected checkboxes
  return Array.from(checkboxes).map((checkbox) => checkbox.value); // Return values of selected checkboxes
}

// Function to process image upload and encode as Base64
async function processImageUpload() {
  if (DEBUG) {
    console.log('Processing image upload'); // Debugging: Log image upload
  }
  const fileInput = document.getElementById('file-input'); // File input element
  const file = fileInput.files?.[0]; // Check if a file was uploaded
  return file ? await encodeImageFileAsBase64(file) : ''; // Encode or return empty string
}

// Function to dynamically generate cards
function generateCards(items) {
  if (DEBUG) {
    console.log('Generating cards for items:', items); // Debugging: Log items for card generation
  }
  const container = document.getElementById('cardsContainer'); // Container element for cards
  if (!container) {
    console.error('cardsContainer not found'); // Debugging: Log missing container
    return;
  }
  container.innerHTML = ''; // Clear container content
  items.forEach((item) => {
    if (DEBUG) {
      console.log('Creating card for item:', item); // Debugging: Log individual item
    }
    container.appendChild(createCard(item));
  });
}

// Function to filter items by categories
function filterByCategory(items, selectedCategories) {
  if (DEBUG) {
    console.log('Filtering items by categories:', selectedCategories); // Debugging: Log category filtering
  }
  // If no categories are selected, return all items
  if (selectedCategories.length === 0) {
    return items;
  }
  // Otherwise, filter items based on selected categories
  return items.filter((item) =>
    item.categories.some((category) => selectedCategories.includes(category))
  );
}

// Update cards when categories change
document.addEventListener('change', async () => {
  if (DEBUG) {
    console.log('Category change detected'); // Debugging: Log category change
  }
  const selectedCategories = getSelectedCategories(); // Get currently selected categories
  if (DEBUG) {
    console.log('Selected categories:', selectedCategories); // Debugging: Log selected categories
  }
  const items = await fetchGet();
  if (DEBUG) {
    console.log('Fetched items:', items); // Debugging: Log fetched items
  }
  const filteredItems = filterByCategory(items, selectedCategories); // Filter items
  if (DEBUG) {
    console.log('Filtered items:', filteredItems); // Debugging: Log filtered items
  }
  generateCards(filteredItems); // Update card display
});

// Function to fetch items from the server
async function fetchGet(categoryArray = []) {
  if (DEBUG) {
    console.log('Fetching items from server'); // Debugging: Log fetch attempt
  }
  try {
    // Build the URL with category filters
    const url = new URL('http://localhost:3000/api/items'); // Updated URL to express server
    categoryArray.forEach((category) => {
      url.searchParams.append('search', category);
    });

    if (DEBUG) {
      console.log('Fetching from URL:', url.toString()); // Debugging: Log fetch URL
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (DEBUG) {
      console.log('Fetched data:', data); // Debugging: Log fetched data
    }
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

// Function to send new items to the server
async function fetchPost(itemData) {
  if (DEBUG) {
    console.log('Posting item to server:', itemData); // Debugging: Log item being posted
  }
  try {
    const response = await fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (DEBUG) {
      console.log('Server response:', data); // Debugging: Log server response
    }
    return data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}

// Load items when the page loads
window.addEventListener('load', async () => {
  if (DEBUG) {
    console.log('Page loaded'); // Debugging: Log page load
  }
  const items = await fetchGet();
  if (DEBUG) {
    console.log('Initial items fetched:', items); // Debugging: Log initial items
  }
  generateCards(items);
});