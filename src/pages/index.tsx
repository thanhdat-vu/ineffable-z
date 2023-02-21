import type { NextPage } from "next";
import { Layout, RecipeCard } from "components";
import metadata from "json/metadata.json";

const Home: NextPage = () => {
  return (
    <Layout metadata={metadata.homepage}>
      {/* Popular Cocktails */}
      <section className="py-16 | w-max mx-auto">
        <h2 className="mb-6 sm:mb-8 | text-sm sm:text-xl text-gold font-bold">
          Popular Cocktails
        </h2>
        <div className="gap-x-12 sm:gap-x-16 xl:gap-x-28 gap-y-6 sm:gap-y-12 xl:gap-y-16 | w-max grid grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <RecipeCard key={i} className="w-32 sm:w-48 h-32 sm:h-48" />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
