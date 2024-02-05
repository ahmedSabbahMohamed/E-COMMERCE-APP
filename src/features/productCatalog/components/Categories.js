import tech from "../assets/images/tech.webp"
import books from "../assets/images/books.jpeg"
import clothes from "../assets/images/clothes.webp"
import furniture from "../assets/images/furniture.jpeg"
import handbag from "../assets/images/handBag.jpeg"
import sneakers from "../assets/images/sneakers.webp"
import "../assets/styles/Categories.css"
import { Link } from "react-router-dom"

function Categories() {
  const categories = [
    { id: 1, img: tech, path: "/tech", text: "Electronics" },
    { id: 2, img: books, path: "/books", text: "Books" },
    { id: 3, img: clothes, path: "/clothes", text: "Fashion" },
    { id: 4, img: furniture, path: "/furniture", text: "Furniture" },
    { id: 5, img: handbag, path: "/handbag", text: "Handbag" },
    { id: 6, img: sneakers, path: "/sneakers", text: "Sneakers" },
  ];

  return (
    <div className="my-5">
      <h2 className="h2 mb-4 text-center text-lg-start text-dark fw-bold">Categories</h2>
      <div className="d-flex gap-4 align-items-center flex-wrap flex-row categories-container">
        {categories.map(category => {
          return (
            <div
              key={category.id}
              className="position-relative shadow-lg overflow-hidden category"
              style={{ backgroundImage: `url(${category.img})` }}
            >
              <Link
                to={`/categories${category.path}`}
                className="w-100 h-100 d-block"
              ></Link>
              <h3 className="h3 text-light fw-bold position-absolute top-0 mt-5 start-50 translate-middle">
                {category.text}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories