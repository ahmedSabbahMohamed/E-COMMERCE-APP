import { useQuery } from "@tanstack/react-query";
import { API } from "../../../Api";
import CustomDataTable from "../../../Components/ui/CustomDataTable";
import AddCategoryForm from "./AddCategoryForm";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { categoryListCols } from "../columns";
import { customStyles } from "../customStyles";

function CategoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", currentPage, debouncedSearch],
    queryFn: () =>
      API.get(`/admin/categories?page=${currentPage}&filter[name]=${search}`),
    enabled: !!currentPage,
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const pageCount = categories?.data?.data?.last_page;

  return (
    <CustomDataTable
      title={"Categories"}
      columns={categoryListCols(setSearch)}
      data={categories?.data?.data?.data}
      progressComponent={<Spin />}
      progressPending={isLoading}
      modalBody={<AddCategoryForm />}
      queryString={["categories", currentPage]}
      triggerText={"Add New Category"}
      heading={"Add New Category"}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      isError={isError}
      customStyles={customStyles}
    />
  );
}

export default CategoryList;
