export interface Product {
    id?: number;          // Use of '?' makes the 'id' optional
    name: string;         // Name of the product
    description?: string; // Description is optional
    price: number;        // Price must be a number
    category?: string;    // Category is optional
  }
  
