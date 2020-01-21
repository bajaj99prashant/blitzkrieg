import React from "react";
import "./css/tenderList.css";

class TenderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tenders: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  getList() {
    return this.state.tenders.map((tender, index) => (
      // <li key={index.toString()}>
      // {console.log(tender)}
      <tr key={index.toString()}>
        <td>{tender.name}</td>
        <td>{tender.hash}</td>
        <td>
          <button>Evaluate</button>
        </td>
      </tr>
    ));
  }

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
        <div id="tender">
          <table id="tenders-list">
            <th>Tender name</th>
            <th>Teneder Hash</th>
            <th>Evaluate</th>
            {this.getList()}
          </table>
        </div>
      </>
    );
  }
}

export default TenderList;
