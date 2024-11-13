/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }


  /* Fetch credits and debits data when component mounts */
  componentDidMount = async () => {
    /* Assuming the data is located in a local folder, adjust paths as needed */
    const credits = await fetch('credits.json').then(res => res.json());
    const debits = await fetch('debits.json').then(res => res.json());
    
    /* Set creditList and debitList, then calculate the initial balance */
    this.setState({ creditList: credits, debitList: debits }, this.calculateBalance);
  }

  /* Calculate the account balance based on credits and debits */
  calculateBalance = () => {
    const totalCredits = this.state.creditList.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebits = this.state.debitList.reduce((sum, debit) => sum + debit.amount, 0);
    const balance = (totalCredits - totalDebits).toFixed(2); // Round to 2 decimal places
    this.setState({ accountBalance: balance });
  }


  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;