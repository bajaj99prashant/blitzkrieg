import React from "react";
import "./css/header.css";

class header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="img1"></div>
        <div>
          <h1 className="head">GAIL Procurement Portal</h1>
        </div>
        <div className="img2"></div>
      </div>
    );
  }
}

export default header;
