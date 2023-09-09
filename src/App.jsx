/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyContext from './context/context';
import Transaction from './pages/Transaction_Page/Transaction';
import { getFromLocalStorage, saveToLocalStorage } from './services/utils';

function App() {
<<<<<<< HEAD
  const ApiKey = '221306e5ac49f3bf88ef51ceccc3071d';
  // yoxaheg448@cohodl.com
  // const ApiKey = '5e5a7f8b86a4aca140b2eaa34ea38589';
=======
  const ApiKey = '763ac14c06-6e2d349805-ryjk1z';
  const options = { method: 'GET', headers: { accept: 'application/json' } };
>>>>>>> f1900768d50b838439e97213b6e8f35fba34692b
  const [baseCurrency, setMyBaseCurrency] = useState({
    baseAmnt: 0,
    baseCurr: '',
  });
  const [dispWallet, setDispWallet] = useState(null);
  const [wallet, setWallet] = useState([]);
  const [modal, setModal] = useState(false);
  const [transModal, setTransModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [fetchedCurrencyRates, setFetchedCurrencyRates] = useState([]);

  useEffect(() => {
    const baseC = getFromLocalStorage('baseCurr');
    const baseA = getFromLocalStorage('baseAmount');
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.fastforex.io/fetch-all?api_key=${ApiKey}`,
          options
        );
        const data = await response.json();
<<<<<<< HEAD
        // console.log(data);
        // setFetchedCurrencyOptions([
        //   {
        //     ...fetchedCurrencyOptions,
        //     currency: [...Object.keys(data.rates)],
        //     rates: data,
        //   },
        // ]);
        // setFetchedCurrencyOptions([...Object.keys(data.rates)]);
        setFetchedCurrencyRates(data.rates);
        setMyBaseCurrency((prev) => ({ ...prev, baseCurr: data.base }));
        saveToLocalStorage('baseCurr', data.base);
        saveToLocalStorage('baseAmount', 0);
=======
        setFetchedCurrencyRates(data.results);
        if (!baseC && !baseA) {
          setMyBaseCurrency((prev) => ({
            ...prev,
            baseCurr: data.base,
            baseAmnt: 0,
          }));
          saveToLocalStorage('baseCurr', data.base);
          saveToLocalStorage('baseAmount', baseCurrency.baseAmnt);
        } else {
          setMyBaseCurrency((prev) => ({
            ...prev,
            baseCurr: baseC,
            baseAmnt: baseA,
          }));
        }
>>>>>>> f1900768d50b838439e97213b6e8f35fba34692b
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();

    const walletFromLocalStorage = getFromLocalStorage('wallet') || [];
    // const baseFromLocalStorage = getFromLocalStorage('baseCurr');
    // setMyBaseCurrency(baseFromLocalStorage);
    // sumWallet(
    //   walletFromLocalStorage,
    //   baseCurrency.baseCurr,
    //   fetchedCurrencyRates
    // );

    setDispWallet(walletFromLocalStorage);
    setMyBaseCurrency((prev) => ({ ...prev, baseAmnt: baseA }));
  }, []);

  const toogleModal2 = () => {
    setModal2((prev) => !prev);
  };

  const toogleModal = () => {
    setModal((prev) => !prev);
  };

  const toogleTransModal = () => {
    setTransModal((prev) => !prev);
  };

  return (
    <MyContext.Provider
      value={{
        // fetchedCurrencyOptions,
        fetchedCurrencyRates,
        toogleModal,
        modal,
        wallet,
        setWallet,
        baseCurrency,
        setMyBaseCurrency,
        dispWallet,
        setDispWallet,
        toogleModal2,
        modal2,
        transModal,
        toogleTransModal,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
