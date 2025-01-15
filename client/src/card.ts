// Funktion zum Erstellen einer Karte
export function createCard(item: { 
  image: string; 
  name: string; 
  description: string; 
  price: number; 
  date: string; 
  categories: string[]; 
}): HTMLDivElement {
  const card = document.createElement("div");
  card.style.border = "1px solid black";
  card.style.padding = "10px";
  card.style.margin = "10px";
  card.style.width = "200px";
  card.style.textAlign = "center";
  card.style.color = "red";

  // HTML für die Karte
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: auto;">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p>Preis: ${item.price.toFixed(2)} €</p>
    <p>Datum: ${item.date}</p>
    <p>Kategorien: ${item.categories.join(", ")}</p>
  `;

  return card;
}

// Funktion fetchGet zum Abrufen der Daten von der API
async function fetchGet(url: string): Promise<{ 
  image: string; 
  name: string; 
  description: string; 
  price: number; 
  date: string; 
  categories: string[]; 
}[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Fehler beim Abruf der Daten: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler bei der Datenabfrage:', error);
    return [];
  }
}

// Karten hinzufügen, sobald die Seite geladen ist
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("cardsContainer") as HTMLElement;
  const url = "https://intersys.imis.uni-luebeck.de/api/pile-of-shame";

  // Daten von der API abrufen
  const items = await fetchGet(url);

  // Karten erstellen und hinzufügen
  items.forEach((item) => {
    const card = createCard(item);
    container.appendChild(card);
  });
});
