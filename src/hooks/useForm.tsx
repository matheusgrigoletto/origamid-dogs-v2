import { useState } from "react";

type Validations = {
  [key: string]: {
    regex: RegExp;
    message: string;
  };
};

const types: Validations = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um e-mail válido.",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize números apenas.",
  },
};

export const useForm = (type?: string) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string) => {
    if (!type) {
      return true;
    }

    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    }

    if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }

    setError(null);
    return true;
  };

  const onChange = ({ target }: { target: any }) => {
    if (error) {
      validate(target.value);
    }

    setValue(target.value);
  };

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};
