/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyContext from './context/context';
import Transaction from './pages/Transaction_Page/Transaction';

function App() {
  const ApiKey = '9ae526ed6fbd187fe86fec56bea85500';
  const [baseCurrency, setMyBaseCurrency] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [dispWallet, setDispWallet] = useState(null);
  const [wallet, setWallet] = useState([]);
  const [fetchedCurrencyOptions, setFetchedCurrencyOptions] = useState([]);
  const [modal, setModal] = useState(false);
  const [fetchedCurrencyRates, setFetchedCurrencyRates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://data.fixer.io/api/latest?access_key=${ApiKey}`
        );
        const data = await response.json();
        setFetchedCurrencyOptions([...Object.keys(data.rates)]);
        setFetchedCurrencyRates(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const toogleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <MyContext.Provider
      value={{
        fetchedCurrencyOptions,
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
