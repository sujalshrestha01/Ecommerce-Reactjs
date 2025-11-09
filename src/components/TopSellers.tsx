import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        setAuthors(authorsData);
      } catch (error) {
        console.error("Erro Fetching authors", error);
      }
    };
    fetchData();
  }, []);

  const handleFollow = (index) => {
    setAuthors((prev) =>
      prev.map((author, i) =>
        i === index
          ? { ...author, isFollowing: !author.isFollowing }
          : { ...author }
      )
    );
  };

  return (
    <div className="border-gray-400 border p-5 mt-10 ">
      <h2 className="font-bold mb-4 ">Top Sellers</h2>
      <div className="flex flex-col gap-2">
        {authors.map((author, index) => (
          <div className="flex items-center justify-between ">
            <div className="flex items-center ">
              <img
                className="w-13 rounded-full mr-2"
                src={author.image}
                alt=""
              />
              <h2>{author.name} </h2>
            </div>
            <button
              onClick={() => handleFollow(index)}
              className={`${
                author.isFollowing ? "bg-amber-500" : "bg-black"
              } text-white px-2 rounded`}
            >
              {author.isFollowing ? "Unfollow" : "follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
