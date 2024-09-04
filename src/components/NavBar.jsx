import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  //falta completar
  const [quantity, setQuantity] = useState(0);
  return (
    <nav className="h-16 w-full p-3 bg-slate-400 sticky top-0 z-50 shadow-lg">
      <ul className="h-full w-full flex justify-between items-center">
        <li>
          <span className="text-3xl hover:text-4xl font-bold">ML</span>
        </li>
        <li>
          <Link to={"/cart"} className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {/* falta completar */}
            {quantity == 0 ? (
              <span className="relative -top-3 -right-0 hidden">
                {quantity}
              </span>
            ) : (
              <span className="relative -top-3 -right-0 bg-red-600 rounded-full size-5 flex justify-center items-center text-white">
                {quantity}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
