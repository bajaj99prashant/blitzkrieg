import web3 from "./web3";
import Tender from "./build/Tender.json";

export default address => {
  return new web3.eth.Contract(JSON.parse(Tender.interface), address);
};
