/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';

function CurrencyCard({ amount, currency }) {
  return (
    <div className="main">
      <div className="cardleft">
        <p className="amount">{amount}</p>
        <img
          src="https://www.svgrepo.com/show/8815/coin.svg"
          alt="currency icon"
        />
      </div>
      <div className="cardright">
        <p>{currency}</p>
        <button type="button">convert</button>
      </div>
    </div>
  );
}

export default CurrencyCard;
