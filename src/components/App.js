import React from 'react';
import CreateForm from './CreateForm';
import TenderList from './TenderList';
// import web3 from './web3';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

const App = () => {
  // web3.eth.getAccounts().then(console.log);
  return(
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CreateForm}/>
        <Route path="/tenders" exact component={TenderList}/>
      </Switch>
    </Router>
  );
}

export default App;