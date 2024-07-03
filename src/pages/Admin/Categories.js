import { useQuery } from "@tanstack/react-query";
import { API } from "../../api";
import { Case, Default, Switch } from "react-if";
import Loading from "../../components/ui/Loading";
import CustomDataTable from "../../components/ui/CustomDataTable";
import { Container } from "react-bootstrap";
import {
  categoriesTableCols,
  customStyles,
} from "../../features/contentManagement/helpers";
import CustomModal from "../../components/ui/CustomModal";
import AddCategoryForm from "../../features/contentManagement/components/form/AddCategoryForm";

function Categories() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => API.get("/admin/categories"),
  });

  console.log(categories?.data?.data);
  const addNewCategory = <CustomModal triggerText="Add New Category" variant={"outline-primary"} heading={"Add New Category"} body={<AddCategoryForm />} />;

  return (
    <Switch>
      <Case condition={isLoading || isError}>
        <Loading queryString={"categories"} />
      </Case>
      <Case
        condition={
          categories?.data?.data && categories?.data?.data.length !== 0
        }
      >
        <Container className="px-2 rounded overflow-hidden">
          <CustomDataTable
            title={"Categories"}
            columns={categoriesTableCols}
            data={categories?.data?.data}
            customStyles={customStyles}
            subHeader={true}
            subHeaderComponent={addNewCategory}
          />
        </Container>
      </Case>
      <Default>
        <div className="d-flex gap-2 flex-column align-items-center justify-content-center">
          <h2 className="text-center text-danger">No Categories Found</h2>
          {addNewCategory}
        </div>
      </Default>
    </Switch>
  );
}

export default Categories;
