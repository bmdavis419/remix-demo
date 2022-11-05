import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardNav, DashboardRoutes } from "~/components/DashboardNav";
import { TradeCard } from "~/components/TradeCard";
import { DeltaForm } from "~/interfaces/DeltaForm";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

const getLoaderData = async () => {
  const res = await fetch(
    `${process.env.API_URL || "http://localhost:8080"}/amzn`,
    {
      headers: {
        "x-api-key": process.env.API_KEY || "123456",
      },
    }
  );
  return (await res.json()) as DeltaForm[];
};

export const loader: LoaderFunction = async ({ params }) => {
  return json<LoaderData>(await getLoaderData());
};

const AAPL: React.FC = () => {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col justify-center w-full">
      <DashboardNav selected={DashboardRoutes.AMZN} />
      <h3 className="text-center text-xl font-bold text-white underline mb-3">
        Bezos' Trades
      </h3>
      <div>
        {loaderData.map((trade) => (
          <TradeCard key={trade.accessionNumber} data={trade} />
        ))}
      </div>
    </div>
  );
};

export default AAPL;
