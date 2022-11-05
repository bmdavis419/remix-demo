import { ErrorBoundaryComponent, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

const getLoaderData = async (url: URL) => {
  // should have a name, title, and cik
  const name = url.searchParams.get("name");
  const title = url.searchParams.get("title");
  const cik = url.searchParams.get("cik");
  invariant(name, "name is required");
  invariant(title, "title is required");
  invariant(cik, "cik is required");

  return {
    name,
    title,
    cik,
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  // THIS SHOULD BE A CALL TO A DATABASE WITH AN ID
  const url = new URL(request.url);
  return json<LoaderData>(await getLoaderData(url));
};

const NewCreator: React.FC = () => {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <div className="py-4 px-10 w-full overflow-scroll h-screen no-scrollbar">
      <h1 className="text-white text-5xl font-bold mb-6">New Insider</h1>
      <div className="bg-bg-primary max-w-sm py-3 px-6">
        <h3 className="text-white text-xl font-bold">{loaderData.name}</h3>
        <h5 className="font-light text-gray-500 text-lg italic">
          {loaderData.title} ({loaderData.cik})
        </h5>
      </div>
    </div>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="flex justify-center align-middle w-full h-screen items-center">
      <div className="bg-white h-[200px] w-[200px] rounded-md px-2 py-2 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export default NewCreator;
