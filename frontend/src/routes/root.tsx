import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useRouteError } from "react-router-dom";

export function Root() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <main className="flex items-center justify-center my-20 flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to React.js and ShadcnUI Starter!
        </h1>
        <p className="">
          Get started by editing <code className="">Routes/Root.js</code>
        </p>
        <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
      </main>
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
