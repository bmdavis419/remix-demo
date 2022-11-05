import { DeltaForm } from "~/interfaces/DeltaForm";

export const TradeCard: React.FC<{ data: DeltaForm }> = ({ data }) => {
  return (
    <div className="bg-bg-primary mb-4 px-4 py-2 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-white text-lg">
          {data.issuer.issuerName}{" "}
          <span className="font-bold">({data.issuer.issuerTicker})</span>
        </h3>
        <div className="flex flex-row space-x-4">
          <div className="bg-blue-500 px-3 py-2 rounded-md text-white">
            {data.periodOfReport}
          </div>
          <div
            className={`${
              data.buyOrSell === "Buy" ? "bg-green-500" : "bg-red-500"
            } px-3 py-2 rounded-md text-white`}
          >
            {data.buyOrSell === "Buy" ? "+" : "-"}
            {data.sharesTraded} shares
          </div>
          <div
            className={`${
              data.buyOrSell === "Buy" ? "bg-green-500" : "bg-red-500"
            } px-3 py-2 rounded-md text-white`}
          >
            {data.buyOrSell === "Buy" ? "+" : "-"}${data.netTotal}
          </div>
          <div className="bg-orange-500 px-3 py-2 rounded-md text-white">
            end shares: {data.postTransactionShares}
          </div>
        </div>
      </div>
      <span className="text-white text-sm text-light ml-2 italic">
        {data.reporters[0].reporterName} ({data.reporters[0].reporterCik})
      </span>
    </div>
  );
};
