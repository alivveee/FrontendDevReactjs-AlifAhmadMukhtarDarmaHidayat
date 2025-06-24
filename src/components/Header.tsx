import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useFilterStore } from "../store/useFilterStore";

const prices = [
  { id: "all", name: "All Prices" },
  { id: "1", name: "<$1" },
  { id: "2", name: "$1 - $10" },
  { id: "3", name: "$10 - $50" },
  { id: "4", name: "$50 - $100" },
  { id: "5", name: ">$100" },
];

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, price, setSearch, setPrice, setOpen } = useFilterStore();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");

  // Apply params from URL on first load
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const open = searchParams.get("open") === "1";
    const price = searchParams.get("price") || "all";

    setSearch(q);
    setSearchInput(q);
    setOpen(open);
    setPrice(price);
  }, []);

  // Debounce search + sync to URL
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(searchInput);

      const params: Record<string, string> = {};
      if (searchInput) params.q = searchInput;
      if (price && price !== "all") params.price = price;
      if (isOpen) params.open = "1";

      setSearchParams(params);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput, price, isOpen]);

  return (
    <div className="flex flex-col gap-2 bg-white">
      <div className="flex-1 flex flex-col gap-4 px-16 py-4">
        <h1 className="text-4xl text-gray-900">Restaurants</h1>
        <p className="text-gray-600">
          Discover a wide selection of the best restaurants from across
          Indonesia. We provide complete information including restaurant names,
          locations, ratings, and customer reviews to help you choose the right
          dining spot that suits your taste and needs.
        </p>
      </div>

      <div className="flex justify-between border-y px-16 py-4">
        <div className="flex gap-5 items-center">
          Filter By:
          <div className="flex items-center gap-1 border-b-[1.5px] border-gray-300">
            <input
              type="radio"
              id="open-now"
              checked={isOpen}
              onClick={() => setOpen()}
            />
            <label htmlFor="open-now">Open Now</label>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="border-b-[1.5px] border-gray-300"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              {prices.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 w-[280px]">
            <input
              type="text"
              placeholder="Search by name, category, or menu"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border-b-[1.5px] border-gray-300 focus:outline-none focus:border-blue-500 transition-colors px-2 py-1 w-full text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          className="border border-gray-400 px-3 py-1 text-gray-500"
          onClick={() => {
            setSearchInput("");
            setSearch("");
            setPrice("all");
            setOpen(false);
            setSearchParams({});
          }}
        >
          CLEAR ALL
        </button>
      </div>
    </div>
  );
};

export default Header;
