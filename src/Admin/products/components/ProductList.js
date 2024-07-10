import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { API } from "../../../Api";
import CustomDataTable from "../../../Components/ui/CustomDataTable";
import { Spin } from "antd";
import AddProdcut from "./AddProduct";
import { productListCols } from "../columns";
import { customStyles } from "../customStyles";

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterKey, setFilterKey] = useState("")

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", currentPage, search],
    queryFn: () =>
      API.get(
        `/admin/products?page=${currentPage}&filter[${filterKey}]=${search}`
      ),
    enabled: !!currentPage,
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  }

  const pageCount = products?.data?.data?.last_page;

  return (
    <CustomDataTable
      title={"Products"}
      columns={productListCols(setSearch, setFilterKey)}
      data={products?.data?.data?.data}
      progressComponent={<Spin />}
      progressPending={isLoading}
      modalBody={<AddProdcut />}
      queryString={["products", currentPage]}
      triggerText={"Add New Product"}
      heading={"Add New Product"}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      isError={isError}
      customStyles={customStyles}
    />
  );
}

export default ProductList;
