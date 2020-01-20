import React from 'react';
import Addfield from './addfeild';
import UploadFile from './uploadFile';

class CreateForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            startDate: '',
            tenderName: '',
            lastDate: '',
            managerNumber: '',
            managerEmail: '',
            bidOpening: '',
            description: [],
            Quantity: []
        };
    }

    // componentDidMount(){
        // this.onAddSubmit({desc: '', quantity: 0});
    // }

    onAddSubmit = (value) => {
        this.setState({ 
            description: this.state.description.concat([value.desc])
          })
        this.setState({ 
            Quantity: this.state.Quantity.concat([(value.quantity)])
        })
    }
    

    onInputChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    onFormSubmit = (event) =>{
        let temp;
        event.preventDefault();
        temp = (new Date(this.state.startDate).getTime() / 1000);
        this.setState({ startDate: temp});
        temp = (new Date(this.state.lastDate).getTime() / 1000);
        this.setState({ lastDate: temp});
        temp = (new Date(this.state.bidOpening).getTime() / 1000);
        this.setState({ bidOpening: temp});
        console.log(this.state);
    }

    renderDescription() {
        return this.state.description.map(item => {
            console.log(item)
            return (
                <span>{item}</span>
            );
        });
    }

    renderQuantity() {
        return this.state.Quantity.map(item => {
            console.log(item)
            return (
                <span>{item}</span>
            );
        });
    }

    render() {
        return(
            <div className="form">
                <form onSubmit={this.onFormSubmit}>
                    <label htmlFor="tenderName">Tender Name</label>
                    <input 
                        id="tenderName" 
                        type="text"
                        onChange={this.onInputChange}
                    />
                    <br /><label htmlFor="startDate">Start Date</label>
                    <input
                        id="startDate" 
                        type="date"
                        onChange={this.onInputChange}
                    />
                    <br /><label htmlFor="lastDate">Last Date</label>
                    <input
                        id="lastDate" 
                        type="date"
                        onChange={this.onInputChange}
                    />
                    <br /><label htmlFor="managerNumber">Manager Number</label>
                    <input 
                        id="managerNumber" 
                        type="text"
                        onChange={this.onInputChange}
                    />
                    <br /><label htmlFor="managerEmail">Manager Email</label>
                    <input 
                        id="managerEmail" 
                        type="email"
                        onChange={this.onInputChange}
                    />
                    <br /><label htmlFor="bidOpening">Bid Opening Date</label>
                    <input
                        id="bidOpening" 
                        type="date"
                        onChange={this.onInputChange}
                    />
                    <br /><button type="submit">Submit</button>
                </form>

                <div> <br />{this.renderDescription()} {this.renderQuantity()} <br /></div>
                <Addfield onFieldSubmit={this.onAddSubmit}/>
                <UploadFile/>
                
            </div>
        );
    }
}

export default CreateForm;