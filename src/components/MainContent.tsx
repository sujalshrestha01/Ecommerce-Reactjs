import { useEffect, useState } from "react";
import {  useFilter } from "./FilterContext";
import {  Tally3} from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";


type Product = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
};

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword,setKeyword } =
    useFilter();
  const [products, setProducts] = useState<Product[] >([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
     
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;
    if (selectedCategory) {
      setKeyword('')
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter === "expensive") {
      return filteredProducts.sort((a, b) => b.price - a.price);
    } else if (filter === "cheap") {
      return filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filter === "popular") {
      return filteredProducts.sort((a, b) => b.rating - a.rating);
    } else {
      return filteredProducts;
    }
  };
  const filteredProducts = getFilteredProducts();

  const totalProduct = 100;
  const totalPages = Math.ceil(totalProduct / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }
    if (currentPage - 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
    }
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };
  return (
    <section className="sm:mt-2  mt-10">
      <div className="flex flex-col items-end">
        <div className=" mb-2  fixed top-2 ">

        <div className="relative rounded-xl bg-white ">
          <button
            className="border  rounded-xl text-[14px] sm:text-[16px] border-gray-500  px-1 sm:px-4 py-1 flex items-center "
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Tally3 className=" sm:mr-2" />
            {filter === "all"
              ? "Filter"
              : filter.toLowerCase()}
          </button>

          {dropdownOpen && (
            <div onClick={()=>setDropdownOpen(!dropdownOpen)} className="absolute bg-white border-gray-300 rounded w-30 ">
              <button
                onClick={() => setFilter("cheap")}
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
              >
                cheap
              </button>
              <button
                onClick={() => setFilter("expensive")}
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
              >
                Expensive
              </button>
              <button
                onClick={() => setFilter("popular")}
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
              >
                Popular
              </button>
            </div>
          )}
        </div>
        </div>
        <div className=" mt-10">
          <div className="grid md:grid-cols-4 grid-cols-3 gap-4 mb-6">
            {filteredProducts.map((product) => (
              <BookCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
                price={product.price}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 border border-gray-300 rounded-2xl text-gray-500  hover:bg-gray-300"
            >
              Previous
            </button>

            <div className="flex gap-3">
              {getPaginationButtons().map((page) => (
                <button
                  key={page}
                  className={` px-3 border-gray-300 border  rounded-full ${
                    page === currentPage
                      ? "bg-black  text-white "
                      : " hover:bg-gray-300"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 border border-gray-300 rounded-2xl text-gray-500 hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
