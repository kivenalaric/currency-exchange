import { styled } from 'styled-components';

export const Main = styled.div`
  width: 100vw;
  height: fit-content;
  min-height: 100vh;
  position: relative;
  background-color: #131313;
  color: #fefefe;
`;

export const Hero = styled.div`
  width: 100vw;
  background-color: #7280a2;
  height: fit-content;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1.5rem;
  @media only screen and (min-width: 500px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
    padding: 2rem 5rem;
  }
`;

export const HeroRight = styled.div`
  text-align: center;
  width: 90vw;

  @media only screen and (min-width: 500px) {
    text-align: left;
  }
`;

export const HeroLeft = styled.div`
  width: 90vw;
  display: flex;
  justify-content: center;
`;

export const HeroImg = styled.img`
  width: 90vw;
  max-width: 400px;
`;

export const Button = styled.button`
  background-color: #00efc5;
  cursor: pointer;
  color: #fefefe;
  font-size: 1.5rem;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  border: none;
  transition: 0.4s ease-in-out;
  &:hover {
    color: #00efc5;
    cursor: pointer;
    background-color: #fefefe;
  }
  @media only screen and (max-width: 426px) {
    font-size: 1.1rem;
  }
`;

export const TransactionSection = styled.div`
  width: 97vw;
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.9rem;
`;

export const Total = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const WalletMain = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  padding: 0.8rem 1.2rem;
  width: 97vw;
  max-width: 1280px;
`;
