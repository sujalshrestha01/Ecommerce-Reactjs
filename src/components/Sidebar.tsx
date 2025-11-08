import { useEffect, useState } from "react";

interface Product {
  category: string;
}
interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching ", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-44 h-screen px-2">
      <h1 className="mb-3 text-2xl font-bold">Store</h1>
      <section className="flex  flex-col gap-4">
        <div className="">
          <input
            type="text"
            placeholder="Search Product"
            className="border border-gray-500 w-full rounded px-2 mb-2"
          />
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder="Min"
              className="border border-gray-500 px-5 py-1 w-full"
              name=""
              id=""
            />
            <input
              type="text"
              placeholder="Max"
              className="border border-gray-500 px-5 py-1 w-full"
              name=""
              id=""
            />
          </div>
        </div>

        {/* Categories section */}

        <div>
          <h2 className="font-bold">Category</h2>
          {categories.map((category, i) => (
            <label key={i} className="flex items-center mb-2 ">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-4 h-4"
                id=""
              />
              {category.toUpperCase()}
            </label>
          ))}
        </div>

        {/* keywords */}
        <div>
          <h2 className="font-bold">Keywords</h2>
          <div className="flex flex-col gap-1">
            {keywords.map((keyword, i) => (
              <button
                key={i}
                className="px-3 py-1 text-[15px] border text-left border-gray-300 w-full hover:bg-gray-200 "
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button className="bg-black text-white w-full cursor-pointer ">
          Reset
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
