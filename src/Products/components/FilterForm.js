import { Form, Formik } from "formik";
import React from "react";
import CustomCollapse from "../../Components/ui/CustomCollapse";
import Input from "../../Components/form/Input";
import RadioInput from "../../Components/form/RadioInput";
import Select from "../../Components/form/Select";

function FilterForm({ filterData }) {
  const ratingOptions = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
  ];

  return (
    <Formik initialValues={{}} onSubmit={() => false}>
      {(formikProps) => {
        filterData(formikProps?.values);
        return (
          <Form className="w-100">
            <div className="px-3">
              <Input name={"name"} label={"Search Product"} />
            </div>
            <CustomCollapse
              panels={[
                {
                  header: <h5 className="fw-bold text-primary">Price</h5>,
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
                  header: <h5 className="fw-bold text-primary">Rating</h5>,
                  content: (
                    <Select
                      label={"Select Rating"}
                      name={"rating"}
                      options={ratingOptions}
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
