import type { NextPage } from "next";
import Layout from "components/Layout";
import metadata from "json/metadata.json";

const Home: NextPage = () => {
  return (
    <Layout metadata={metadata.homepage}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Layout>
  );
};

export default Home;
