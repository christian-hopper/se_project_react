import { useState } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  return { values, handleChange, setValues };
}

export default useForm;
