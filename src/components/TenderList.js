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
      tendersName: this.state.tendersName.concat([tenders])
    });
    // this.setState({
    //   tendersDetails: this.state.tendersDetails.concat([name])
    // });
    console.log(tenders);
    // console.log(name);
    console.log(this.state);
    return <div>this is a list</div>;
    // return this.state.tenders.map((tender, index) => (
    //   // <li key={index.toString()}>
    //   // {console.log(tender)}
    //   <tr>
    //     <td>{tender.name}</td>
    //     <td>{tender.hash}</td>
    //     <td>
    //       <button>Evaluate</button>
    //     </td>
    //   </tr>
    // ));
  };

  // saveData() {
  //   let data = [];

  //   for (let i = 0; i < 5; i++) {
  //     this.getHash(toString(i+4234))
  //       .then(hash => {
  //         data.push({
  //           hash: hash,
  //           title: this.titles[i],
  //         });
  //       })
  //   }
  //   localStorage.setItem("tenderData", data);
  // }

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
        {/* <div id="tender"> */}
        {/* <table id="tenders-list">
          <th>Tender name</th>
          <th>Teneder Hash</th>
          <th>Evaluate</th> */}
        <div>{this.state.name}</div>
        {/* </table> */}
        {/* </div> */}
      </>
    );
  }
}

export default TenderList;
