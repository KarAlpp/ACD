import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";
import clsx from "clsx";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentParams = new URLSearchParams(location.search);
    if (searchTerm.trim()) {
      currentParams.set("search", searchTerm.trim());
    } else {
      currentParams.delete("search");
    }

    navigate(`/collections/all?${currentParams.toString()}`, { replace: false });
  };

  return (
    <div className="relative flex items-center justify-center w-full transition-all duration-300">
      <div className="relative">
        {isOpen ? (
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center w-full max-w-lg bg-white shadow-lg rounded-full border border-gray-300 transition-all duration-300"
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="w-5 h-5 text-gray-500" />
            </div>

            <input
              type="text"
              placeholder="SEARCH"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none rounded-full"
              autoFocus
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-10 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute inset-y-0 right-3 flex items-center p-2 rounded-full text-gray-600 hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className={clsx(
              "p-3 bg-white shadow-md rounded-full flex items-center justify-center transition-all duration-300",
              "hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
            )}
          >
            <Search className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
