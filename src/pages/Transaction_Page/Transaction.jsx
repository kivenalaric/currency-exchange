import React, { useContext } from 'react';
import {
  Main,
  Hero,
  TransactionSection,
  Total,
  Button,
  HeroRight,
  HeroLeft,
  HeroImg,
  WalletMain,
  Select,
  AddBaseCurrSec,
} from './styles';
import Navbar from '../../components/mavbar';
import '../../App.css';
import DepositModal from '../../components/DepositModal/DepositModal';
import MyContext from '../../context/context';
import CurrencyCard from '../../components/currency-card/CurrencyCard';
import CloseBtn from '../../components/currency-card/CloseBtn/CloseBtn';
import { saveToLocalStorage, toBaseCurrency } from '../../services/utils';
import TransferModal from '../../components/transfer/TransferModal';

function Transaction() {
  const {
    modal,
    modal2,
    toogleModal,
    // fetchedCurrencyOptions,
    fetchedCurrencyRates,
    toogleModal2,
    dispWallet,
    transModal,
    toogleTransModal,
    setMyBaseCurrency,
    baseCurrency,
  } = useContext(MyContext);

  // const [base, setBase] = useState({ amount: 0, currency: '' });

  const addBaseCurrency = (e) => {
    const base = e.target.value;
    setMyBaseCurrency({ ...baseCurrency, baseCurr: base });
    const res = toBaseCurrency(dispWallet, baseCurrency, fetchedCurrencyRates);
    console.log({ dispWallet, baseCurrency, fetchedCurrencyRates });
    setMyBaseCurrency((prev) => ({ ...prev, baseAmnt: res }));
    saveToLocalStorage('default', base);
    toogleModal2();
  };

  return (
    <Main>
      <Navbar />
      <Hero>
        <HeroRight>
          <h1 className="welcome">Welcome to the Exchange App</h1>
          <h3>The Future of Exchange is here</h3>
          <small>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius unde
            accusamus maiores est exercitationem, incidunt rerum alias, numquam
            optio aut officiis! Beatae corporis velit labore porro. Culpa
            dolores voluptatum vero. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eius rerum ipsum natus quis unde minima laborum
            nobis est deleniti, quas, impedit architecto possimus consectetur
            laudantium asperiores. Assumenda libero temporibus exercitationem.
          </small>
        </HeroRight>
        <HeroLeft>
          <HeroImg
            src="http://localhost:3001/static/media/phone.e3e3b7c142a3f4511683.png"
            alt="phone"
          />
        </HeroLeft>
      </Hero>
      <TransactionSection>
        <Total>
          <Button type="button" onClick={toogleModal2}>
            Set Default
          </Button>
          {modal2 && (
            <AddBaseCurrSec>
              <CloseBtn onClick={toogleModal2} />
              <Select name="currency" id="money" onChange={addBaseCurrency}>
                {[...Object.keys(fetchedCurrencyRates)].map((option) => (
                  <option value={option} id="option" key={option}>
                    {option}
                  </option>
                ))}
              </Select>
              {/* <Button type="button" onClick={() => addBaseCurrency}>
                Add+
              </Button> */}
            </AddBaseCurrSec>
          )}
          <h2>
            <span>{baseCurrency.baseAmnt}</span>
            <span>{baseCurrency.baseCurr}</span>
          </h2>
          <Button type="button" onClick={toogleModal}>
            Deposit+
          </Button>
        </Total>
        <WalletMain>
          {dispWallet?.map((money) => (
            <CurrencyCard
              amount={money.amount}
              key={money.currency}
              currency={money.currency}
              onClick={toogleTransModal}
            />
          ))}
        </WalletMain>
      </TransactionSection>
      {transModal && <TransferModal />}
      {modal && <DepositModal />}
    </Main>
  );
}

export default Transaction;
