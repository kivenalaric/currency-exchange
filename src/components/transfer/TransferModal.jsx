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
  const { fetchedCurrencyRates, toogleTransModal, dispWallet, setDispWallet } =
    useContext(MyContext);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  //   const transferMoney = (e) => {
  //     e.preventDefault();
  //     console.log(fromCurrency, toCurrency, amount);
  //     toogleTransModal();
  //   };
  const transferMoney = (e) => {
    e.preventDefault();
    // find the index of the 'from' wallet in the array
    const fromIndex = dispWallet.findIndex(
      (wallet) => wallet.currency === fromCurrency
    );
    if (fromIndex === -1) {
      throw new Error(`Wallet ${fromCurrency} not found`);
    }
    // find the index of the 'to' wallet in the array
    const toIndex = dispWallet.findIndex(
      (wallet) => wallet.currency === toCurrency
    );
    if (toIndex === -1) {
      throw new Error(`Wallet ${toCurrency} not found`);
    }
    // check if the 'from' wallet has enough balance
    if (dispWallet[fromIndex].amount < amount) {
      throw new Error(`Insufficient balance in ${fromCurrency} wallet`);
    }
    // update the wallets array with the transferred amount
    const updatedWallets = [...dispWallet];
    updatedWallets[fromIndex].amount -= amount;
    updatedWallets[toIndex].amount += amount;
    // update the state with the new wallets array
    setDispWallet(updatedWallets);
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
