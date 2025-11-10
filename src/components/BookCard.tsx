import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className=" border-gray-300 border bg-gray-200 rounded-xl  px-4 py-1 flex flex-col">
      <Link to={`/product/${id}`}>
   
          <img
            src={image}
            className="h-20 flex justify-self-center mb-2"
            alt=""
          />
 
      </Link>
      <h3 className="font-bold text-[15px]">{title}</h3>
      <p>${price}</p>
    </div>
  );
};

export default BookCard;
