import React from "react";

class addField extends React.Component {
  state = {
    desc: "",
    quantity: ""
  };

  onInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onFieldSubmit = event => {
    event.preventDefault();
    this.props.onFieldSubmit(this.state);
  };
  
  render() {
    return (
      <form onSubmit={this.onFieldSubmit} style={{ display:"flex", width:"70%", flexDirection:"row"}}>
        <input type="text" style = {{ maxWidth : "13rem", padding : "0.5rem", marginRight: "1rem"}} placeholder="Description" id="desc" onChange={this.onInputChange} />
        <input type="number" style = {{ maxWidth : "13rem", padding : "0.5rem", marginRight: "1rem"}} placeholder="Quantity" id="quantity" onChange={this.onInputChange} />
        <button type="submit" style={{padding: "0.2rem 2rem", background: "#66CCCC", color: "white", border: "2px dotted #17a2b8", borderRadius: "3px"}}>Add</button>
      </form>
    );
  }
}

export default addField;
