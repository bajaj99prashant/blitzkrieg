import React, { Component } from "react";
import CreateForm from "./CreateForm";
import TenderList from "./TenderList";
import Evaluate from "./Evaluate";
import Web3 from "web3";

import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
const compiledFactory = require("../ethereum/build/TenderFactory.json");
const compiledTender = require("../ethereum/build/Tender.json");

let accounts;
let factory;
let tenderAddress;
let tender;

var dateObj = new Date();
dateObj.setDate(dateObj.getDate() + 1);
const startDate = Math.floor(dateObj.getTime() / 1000);
const bidDate = Math.floor(new Date().getTime() / 1000);

class App extends Component {
  // web3.eth.getAccounts().then(console.log);
  componentDidMount() {
    this.loadBlockchain();
  }
  async loadBlockchain() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    console.log(network);

    const ethereum = window.ethereum;
    if (ethereum) {
      // ethereum.on("accountsChanged", function(accounts) {
      //   console.log(accounts[0]);
      // });
      const accounts = await ethereum.enable();
      console.log(accounts[0]);

      factory = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
      )
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
      console.log(factory.options.address);
      console.log(tender.options.address);

    //   await tender.methods
    //     .addItem("steel pipe", 1200)
    //     .send({ from: accounts[0], gas: "100000" });
    //   const item = await tender.methods.items(0).call();
    //   console.log(item);
    // }
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={CreateForm} />
          <Route path="/tenders" exact component={TenderList} />
          <Route path="/evaluate" exact component={Evaluate} />
        </Switch>
      </Router>
    );
  }
}

export default App;
