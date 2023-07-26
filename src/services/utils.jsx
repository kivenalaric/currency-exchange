/* eslint-disable no-plusplus */
export const getFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const saveToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

// export const toBaseCurrency = (wallets, baseCurrency, rates) => {
//   let total = 0;
//   for (let i = 0; i < wallets.length; i++) {
//     const wallet = wallets[i];
//     let { amount } = wallet;
//     const { currency } = wallet;
//     if (currency !== baseCurrency) {
//       amount *= baseCurrency;
//     }
//     total += amount;
//   }
//   return total;
// };

export const toBaseCurrency = (wallets, baseCurrency, rates) => {
  let total = 0;
  wallets.forEach(({ currency, amount }) => {
    if (currency === baseCurrency.baseCurr) {
      total += +wallets.amount;
    } else {
      // calculate exhange;
      const res = (+amount / rates[currency]) * rates[baseCurrency.baseCurr];
      total += res;
    }
  });
  saveToLocalStorage('baseAmount', total);
  return total;
};

// export const transferMoney = (wallet, fromCurr, toCCurr) => {
//   let amount;
// }

// export const transferMoney = (amount, fromCurrency, toCurrency) => {
//   // find the index of the 'from' wallet in the array
//   const fromIndex = wallets.findIndex(
//     (wallet) => wallet.currency === fromCurrency
//   );
//   if (fromIndex === -1) {
//     throw new Error(`Wallet ${fromCurrency} not found`);
//   }
//   // find the index of the 'to' wallet in the array
//   const toIndex = wallets.findIndex((wallet) => wallet.currency === toCurrency);
//   if (toIndex === -1) {
//     throw new Error(`Wallet ${toCurrency} not found`);
//   }
//   // check if the 'from' wallet has enough balance
//   if (wallets[fromIndex].amount < amount) {
//     throw new Error(`Insufficient balance in ${fromCurrency} wallet`);
//   }
//   // update the wallets array with the transferred amount
//   const updatedWallets = [...wallets];
//   updatedWallets[fromIndex].amount -= amount;
//   updatedWallets[toIndex].amount += amount;
//   // update the state with the new wallets array
//   setWallets(updatedWallets);
// };
