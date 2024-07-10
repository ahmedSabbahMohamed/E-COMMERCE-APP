import { useFormikContext } from "formik"
import { useEffect, useState } from "react"
import ReactSelect from "react-select"

function Select( {
    name = undefined,
    options=[], 
    isMulti = false,
} ) {

    const { values, setFieldValue } = useFormikContext()
  const [finalOptions, setFinalOptions] = useState([])

  useEffect(() => {
      options?.map((option) => {
            setFinalOptions((prev) => [
              ...prev,
              { label: option?.name, value: option?.id },
            ])
      })
  }, [options])

//   let finalOptions = [];
//       options?.map((option) => {
//         finalOptions.push({ label: option?.name, value: option?.id });
//       })
  return (
    <ReactSelect
      options={finalOptions}
      name={name}
      onChange={(opt) => setFieldValue(name, opt?.value)}
      isMulti={isMulti}
      isClearable={true}
      isSearchable={true}
      value={values ? finalOptions.find((option) => option.value === values?.category_id) : null}
    />
  );
}

export default Select