import React from "react";

class UploadFile extends React.Component {
  uploadFileHandler = e => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
  };

  render() {
    return (
      <form>
        <input type="file" onChange={this.uploadFileHandler} style={{ width: "13rem", marginRight: "1rem", marginTop: "1rem" }} />
      </form>
    );
  }
}

export default UploadFile;
