import React from "react";
import Addfield from "./addfeild";
import UploadFile from "./uploadFile";
import Header from "./header";
import "./css/CreateForm.css";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);

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

  onFormSubmit = event => {
    let temp;
    event.preventDefault();
    temp = new Date(this.state.startDate).getTime() / 1000;
    this.setState({ startDate: temp });
    temp = new Date(this.state.lastDate).getTime() / 1000;
    this.setState({ lastDate: temp });
    temp = new Date(this.state.bidOpening).getTime() / 1000;
    this.setState({ bidOpening: temp });
    console.log(this.state);
  };

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
