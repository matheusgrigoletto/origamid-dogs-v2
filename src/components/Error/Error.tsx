type ErrorProps = {
  message?: string | null;
};

export const Error = ({ message }: ErrorProps) => {
  if (!message) {
    return null;
  }

  return <p className="error">{message}</p>;
};
