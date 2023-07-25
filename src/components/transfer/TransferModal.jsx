/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
import React, { useContext, useState } from 'react';
import { styled } from 'styled-components';
import MyContext from '../../context/context';

const Modal = styled.div`
  display: flex;
  z-index: 5;
  position: absolute;
  justify-self: center;
  flex-direction: column;
  top: 40%;
  left: 40%;
  padding: 10;
`;

const CurrencySec = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const Select = styled.select`
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
`;

function TransferModal() {
  const { fetchedCurrencyRates, toogleTransModal } = useContext(MyContext);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  const transferMoney = (e) => {
    e.preventDefault();
    console.log(fromCurrency, toCurrency, amount);
    toogleTransModal();
  };

  return (
    <Modal>
      <h2>Make a Transfer</h2>
      <button type="button" onClick={toogleTransModal}>
        close
      </button>

      <form onSubmit={transferMoney}>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(() => e.target.value)}
        />
        <p>Transfere From-To</p>
        <CurrencySec>
          <Select
            name="fromcurrency"
            id="frommoney"
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(() => e.target.value);
            }}
          >
            {[...Object.keys(fetchedCurrencyRates)].map((option) => (
              <option value={option} id="option" key={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            name="tocurrency"
            id="tomoney"
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(() => e.target.value);
            }}
          >
            {[...Object.keys(fetchedCurrencyRates)].map((option) => (
              <option value={option} id="option" key={option}>
                {option}
              </option>
            ))}
          </Select>
        </CurrencySec>
        <button type="submit">Transfer</button>
      </form>
    </Modal>
  );
}

export default TransferModal;
