export const Error = ({ message }: { message?: string | null }) => {
  if (!message) {
    return null;
  }

  return <p style={{ color: "#f31", margin: "1rem 0" }}>{message}</p>;
};
