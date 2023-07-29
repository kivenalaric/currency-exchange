/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyContext from './context/context';
import Transaction from './pages/Transaction_Page/Transaction';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  sumWallet,
} from './services/utils';

function App() {
  const ApiKey = '763ac14c06-6e2d349805-ryjk1z';
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  const [baseCurrency, setMyBaseCurrency] = useState({
    baseAmnt: 0,
    baseCurr: '',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [dispWallet, setDispWallet] = useState(null);
  const [wallet, setWallet] = useState([]);
  const [modal, setModal] = useState(false);
  const [transModal, setTransModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [fetchedCurrencyRates, setFetchedCurrencyRates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.fastforex.io/fetch-all?api_key=${ApiKey}`,
          options
        );
        const data = await response.json();
        setFetchedCurrencyRates(data.results);
        const baseC = getFromLocalStorage('baseCurr');
        const baseA = getFromLocalStorage('baseAmount');
        if (!baseC && !baseA) {
          setMyBaseCurrency((prev) => ({
            ...prev,
            baseCurr: data.base,
            baseAmnt: 0,
          }));
          saveToLocalStorage('baseCurr', data.base);
          saveToLocalStorage('baseAmount', baseCurrency.baseAmnt);
        }
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();

    const walletFromLocalStorage = getFromLocalStorage('wallet') || [];
    // const baseFromLocalStorage = getFromLocalStorage('baseCurr');
    // setMyBaseCurrency(baseFromLocalStorage);
    sumWallet(
      walletFromLocalStorage,
      baseCurrency.baseCurr,
      fetchedCurrencyRates
    );

    setDispWallet(walletFromLocalStorage);
    const basetotal = getFromLocalStorage('baseAmount') || 0;
    setMyBaseCurrency((prev) => ({ ...prev, baseAmnt: basetotal }));
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
