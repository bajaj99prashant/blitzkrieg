import React from 'react';
import CreateForm from './CreateForm';
import web3 from './web3';

class App extends React.Component {
    render(){
        web3.eth.getAccounts().then(console.log);
        return(
            <CreateForm />
        );
    }
}

export default App;