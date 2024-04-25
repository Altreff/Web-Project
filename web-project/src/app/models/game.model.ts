export interface Game {
  id: number;
  name: string;
  description: string;
  year: number;
  categories: Category[];
  country: Country;
  price: number;
  rating: number;
  image: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
}




