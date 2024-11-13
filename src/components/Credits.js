/*==================================================
src/components/Credits.js

The Credits component contains information for the Credits page view.
==================================================*/
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newCredit = {
      description: this.state.description,
      amount: parseFloat(this.state.amount),
      date: new Date().toISOString(),
    };
    this.props.addCredit(newCredit);
    this.setState({ description: '', amount: '' }); // Clear the form
  };

  render() {
    const creditsDisplay = this.props.credits.map((credit, index) => (
      <div key={index}>
        <p>Description: {credit.description}</p>
        <p>Amount: {credit.amount.toFixed(2)}</p>
        <p>Date: {credit.date.substring(0, 10)}</p>
      </div>
    ));

    return (
      <div>
        <h1>Credits</h1>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <Link to="/">Return to Home</Link>
        <hr />
        <h2>Add Credit</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              required
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              step="0.01"
              name="amount"
              onChange={this.handleChange}
              value={this.state.amount}
              required
            />
          </div>
          <button type="submit">Add Credit</button>
        </form>
        <hr />
        <h2>Credits List</h2>
        {creditsDisplay}
      </div>
    );
  }
}

export default Credits;