const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../src/ethereum/build/TenderFactory.json");
const compiledTender = require("../src/ethereum/build/Tender.json");

let accounts;
let factory;
let tenderAddress;
let tender;

var dateObj = new Date();
dateObj.setDate(dateObj.getDate() + 1);
const startDate = Math.floor(dateObj.getTime() / 1000);
const bidDate = Math.floor(new Date().getTime() / 1000);

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // balance = await web3.eth.getBalance(accounts[0]);
  // console.log(balance);
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods
    .createTender(
      "test tender for pipe",
      startDate,
      1579527244,
      bidDate,
      9899646691,
      "test@gmail.com"
    )
    .send({
      from: accounts[0],
      gas: "1000000"
    });

  [tenderAddress] = await factory.methods.getDeployedTenders().call();
  tender = await new web3.eth.Contract(
    JSON.parse(compiledTender.interface),
    tenderAddress
  );
});

describe("Tenders", () => {
  it("deploy a factory and tender", () => {
    assert.ok(factory.options.address);
    assert.ok(tender.options.address);
  });

  it("add items to tender", async () => {
    await tender.methods
      .addItem("steel pipe", 1200)
      .send({ from: accounts[0], gas: "100000" });
    const item = await tender.methods.items(0).call();
    assert.equal(item.description, "steel pipe");
  });

  it("add contributors to tender", async () => {
    await tender.methods
      .addApprover(accounts[1])
      .send({ from: accounts[0], gas: "100000" });
    await tender.methods
      .addApprover(accounts[2])
      .send({ from: accounts[0], gas: "100000" });
    const approverCount = await tender.methods.countApprovers().call();
    assert.equal(approverCount, 2);
  });

  it("make bid to the tender", async () => {
    const hash = "0x412563748333765abef356";
    await tender.methods
      .createBid(hash)
      .send({ from: accounts[3], gas: "100000" });
    const bid = await tender.methods
      .getBid(0)
      .call({ from: accounts[0], gas: "100000" });
    assert.equal(bid, hash);
  });
});
