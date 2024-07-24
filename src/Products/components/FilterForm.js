import { Form, Formik } from "formik";
import React from "react";
import CustomCollapse from "../../Components/ui/CustomCollapse";
import Input from "../../Components/form/Input";
import RadioInput from "../../Components/form/RadioInput";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../Api";
import Select from "../../Components/form/Select";

function FilterForm({filterData}) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => API.get("/admin/categories"),
  });

  return (
    <Formik initialValues={{}} onSubmit={() => false}>
      {(formikProps) => {
        filterData(formikProps?.values)
        return (
          <Form className="w-100">
            <div className="px-3">
              <Input name={"name"} label={"Search Product"} />
            </div>
            <CustomCollapse
              panels={[
                {
                  header: "Price",
                  content: (
                    <div className="d-flex flex-column gap-2">
                      <Input name={"max_price"} label={"Max Product Price"} />
                      <Input name={"min"} label={"Min Product Price"} />
                      <div>
                        <h6>Price Order</h6>
                        <RadioInput
                          name="priceOrder"
                          value="asc"
                          label="Price: Low to High"
                        />
                        <RadioInput
                          name="priceOrder"
                          value="desc"
                          label="Price: High to Low"
                        />
                      </div>
                    </div>
                  ),
                  key: "1",
                },
                {
                  header: "Category",
                  content: (
                    <Select
                      label={"Select Category"}
                      name={"category"}
                      options={categories?.data?.data?.data}
                    />
                  ),
                  key: "2",
                },
              ]}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default FilterForm;
