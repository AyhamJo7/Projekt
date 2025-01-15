import { Item } from '../models/item';

type filterFn = (inputArray: Item[], categoryArray: string[]) => Item[];

/**
 * Filters given inputArray by given categoryArray
 */
const filterByCategory: filterFn = (inputArray, categoryArray) => {
  // Check if inputArray is defined and is an array
  if (!Array.isArray(inputArray)) {
    console.error('inputArray is not an array:', inputArray);
    return [];
  }

  // Check if categoryArray is defined and is an array
  if (!Array.isArray(categoryArray)) {
    console.error('categoryArray is not an array:', categoryArray);
    return inputArray; // Return all items if categoryArray is invalid
  }

  // If no categories are selected, return all items
  if (categoryArray.length === 0) {
    return inputArray;
  }

  // Filter items based on the search parameter
  return inputArray.filter((item) =>
    item.categories.some((category) => categoryArray.includes(category))
  );
};

export default filterByCategory;