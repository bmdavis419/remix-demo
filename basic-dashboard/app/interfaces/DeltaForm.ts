export interface DeltaForm {
  percentChange: number;
  accessionNumber: string;
  formClass: "Insider" | "Congress";
  periodOfReport: string;
  averagePricePerShare: number;
  netTotal: number;
  sharesTraded: number;
  postTransactionShares: number;
  buyOrSell: "Buy" | "Sell";
  url: string;
  issuer: {
    issuerCik: string;
    issuerName: string;
    issuerTicker: string;
  };
  reporters: {
    reporterCik: string;
    reporterName: string;
    reporterTitle: string;
    reporterAddress: string;
  }[];
}
