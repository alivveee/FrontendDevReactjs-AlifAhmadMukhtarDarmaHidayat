import { useNavigate } from "react-router";
import StarRating from "./StarRating";
import type { Restaurant } from "../types";

const RestaurantItem = (restaurant: Restaurant) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 mb-6">
      <img
        src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
        alt="Restaurant"
        loading="lazy"
        className="w-full h-52 object-cover"
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-xl  text-gray-900">{restaurant.name}</h2>
        <div className="ratings flex">
          <StarRating rating={restaurant.rating} />
        </div>
        <div className="flex justify-between text-sm uppercase text-gray-600">
          <div className="flex gap-2">
            <span className="text-gray-600">{restaurant.category}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">
              {"$".repeat(Number(restaurant.price))}
            </span>
          </div>
          <span className="text-gray-600 flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                restaurant.isOpen ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            {restaurant.isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          navigate(`/restaurant/${restaurant.id}`);
        }}
        className="bg-blue-950 text-white px-4 py-2"
      >
        LEARN MORE
      </button>
    </div>
  );
};

export default RestaurantItem;
