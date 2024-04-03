import { useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import swal from "sweetalert";

const useDeleteItem = () => {
  const queryClient = useQueryClient();

  const deleteItem = (item, id, invalidateQueries) => {
    API.delete(`/admin/${item}/${id}`)
      .then((res) => {
        swal(res?.data?.message);
        queryClient.invalidateQueries(invalidateQueries);
      })
      .catch((err) => swal(err?.response?.data?.message || "error"));
  };

  return deleteItem;
};

export default useDeleteItem
