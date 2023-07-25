/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyContext from './context/context';
import Transaction from './pages/Transaction_Page/Transaction';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  toBaseCurrency,
} from './services/utils';

function App() {
  const ApiKey = '4916f6bf3ce83e632400a62c535089a2';
  const [baseCurrency, setMyBaseCurrency] = useState({
    baseAmnt: 0,
    baseCurr: '',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [dispWallet, setDispWallet] = useState(null);
  const [wallet, setWallet] = useState([]);
  // const [fetchedCurrencyOptions, setFetchedCurrencyOptions] = useState([]);
  const [modal, setModal] = useState(false);
  const [transModal, setTransModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [fetchedCurrencyRates, setFetchedCurrencyRates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://data.fixer.io/api/latest?access_key=${ApiKey}`
        );
        const data = await response.json();
        console.log(data);
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
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();

    const walletFromLocalStorage = getFromLocalStorage('wallet') || [];
    toBaseCurrency(walletFromLocalStorage, baseCurrency, fetchedCurrencyRates);
    const basetotal = getFromLocalStorage('baseAmnt') || 0;
    setMyBaseCurrency((prev) => ({ ...prev, baseAmnt: basetotal }));
    setDispWallet(walletFromLocalStorage);
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
        totalAmount,
        setTotalAmount,
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
