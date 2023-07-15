import React, { useState, useContext } from 'react';
import {
  Main,
  MainM,
  DepositInput,
  DepositForm,
  Inputsec,
  Input,
  Select,
} from './styles';
import { Button } from '../../pages/Transaction_Page/styles';
import MyContext from '../../context/context';
import { saveToLocalStorage } from '../../services/utils';
import CloseBtn from '../currency-card/CloseBtn/CloseBtn';

function DepositModal() {
  const [money, setMoney] = useState({ amount: 0, currency: '' });
  const {
    wallet,
    dispWallet,
    setDispWallet,
    fetchedCurrencyOptions,
    toogleModal,
  } = useContext(MyContext);
  const depositToWallet = () => {
    const prevCur = dispWallet.find((wall) => wall.currency === money.currency);
    if (prevCur) {
      const update = dispWallet.map((cur) => {
        if (cur.currency === money.currency) {
          return { ...cur, amount: +cur.amount + +money.amount };
        }
        return cur;
      });

      setDispWallet([...update]);
      saveToLocalStorage('wallet', [...update]);
      return;
    }
    const update = wallet;
    update.push(money);
    setDispWallet([...update]);

    saveToLocalStorage('wallet', [...update]);
  };

  const handleAmntChange = (e) => {
    setMoney((prev) => ({
      ...prev,
      amount: e.target.value,
    }));
  };

  const handleCurrChange = (e) => {
    setMoney((prev) => ({
      ...prev,
      currency: e.target.value,
    }));
  };

  return (
    <Main>
      <CloseBtn onClick={toogleModal} />
      <MainM>
        <h1>Make a deposit!</h1>
        <DepositInput>
          <DepositForm
            onSubmit={(e) => {
              e.preventDefault(e);
              depositToWallet();
              toogleModal();
            }}
          >
            <Inputsec>
              <Input
                type="number"
                id="amount"
                value={money.amount}
                placeholder="Make Deposit here"
                onChange={handleAmntChange}
                required
              />
              <Select
                name="currency"
                id="money"
                value={money.currency}
                onChange={handleCurrChange}
              >
                {fetchedCurrencyOptions.map((option) => (
                  <option value={option} id="option" key={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Inputsec>
            <Button type="submit">Deposit +</Button>
          </DepositForm>
        </DepositInput>
      </MainM>
    </Main>
  );
}

export default DepositModal;
