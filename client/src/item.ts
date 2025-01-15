export type Item = {
  /* TODO: Vervollständigen Sie die Type Definition für Item-Elemente */
  id: string; // Eindeutige ID für das Item
  name: string; // Name des Items
  description: string; // Kurzbeschreibung
  price: number; // Preis des Items in Euro
  date: string; // Veröffentlichungsdatum oder Erstellungsdatum
  categories: string[]; // Liste von Kategorien wie 'Buch', 'Film', etc.
  image: string; // Optional: URL zum Bild des Items
};
