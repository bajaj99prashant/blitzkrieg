import React, { Component } from "react";
import CreateForm from "./CreateForm";
import TenderList from "./TenderList";
import Evaluate from "./Evaluate";

import factory from "../ethereum/factory";
import deploy from "../ethereum/deploy";

import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
const compiledFactory = require("../ethereum/build/TenderFactory.json");
const compiledTender = require("../ethereum/build/Tender.json");

class App extends Component {
  state = {
    act: []
  };
  componentDidMount() {
    this.loadBlockchain();
  }

  formDetails = async values => {
    await factory.methods
      .createTender(
        values.tenderName,
        values.startDate,
        values.lastDate,
        values.bidOpening,
        values.managerNumber,
        values.managerEmail
      )
      .send({
        from: this.state.act[0],
        gas: "1000000"
      });
  };
  async loadBlockchain() {
    const ethereum = window.ethereum;
    if (ethereum) {
      const accounts = await ethereum.enable();
      this.setState({ act: this.state.act.concat([accounts]) });
      console.log(accounts[0]);
      // deploy();
      console.log(factory.options.address);
    }
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <CreateForm onSubmission={this.formDetails} />}
          />
          <Route path="/tenders" exact component={TenderList} />
          <Route path="/evaluate" exact component={Evaluate} />
        </Switch>
      </Router>
    );
  }
}

export default App;
