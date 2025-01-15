// Function to dynamically create a card
export function createCard(item) {
  const card = document.createElement('div');
  card.classList.add('card'); // Use a CSS class for styling

  // Populate the card with item data
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="card-image">
    <h3 class="card-title">${item.name}</h3>
    <p class="card-description">${item.description}</p>
    <p class="card-price">Preis: ${item.price.toFixed(2)} €</p>
    <p class="card-date">Datum: ${item.date}</p>
    <p class="card-categories">Kategorien: ${item.categories.join(', ')}</p>
  `;

  return card;
}

// Function to fetch data from the API
export async function fetchGet(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Fehler beim Abrufen der Daten: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return [];
  }
}

// Dynamically render cards from fetched data
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('cardsContainer');
  const url = 'http://localhost:3000/api/items'; // Updated URL to express server

  // Show loading state
  container.innerHTML = '<p>Lade Daten...</p>';

  // Fetch data from the API
  const items = await fetchGet(url);

  // Clear loading state
  container.innerHTML = '';

  // Generate and append cards for each item
  if (items.length > 0) {
    items.forEach((item) => {
      const card = createCard(item);
      container.appendChild(card);
    });
  } else {
    container.innerHTML = '<p>Keine Daten verfügbar.</p>'; // Show message if no data is available
  }
});