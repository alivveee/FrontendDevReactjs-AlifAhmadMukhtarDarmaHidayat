export type Category = {
  name: string;
};

export type MenuItem = {
  name: string;
};

export type Menus = {
  foods: MenuItem[];
  drinks: MenuItem[];
};

export type CustomerReview = {
  name: string;
  review: string;
  date: string;
};

export type RestaurantDetail = {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  pictureId: string;
  categories: Category[];
  menus: Menus;
  rating: number;
  customerReviews: CustomerReview[];
};

export type RestaurantDetailResponse = {
  error: boolean;
  message: string;
  restaurant: RestaurantDetail;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  pictureId: string;
  city: string;
  rating: number;
  category?: string;
  price?: string;
  isOpen?: boolean;
};
