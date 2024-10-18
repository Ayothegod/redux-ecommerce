import { FeaturedCategory } from "@/components/base/FeaturedCategory";
import { Hero } from "@/components/base/Hero";
import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";

export function Root() {
  return (
    <div>
      {/* Hero + header */}
      <section className="bg-base min-h-screen">
        <Hero />
      </section>

      <FeaturedCategory />
    </div>
  );
}

export async function Loader() {
  return null;
}

export function RootError() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can find this page.</p>

        <Link to="/">
          <Button className="mt-6">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
