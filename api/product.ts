// import sleep from 'sleep-promise';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Product {
  id: number;          
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isFavorite: boolean;
  category?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  // await sleep(2000);
  const response = await fetch(`${API_URL}/products/`);
  const result = await response.json();
  return result;
};