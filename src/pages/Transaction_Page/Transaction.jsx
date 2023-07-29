import React, { useContext } from 'react';
import styled from 'styled-components';
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
// import Photo from "../../public/pngegg.png";
import Navbar from '../../components/mavbar';
import '../../App.css';
import DepositModal from '../../components/DepositModal/DepositModal';
import MyContext from '../../context/context';
import CurrencyCard from '../../components/currency-card/CurrencyCard';
import CloseBtn from '../../components/currency-card/CloseBtn/CloseBtn';
import { saveToLocalStorage, sumWallet } from '../../services/utils';
import TransferModal from '../../components/transfer/TransferModal';

const BaseM = styled.h2`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  @media only screen and (max-width: 425px) {
    font-size: 1.1rem;
    gap: 0.2rem;
  }
`;

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
    const res = sumWallet(dispWallet, base, fetchedCurrencyRates);
    setMyBaseCurrency((prev) => ({ ...prev, baseAmnt: res }));
    saveToLocalStorage('baseCurr', base);
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
            Lorema ipsuma dolor sit amet consectetur, adipisicing elit. Eius
            unde accusamus maiores ests exercitationem, incidunt rerum alias,
            numquam optio aut officiis! Beatae corporis velit labore porro.
            Culpa dolores voluptatum vero. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eius rerum ipsum natus quis unde
            minima laborum nobis est deleniti, quas, impedit architecto possimus
            consectetur laudantium asperiores. Assumenda libero temporibus
            exercitationem.
          </small>
        </HeroRight>
        <HeroLeft>
          <HeroImg
            src="https://o.remove.bg/downloads/8e19f4a7-7f0c-43f3-add1-6ffd018c3fe7/2105281-middle-removebg-preview.png"
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
          <BaseM>
            Total:
            <span>{baseCurrency.baseAmnt}</span>
            <span>{baseCurrency.baseCurr}</span>
          </BaseM>
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
