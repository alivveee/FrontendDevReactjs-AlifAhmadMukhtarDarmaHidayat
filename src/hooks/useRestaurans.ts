import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import qs from "qs";
import { enrichRestaurants, filterRestaurants } from "../lib";
import type { Restaurant } from "../types";

type Params = {
  search: string;
  isOpen: boolean;
  price: string;
};

export const useRestaurants = ({ search, isOpen, price }: Params) => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const queryString = qs.stringify(
      {
        q: search,
      },
      { skipNulls: true, addQueryPrefix: true }
    );

    axiosInstance
      .get(`/search${queryString}`)
      .then((res) => {
        if (res.data?.error === false) {
          const enriched = enrichRestaurants(res.data.restaurants ?? []);
          const filtered = filterRestaurants(enriched, isOpen, price);
          setData(filtered);
          setError(null);
        } else {
          setError("No restaurants available.");
          setData([]);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error fetching restaurants:", err.message);
        } else {
          setError("Failed to fetch restaurant data.");
          console.error("Error fetching restaurants:", err);
        }
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [search, isOpen, price]);

  return { data, loading, error };
};
