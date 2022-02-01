import { Head } from "~components/Head";
import { Feed } from "~pages/Feed";

export const Home = () => {
  return (
    <>
      <Head
        title="Fotos"
        description="Dogos, as fotos dos cachorrinhos mais bonitinhos do planeta :)"
      />
      <section className="container main-container">
        <Feed user={0} />
      </section>
    </>
  );
};
