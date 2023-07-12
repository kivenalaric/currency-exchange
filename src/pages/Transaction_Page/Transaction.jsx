import React, { useContext, useEffect } from 'react';
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
} from './styles';
import Navbar from '../../components/mavbar';
import '../../App.css';
import DepositModal from '../../components/DepositModal/DepositModal';
import MyContext from '../../context/context';
import { getFromLocalStorage } from '../../services/utils';
import CurrencyCard from '../../components/currency-card/CurrencyCard';

function Transaction() {
  const { modal, toogleModal, dispWallet, setDispWallet } =
    useContext(MyContext);
  useEffect(() => {
    const walletFromLocalStorage = getFromLocalStorage('wallet') || [];
    setDispWallet(walletFromLocalStorage);
  }, []);
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
          <h2>
            <span>Amount</span>
            <span>Currency</span>
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
            />
          ))}
        </WalletMain>
      </TransactionSection>
      {modal && <DepositModal />}
    </Main>
  );
}

export default Transaction;
