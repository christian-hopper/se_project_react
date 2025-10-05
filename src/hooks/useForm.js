import { useState, useCallback } from "react";

function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, validationMessage, form } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));
    setIsValid(form.checkValidity());
  }, []);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
}

export default useForm;
