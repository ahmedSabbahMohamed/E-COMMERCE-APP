import { Spin } from "antd";
import CustomDataTable from "../../Components/ui/CustomDataTable";
import { ordersListCols } from "./columns";
import { customStyles } from "./customStyles";
import { API } from "../../Api";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "react-bootstrap";

function OrdersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterKey, setFilterKey] = useState("name");
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
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", currentPage, debouncedSearch],
    queryFn: () =>
      API.get(`/user/orders`, {
        params: {
          page: currentPage,
          ...(search ? { [`filter[${filterKey}]`]: search } : {}),
        },
      }),
    enabled: !!currentPage,
    refetchOnMount: false,
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const pageCount = orders?.data?.data?.last_page;

  return (
    <Container>
      <CustomDataTable
        title={"Orders"}
        columns={ordersListCols(setSearch, setFilterKey)}
        data={orders?.data?.data?.data}
        progressComponent={<Spin />}
        progressPending={isLoading}
        queryString={["orders", currentPage]}
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        isError={isError}
        customStyles={customStyles}
        subHeader={false}
      />
    </Container>
  );
}

export default OrdersList;
