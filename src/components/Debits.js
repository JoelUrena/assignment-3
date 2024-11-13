/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view. */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description') setDescription(value);
    else if (name === 'amount') setAmount(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDebit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };
    props.addDebit(newDebit);
    setDescription(''); // Clear the form after submission
    setAmount('');
  };

  // Create the list of Debit items
  const debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {
      let date = debit.date.slice(0, 10);
      return (
        <li key={debit.id}>
          ${debit.amount.toFixed(2)} - {debit.description} - {date}
        </li>
      );
    });
  };

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <AccountBalance accountBalance={props.accountBalance} />
      <Link to="/">Return to Home</Link>
      <hr />
      <h2>Add Debit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <button type="submit">Add Debit</button>
      </form>
      <hr />
      <h2>Debits List</h2>
      <ul>{debitsView()}</ul>
    </div>
  );
};

export default Debits;


