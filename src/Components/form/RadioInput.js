import { useFormikContext } from "formik";

const RadioInput = ({ label, name, value }) => {
  const { setFieldValue, values } = useFormikContext();

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={name}
        value={value}
        checked={values[name] === value}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
