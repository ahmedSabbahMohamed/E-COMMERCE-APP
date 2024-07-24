import "../assets/styles/Categories.css";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../Api";
import { Case, Switch } from "react-if";
import Loading from "../../../Components/ui/Loading";
import { Spin } from "antd";
import ImagesCarousel from "../../../Components/ui/ImagesCarousel";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import NoData from "../../../Components/ui/NoData";

function Categories() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => API.get(`/admin/categories?page=1`),
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      categories?.data?.data?.data.length > 4
        ? 4
        : categories?.data?.data?.data.length,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <FcNext />,
    prevArrow: <FcPrevious />,
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
        }}
        className="btn btn-outline-primary p-1 rounded-pill"
        onClick={onClick}
      >
        <FcNext size={30} />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "70px",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
        }}
        className="btn btn-outline-primary p-1 rounded-pill"
        onClick={onClick}
      >
        <FcPrevious size={30} />
      </div>
    );
  };

  return (
    <div className="my-5">
      <h2 className="heading mb-5 text-center text-lg-start fw-bold">
        Categories
      </h2>

      <Switch>
        <Case condition={isLoading}>
          <div className="vh-100 d-flex justify-content-center align-itmes-center">
            <Spin />
          </div>
        </Case>

        <Case condition={isError}>
          <Loading queryString={["categories"]} />
        </Case>

        <Case condition={categories?.data?.data?.data.length > 0}>
          <div className="mb-5 pt-5">
            <ImagesCarousel
              settings={settings}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
            >
              {categories?.data?.data?.data.map((category, index) => (
                <Link
                  to={`/category/${category?.id}`}
                  key={index}
                  className="category-card d-flex flex-column align-items-center justify-content-between text-decoration-none"
                >
                  <div className="category-img rounded-pill d-flex align-items-center justify-content-center">
                    <img
                      src={category?.images[0]?.path}
                      alt={category.name}
                      className="rounded-pill"
                    />
                  </div>
                  <p className="p-0 m-0 text-secondary">{category?.name}</p>
                </Link>
              ))}
              {categories?.data?.data?.data?.length > 10 && (
                <div className="category-card d-flex flex-column align-items-center justify-content-between">
                  <Link
                    to={"/categories"}
                    className="category-img rounded-pill d-flex align-items-center justify-content-center text-decoration-none text-secondary"
                  >
                    <FiExternalLink size={"30px"} className="text-primary" />
                  </Link>
                  <p className="p-0 m-0 text-secondary">All Categories</p>
                </div>
              )}
            </ImagesCarousel>
          </div>
        </Case>

        <Case condition={categories?.data?.data?.data.length < 1}>
          <NoData />
        </Case>
      </Switch>
    </div>
  );
}

export default Categories;
