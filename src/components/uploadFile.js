import React from 'react';

class UploadFile extends React.Component{
    uploadFileHandler = e => {
        const data = new FormData();
        data.append('file', e.target.files[0]);
    }

    render() {
        return (
            <form>
                <input type="file" onChange={this.uploadFileHandler} />
                <button type="submit">Upload</button>
            </form>
        );
    }
}

export default UploadFile;