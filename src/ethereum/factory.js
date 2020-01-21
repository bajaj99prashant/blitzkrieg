import web3 from "./web3";
import CampaignFactory from "./build/TenderFactory.json";

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xc60d89befa34d5B8fEAF080885f2425ECD48af8E"
);

export default factory;
