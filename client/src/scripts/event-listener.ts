import { encodeImageFileAsBase64 } from '../imgEncoder.js'; // Base64 encoding utility
import { itemExample } from '../itemExample.js'; // Example data for testing
import { createCard } from '../card.js'; // Card creation logic

// Event listener for the form submission
document.getElementById('submitButton')?.addEventListener('click', async () => {
  if (!validateForm()) {
    alert('Bitte füllen Sie alle Pflichtfelder aus.');
    return;
  }

  const dateValue = (document.getElementById('date') as HTMLInputElement).value;
  const year = new Date(dateValue).getFullYear();
  if (year < 1900 || year > 2500) {
    alert('Bitte geben Sie ein Datum zwischen 1900 und 2500 ein.');
    return;
  }

  const newItem = createNewItem(dateValue);
  try {
    newItem.image = await processImageUpload();
  } catch (error) {
    console.error('Fehler beim Kodieren des Bildes:', error);
  }

  console.log('JSON-String:', JSON.stringify(newItem, null, 2));
  alert('Eintrag erfolgreich!');
  generateCards([newItem]); // Add the newly created card dynamically
});

// Validation function for form fields
function validateForm(): boolean {
  const requiredFields = ['name', 'description', 'price', 'date'];
  let isValid = true;

  requiredFields.forEach((id) => {
    const field = document.getElementById(id) as HTMLInputElement;
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    } else {
      field.classList.remove('error');
    }
  });

  return isValid;
}

// Create a new item from the form inputs
function createNewItem(dateValue: string) {
  return {
    id: generateUniqueId(), // Generate a unique ID for the item
    name: (document.getElementById('name') as HTMLInputElement).value.trim(),
    description: (document.getElementById('description') as HTMLTextAreaElement).value.trim(),
    price: parseFloat((document.getElementById('price') as HTMLInputElement).value),
    date: dateValue,
    categories: getSelectedCategories(),
    image: '',
  };
}

// Generate a unique ID for items
function generateUniqueId(): string {
  return '_' + Math.random().toString(36).substr(2, 9); // Example unique ID generator
}

// Retrieve selected categories
function getSelectedCategories(): string[] {
  const checkboxes = document.querySelectorAll<HTMLInputElement>("input[name='categories']:checked");
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

// Process image upload to Base64
async function processImageUpload(): Promise<string> {
  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  const file = fileInput.files?.[0];
  return file ? await encodeImageFileAsBase64(file) : '';
}

// Dynamically generate cards
function generateCards(items: any[]) {
  const container = document.getElementById('cardsContainer') as HTMLElement;
  container.innerHTML = '';
  items.forEach((item) => container.appendChild(createCard(item)));
}

// Filter items by selected categories
function filterByCategory(items: any[], selectedCategories: string[]): any[] {
  return items.filter((item) =>
    item.categories.some((category: string) => selectedCategories.includes(category))
  );
}

// Update cards dynamically on category change
document.addEventListener('change', async () => {
  const selectedCategories = getSelectedCategories();
  const items = await fetchItems();
  const filteredItems = filterByCategory(items, selectedCategories);
  generateCards(filteredItems);
});

// Fetch items from the server
async function fetchItems(): Promise<any[]> {
  try {
    const response = await fetch('https://intersys.imis.uni-luebeck.de/api/pile-of-shame');
    if (!response.ok) throw new Error(`HTTP-Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return [];
  }
}
