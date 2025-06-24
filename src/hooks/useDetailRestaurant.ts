import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import type { RestaurantDetail } from "../types";

export const useDetailRestaurant = (restaurantId: string) => {
  const [data, setData] = useState<RestaurantDetail>({} as RestaurantDetail);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get(`/detail/${restaurantId}`)
      .then((res) => {
        if (res.data?.error === false) {
          setData(res.data.restaurant as RestaurantDetail);
          setError(null);
        } else {
          setError("");
          setData({} as RestaurantDetail);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error fetching restaurant details:", err.message);
        } else {
          setError("Failed to fetch restaurant data.");
          console.error("Error fetching restaurant details:", err);
        }
        setData({} as RestaurantDetail);
      })
      .finally(() => setLoading(false));
  }, [restaurantId]);

  return { data, loading, error };
};
