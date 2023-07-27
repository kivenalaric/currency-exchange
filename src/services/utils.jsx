/* eslint-disable consistent-return */

import { render } from 'react-dom';

/* eslint-disable no-param-reassign */
export const getFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const saveToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const toBaseCurrency = (wallets, baseCurrency, rates) => {
  let total = 0;
  wallets.forEach(({ currency, amount }) => {
    if (currency === baseCurrency.baseCurr) {
      total += +amount;
    } else {
      // calculate exhange;
      const res = (+amount / rates[currency]) * rates[baseCurrency.baseCurr];
      total += res;
    }
  });
  saveToLocalStorage('baseAmount', total);
  return total;
};

export function sumWallet(wallet, base, rates) {
  let total = 0;
  wallet.forEach(({ currency, amount }) => {
    if (currency === base) {
      total += +amount;
    } else {
      const res = (+amount / rates[currency]) * rates[base];
      total += +res;
    }
  });
  saveToLocalStorage('baseAmount', total);
  return total;
}

export function transferMoney(wallets, from, to, amount, rates) {
  // find the index of the wallets in the array
  const fromIndex = wallets.findIndex((wallet) => wallet.currency === from);
  const toIndex = wallets.findIndex((wallet) => wallet.currency === to);

  // check if both wallets exist in the array
  if (fromIndex === -1 || toIndex === -1) {
    setTimeout(() => {
      alert('Invalid currency');
    }, 3000);
    throw Error('invalid currency');
  }

  // calculate the amount to be transferred using the exchange rates
  const exchangeRate = rates[to] / rates[from];
  const transferAmount = amount * exchangeRate;

  // check if there is enough balance in the from wallet
  if (wallets[fromIndex].amount < amount) {
    setTimeout(() => {
      alert('Insufficient balance');

      // return <p>Insufficient balance</p>;
    }, 3000);
    throw Error('Insufficient balance');
  }
  // ReactModal('Insufficient balance');

  // update the amounts in the wallets
  wallets[fromIndex].amount -= amount;
  wallets[toIndex].amount += transferAmount;
  setTimeout(() => {
    render(`Transferred ${amount} ${from} to ${to}`);
    // return (
    //   <p>
    //     Transferred {amount} {from} to {to}
    //   </p>
    // );
  }, 3000);

  // console.log(`Transferred ${amount} ${from} to ${to}`);
  // console.log(wallets, from, to, amount);
  return transferAmount;
}
