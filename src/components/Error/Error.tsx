type ErrorProps = {
  message?: string | null;
};

export const Error = ({ message }: ErrorProps) => {
  if (!message) {
    return null;
  }

  return <p style={{ color: "#f31", margin: "1rem 0" }}>{message}</p>;
};
