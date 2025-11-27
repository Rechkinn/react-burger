import { useState } from "react";

type TInputValues = {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
};

export const useForm = (inputValues: TInputValues = {}) => {
  const [values, setValues] = useState<TInputValues>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    handleChange,
    setValues,
  };
};
