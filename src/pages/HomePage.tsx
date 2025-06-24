import { useEffect, useState } from "react";
import Header from "../components/Header";
import RestaurantItem from "../components/RestaurantItem";
import { useRestaurants } from "../hooks/useRestaurans";
import { useFilterStore } from "../store/useFilterStore";

const ITEMS_PER_PAGE = 8;

const HomePage = () => {
  const { search, isOpen, price } = useFilterStore();
  const { data, error, loading } = useRestaurants({ search, isOpen, price });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, isOpen, price]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleRestaurants = data?.slice(0, visibleCount) || [];

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4 px-4 md:px-16 py-12">
        <h1 className="text-2xl text-gray-800">All Restaurants</h1>

        {loading && (
          <div className="w-full flex justify-center py-4">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {error && (
          <div className="w-full flex justify-center py-4">
            <p className="text-red-500">
              Error loading restaurants, try again.
            </p>
          </div>
        )}

        {!loading && !error && !data?.length && (
          <div className="w-full flex justify-center py-4">
            <p className="text-gray-500">No restaurants found.</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
          {visibleRestaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.id} {...restaurant} />
          ))}
        </div>
        {data && visibleCount < data.length && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="border border-blue-950 text-blue-950 px-18 py-2 rounded hover:bg-blue-50 transition"
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
