import React from "react";

class TenderList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tenders: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  getList() {
    return this.state.tenders.map((tender, index) => 
      <li key={index.toString()}>
        {console.log(tender)}
        <span>{tender.hash}</span>
        <span>{tender.name}</span>
      </li>
    )
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
      this.setState({tenders: data});
    }
  }
  
  getHash(str, algo = "SHA-256") {
    let strBuf = new TextEncoder('utf-8').encode(str);
    return crypto.subtle.digest(algo, strBuf)
      .then(hash => {
        window.hash = hash;
        // here hash is an arrayBuffer, 
        // so we'll connvert it to its hex version
        let result = '';
        const view = new DataView(hash);
        for (let i = 0; i < hash.byteLength; i += 4) {
          result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
        return result;
      });
  }

  render() {
    return(
      <div id="tender">
        <ul id="tenders-list">
          {this.getList()}
        </ul>
      </div>
    );
  }
}

export default TenderList;
