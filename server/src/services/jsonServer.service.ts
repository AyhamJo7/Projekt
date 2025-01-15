import { Item } from '../models/item';

/**
 * Uses the Fetch API to get records from a specified URL.
 * @returns A Promise that resolves to an array of Item objects.
 */
export async function getAllItems(): Promise<Item[]> {
  const hostname = process.env.HOSTNAME || 'localhost';
  const jsonPort: number = parseInt(process.env.JSON_PORT || '3001');
  const url: string = `http://${hostname}:${jsonPort}/items`;

  //console.log('Fetching items from JSON server at:', url); // Debugging: Log the URL

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Item[] = await response.json();
    //console.log('Fetched items:', data); // Debugging: Log fetched data
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

/**
 * Uses the Fetch API to post a record to a specified URL.
 * @param jsonPayload - The JSON payload to be sent.
 * @returns A Promise that resolves to a string representing the response content.
 */
export async function createItem(jsonPayload: string): Promise<string> {
  const hostname = process.env.HOSTNAME || 'localhost';
  const jsonPort: number = parseInt(process.env.JSON_PORT || '3001');
  const url = `http://${hostname}:${jsonPort}/items`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonPayload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}