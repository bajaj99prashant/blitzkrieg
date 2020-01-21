import React from "react";
import "./css/tenderList.css";
import factory from "../ethereum/factory";
// import web3 from "../ethereum/web3";

class TenderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tendersName: [],
      tendersDetails: []
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = async () => {
    console.log("start");
    const tenders = await factory.methods.getDeployedTenders().call();
    // const name = await factory.methods.getDeployedTendersDetails().call();
    this.setState({
      tendersName: tenders
    });
    console.log(this.state);
  };

  finalList = () => {
    console.log(this.state.tendersName);
    const x = this.state.tendersName;
    // console.log(typeof x.[0]);
    return this.state.tendersName.map(item => {
      console.log(item);
      return <li key={item}>{item}</li>;
    });
  };

  loadData() {
    let data = localStorage.getItem("tendersData");
    if (data === null) return;
    else {
      data = JSON.parse(data);
      this.setState({ tenders: data });
      // this.setState({
      //   tenders: this.state.tenders.concat([data])
      // });
    }
  }

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

  render() {
    return (
      <>
        <header></header>
        <ul>{this.finalList()}</ul>
      </>
    );
  }
}

export default TenderList;
