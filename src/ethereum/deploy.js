const Web3 = require("web3");
const compiledFactory = require("./build/TenderFactory.json");

const web3 = new Web3(window.web3.currentProvider || "http://localhost:8545");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "2000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

export default deploy;
