import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useFilterStore } from "../store/useFilterStore";
import { MdSearch } from "react-icons/md";

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

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const open = searchParams.get("open") === "1";
    const price = searchParams.get("price") || "all";

    setSearch(q);
    setSearchInput(q);
    setOpen(open);
    setPrice(price);
  }, []);

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
      {/* Header Text */}
      <div className="flex-1 flex flex-col gap-4 px-4 py-4 md:px-16">
        <h1 className="text-2xl md:text-4xl text-gray-900">Restaurants</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Discover a wide selection of the best restaurants from across
          Indonesia. We provide complete information including restaurant names,
          locations, ratings, and customer reviews to help you choose the right
          dining spot that suits your taste and needs.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 border-y px-4 py-4 md:px-16 md:flex-row md:justify-between md:items-center">
        {/* Left Filter Group */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-5 md:items-center">
          <span className="font-medium text-sm text-gray-700">Filter By:</span>

          {/* Open Now */}
          <div className="flex items-center w-fit gap-1 border-b border-gray-300 text-sm">
            <input
              type="radio"
              id="open-now"
              checked={isOpen}
              onClick={() => setOpen()}
            />
            <label htmlFor="open-now">Open Now</label>
          </div>

          {/* Price Dropdown */}
          <div className="w-fit border-b border-gray-300 text-sm">
            <select
              className="px-1 py-[2px]"
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

          {/* Search Input */}
          <div className="w-full md:w-[290px] flex items-center gap-2 border-b border-gray-300 focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Search by name, category, or menu"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="focus:outline-none px-2 py-1 w-full text-sm text-gray-700 placeholder:text-gray-400"
            />
            <MdSearch className="text-lg" />
          </div>
        </div>

        {/* Clear Button */}
        <button
          className="border border-gray-400 text-sm px-3 py-1 text-gray-500 self-start md:self-auto w-fit"
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
