import React from 'react';
import CreateForm from './CreateForm';
import TenderList from './TenderList';
import Evaluate from './Evaluate';
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
        <Route path="/evaluate" exact component={Evaluate}/>
      </Switch>
    </Router>
  );
}

export default App;