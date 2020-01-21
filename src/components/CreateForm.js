import React from "react";
import Addfield from "./addfeild";
import UploadFile from "./uploadFile";
import Header from "./header";
import "./css/CreateForm.css";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    // localStorage.clear();
    this.state = {
      startDate: "",
      tenderName: "",
      lastDate: "",
      managerNumber: "",
      managerEmail: "",
      bidOpening: "",
      description: [],
      Quantity: []
    };
  }

  // componentDidMount(){
  // this.onAddSubmit({desc: '', quantity: 0});
  // }

  onAddSubmit = value => {
    this.setState({
      description: this.state.description.concat([value.desc])
    });
    this.setState({
      Quantity: this.state.Quantity.concat([value.quantity])
    });
  };

  onInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    const startDate = new Date(this.state.startDate).getTime() / 1000;
    // this.setState({ startDate: temp });
    const lastDate = new Date(this.state.lastDate).getTime() / 1000;
    // this.setState({ lastDate: temp });
    const bidDate = new Date(this.state.bidOpening).getTime() / 1000;
    // this.setState({ bidOpening: temp });
    console.log(startDate, lastDate, bidDate);

    // save data to localstorage
    // console.log("saving...");
    // var old = localStorage.getItem("tendersData");
    // var data = [];
    // if (old !== null) {
    //   data = old;
    //   data = JSON.parse(data);
    // }
    // this.getHash(this.state.tenderName).then(hash => {
    //   data.push({
    //     name: this.state.tenderName,
    //     details: this.state,
    //     hash: hash
    //   });
    //   localStorage.setItem("tendersData", JSON.stringify(data));
    //   console.log(data);
    // });
    const accounts = await web3.eth.getAccounts();
    await factory.methods
      .createTender(
        this.state.tenderName,
        startDate,
        lastDate,
        bidDate,
        this.state.managerNumber,
        this.state.managerEmail
      )
      .send({
        from: accounts[0],
        gas: "1000000"
      });
    // this.props.onSubmission(this.state);
  };

  getHash(str, algo = "SHA-256") {
    let strBuf = new TextEncoder("utf-8").encode(str);
    return crypto.subtle.digest(algo, strBuf).then(hash => {
      window.hash = hash;
      // here hash is an arrayBuffer,
      // so we'll connvert it to its hex version
      let result = "";
      const view = new DataView(hash);
      for (let i = 0; i < hash.byteLength; i += 4) {
        result += ("00000000" + view.getUint32(i).toString(16)).slice(-8);
      }
      return result;
    });
  }

  renderDescription() {
    return this.state.description.map(item => {
      console.log(item);
      return <li>{item}</li>;
    });
  }

  renderQuantity() {
    return this.state.Quantity.map(item => {
      console.log(item);
      return <li>{item}</li>;
    });
  }

  render() {
    return (
      <>
        <Header />
        <h1 className="formHead">Tender Details</h1>
        <div className="form">
          <form onSubmit={this.onFormSubmit} className="mainForm">
            <div className="formFlex">
              <label htmlFor="tenderName">Tender Name</label>
              <input
                id="tenderName"
                className="formInput"
                type="text"
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div className="formFlex">
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                className="formInput"
                type="date"
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div className="formFlex">
              <label htmlFor="lastDate">Last Date</label>
              <input
                id="lastDate"
                className="formInput"
                type="date"
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div className="formFlex">
              <label htmlFor="managerNumber">Manager Number</label>
              <input
                id="managerNumber"
                className="formInput"
                type="text"
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div className="formFlex">
              <label htmlFor="managerEmail">Manager Email</label>
              <input
                id="managerEmail"
                className="formInput"
                type="email"
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div className="formFlex">
              <label htmlFor="bidOpening">Bid Opening Date</label>
              <input
                id="bidOpening"
                className="formInput"
                type="date"
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <button type="submit" className="submitBtn">
              Create
            </button>
          </form>
          <Addfield onFieldSubmit={this.onAddSubmit} />
          <br />
          <div className="listDiv">
            <ul className="list1">{this.renderDescription()}</ul>
            <ul className="list2">{this.renderQuantity()}</ul>
          </div>
          <UploadFile />
        </div>
      </>
    );
  }
}

export default CreateForm;
