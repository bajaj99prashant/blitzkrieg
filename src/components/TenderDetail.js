import React from 'react';
import { useParams } from 'react-router-dom';

class TenderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenderID: ""
    }
  }

  getID() {
    let id = this.props.match.params.id;
    return (
      <h3>{id}</h3>
    )
  }

  render() {
    return(
      <div id="tender">
        {this.getID()}
      </div>
    )
  }
}

export default TenderDetail;