// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import CustomRating from "../../Components/ui/CustomRating";
// import Pagination from "../../Components/ui/Pagination";
import { getSrc } from "../../Helpers";
import AddComment from "./AddComment";
import { API } from "../../Api";

function ProductReviews() {
//   const [currentPage, setCurrentPage] = useState(1);
  const comments = [
    {
      id: 1,
      picture:
        "https://cdn.pixabay.com/photo/2023/01/18/10/32/ouch-7726461_640.jpg",
      name: "John Doe",
      comment: "This is a great product!",
      rating: 5,
    },
    {
      id: 1,
      picture:
        "https://cdn.pixabay.com/photo/2023/01/18/10/32/ouch-7726461_640.jpg",
      name: "John Doe",
      comment: "This is a bad product!",
      rating: 2.3,
    },
  ];

//   const {data, isLoading, isError} = useQuery({
//     queryKey: ["comments"],
//     queryFn: () => API.get("/user/comments"),
//   }); 

//   const pageCount = data?.data?.data?.last_page;
//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected + 1);
//   };

  return (
    <>
      <AddComment />
      {comments?.map((comment, index) => (
        <div key={index} className="p-2">
          <div className="d-flex align-items-center justify-content-start gap-2">
            <img
              src={getSrc(comment?.picture)}
              alt="img"
              className="img img-fluid rounded-pill"
              style={{ width: "40px", height: "40px" }}
            />
            <h6 className="fw-bold">{comment?.name}</h6>
          </div>
          <p className="text-secondary pt-2 pb-0 mb-0">{comment?.comment}</p>
          <CustomRating value={comment?.rating} />
        </div>
      ))}
      {/* <Pagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      /> */}
    </>
  );
}

export default ProductReviews;
