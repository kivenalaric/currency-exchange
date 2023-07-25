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
