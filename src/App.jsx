import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const ApiKey = '4916f6bf3ce83e632400a62c535089a1';
  const [myCurrency, setMycurrency] = useState();
  const [currencies, setCurrencies] = useState();
  const [myCurrency1, setMycurrency1] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.exchangeratesapi.io/v1/latest?access_key=${ApiKey}`
        );
        const data = await response.json();
        setCurrencies(data);
        localStorage.setItem('rates', JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    // fetch(`https://api.freecurrencyapi.com/v1latest?apikey=${ApiKey}`, options)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     // const firstRate = Object.keys(res.results)[2];
    //     // setCurrencyOptions([...Object.keys(res.results)]);
    //     // setExchangeRates(res.results);
    //   })
    //   .catch((err) => console.error('error ocured', err));
  }, []);

  const saveToLs = () => {
    const data = localStorage.setItem('currencies', JSON.stringify(myCurrency));
    console.log(data);
    return data;
  };
  const getFromLs = () => {
    const data1 = localStorage.getItem('rates');
    const data2 = JSON.parse(data1);
    setMycurrency1(data2);
    console.log(data2);
    return data2;
  };
  return (
    <div id="main">
      <div id="nav">
        <h2>logo</h2>
        <h2>menu</h2>
      </div>
      <div id="hero">
        <h1 className="welcome">Welcome to the Exchange App</h1>
        <input
          type="text"
          placeholder="type the currency"
          onChange={(e) => setMycurrency(e.target.value)}
        />
        <button type="button" onClick={saveToLs}>
          Set Data
        </button>
        <button type="button" onClick={getFromLs}>
          Get Data
        </button>
        {currencies ? <p>fetched and saved </p> : <p>still fetching</p>}
        {/* <p>{currencies}</p> */}
        <p>{myCurrency1}</p>
      </div>
    </div>
  );
}

export default App;
