import React from 'react';

class addField extends React.Component {
    state = {
        desc: '',
        quantity: ''
    }

    onInputChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    onFieldSubmit = (event) => {
        event.preventDefault();
        this.props.onFieldSubmit(this.state);

    };
    render(){
        return(
            <form onSubmit={this.onFieldSubmit}>
                <input
                    type="text"
                    id="desc"
                    onChange={this.onInputChange}
                />
                <input 
                    type="number"
                    id="quantity"
                    onChange={this.onInputChange}
                />
            <button type="submit">Add</button>
            </form>
        );
    }
}

export default addField;