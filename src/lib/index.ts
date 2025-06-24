import type { Restaurant } from "../types";


const prices: { id: string; name: string }[] = [
  { id: "1", name: "<$1" },
  { id: "2", name: "$1 - $10" },
  { id: "3", name: "$10 - $50" },
  { id: "4", name: "$50 - $100" },
  { id: "5", name: ">$100" },
];

const categories = [
  "Japanese",
  "Cafe",
  "Chinese",
  "Bakery",
  "Seafood",
  "Fast Food",
  "Italian",
  "Indian",
  "Mexican",
  "Thai",
  "Korean",
  "Mediterranean",
  "Vegetarian",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Enrich restaurants with random category, price, and open status because the API does not provide these details.
export function enrichRestaurants(restaurants: Restaurant[]): Restaurant[] {
  return restaurants.map((restaurant) => ({
    ...restaurant,
    category: getRandomItem(categories),
    price: getRandomItem(prices).id,
    isOpen: Math.random() < 0.5,
  }));
}

export function filterRestaurants(
  restaurants: Restaurant[],
  isOpen: boolean,
  price: string
): Restaurant[] {
  return restaurants.filter((restaurant) => {
    const matchOpen = isOpen ? restaurant.isOpen === true : true;
    const matchPrice = price !== "all" ? restaurant.price === price : true;
    return matchOpen && matchPrice;
  });
}

// get random coordinates for restaurant location
const cityCoordinates: Record<string, [number, number]> = {
  Ternate: [0.7904, 127.384],
  Jakarta: [-6.2, 106.8167],
  Surabaya: [-7.2504, 112.7688],
  Medan: [3.5952, 98.6722],
  Bandung: [-6.9147, 107.6098],
  Yogyakarta: [-7.7956, 110.3695],
  Semarang: [-6.9663, 110.4167],
  Makassar: [-5.1477, 119.4328],
  Palembang: [-2.9916, 104.7561],
  Denpasar: [-8.4095, 115.1889],
  Malang: [-7.9667, 112.6333],
  Balikpapan: [-1.2654, 116.8312],
  Pekanbaru: [0.5075, 101.4478],
  Batam: [1.1214, 104.0402],
  Banjarmasin: [-3.3167, 114.5833],
  Pontianak: [-0.0261, 109.3426],
  Samarinda: [-0.5031, 117.1453],
  Tasikmalaya: [-7.3261, 108.2167],
  Cirebon: [-6.7333, 108.5667],
  Jember: [-8.1667, 113.6833],
  Mataram: [-8.5833, 116.1167],
  Manado: [1.4833, 124.8333],
  Palu: [-0.8992, 119.8815],
  Ambon: [-3.695, 128.188],
  Kupang: [-10.1772, 123.6077],
  Bengkulu: [-3.8006, 102.265],
  Jambi: [-1.6167, 103.6167],
  Gorontalo: [0.5411, 123.0667],
  Padang: [-0.9492, 100.354],
  PalangkaRaya: [-2.2083, 113.9214],
  TanjungPinang: [0.9167, 104.45],
  BandarLampung: [-5.4292, 105.2592],
};

export function getRandomCityCoordinateEmbed(): string {
  const cityNames = Object.keys(cityCoordinates);
  const randomCity = cityNames[Math.floor(Math.random() * cityNames.length)];
  const [lat, lng] = cityCoordinates[randomCity];
  return `https://www.google.com/maps?q=${lat},${lng}&output=embed&z=13`;
}
