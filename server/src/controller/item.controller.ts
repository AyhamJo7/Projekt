import { Request, Response } from 'express';
import { Item } from '../models/item';
import filterByCategory from '../services/item.service';
import { getAllItems, createItem } from '../services/jsonServer.service'; // Added createItem import

// Set this to `false` to disable debugging logs
const DEBUG = false;

// Override console.log to suppress output if DEBUG is false
const originalConsoleLog = console.log;
console.log = (...args: any[]) => {
  if (DEBUG) {
    originalConsoleLog(...args);
  }
};

// Override console.error to suppress output if DEBUG is false
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (DEBUG) {
    originalConsoleError(...args);
  }
};

/**
 * Controller class for handling item-related requests
 */
export class ItemController {
  /**
   * Retrieves items based on the search query parameter
   * @param request - The request object.
   * @param response - The response object.
   */
  public async getItem(request: Request, response: Response) {
    try {
      if (DEBUG) {
        console.log('Fetching items with search params:', request.query.search); // Debugging: Log search params
      }

      // GET request param called search
      const param = request.query.search;

      // Ensure param is an array of strings
      const categoryArray = Array.isArray(param) ? param.map(String) : param ? [String(param)] : [];

      // Fetch all items from the JSON server
      const allItems: Item[] = await getAllItems();
      if (DEBUG) {
        console.log('All items fetched:', allItems); // Debugging: Log all items
      }

      // Filter items based on the search parameter
      const filteredItems: Item[] = filterByCategory(allItems, categoryArray);
      if (DEBUG) {
        console.log('Filtered items:', filteredItems); // Debugging: Log filtered items
      }

      // Create response
      response
        .status(200) // Assign the status to the response
        .json(filteredItems); // Assign the response body
    } catch (error) {
      console.error('Error in getItem:', error); // Debugging: Log the error
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Creates a new item and sends the response.
   * @param request - The request object.
   * @param response - The response object.
   */
  public async createItem(request: Request, response: Response) {
    try {
      // Get the request body data
      const requestData: Item = request.body;

      // Convert the request data to JSON
      const jsonPayload = JSON.stringify(requestData); // Fixed variable name

      // Send the data to the JSON server
      const jsonServerResponse = await createItem(jsonPayload);

      // Assign the status to the response
      response.status(201);
      // Send the response
      response.send(jsonServerResponse);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}