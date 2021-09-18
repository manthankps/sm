import {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Welcome from './components/Welcome';
import Login from './components/Login';
import AccountEntry from './components/AccountEntry';
import {Route,Switch} from 'react-router-dom'
import Transaction from './components/Transaction';
import TransactionEntry from './components/TransactionEntry';

function App() {
  return (
    <Fragment>
    {/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div>*/}

      <div className="App">
        <Header/>
        {/* <Welcome/> */}
        <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/accountentry" component={AccountEntry}/>
        <Route path="/list" component={List}/>
        <Route path="/transaction/:id/:name" component={Transaction}/>
        <Route path="/transactionentry/:id/:name" component={TransactionEntry}/>
        </Switch>



        {/* <List/> */}
      </div>
    </Fragment>
  );
}

export default App;
