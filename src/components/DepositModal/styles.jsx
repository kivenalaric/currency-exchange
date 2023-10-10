import { styled } from 'styled-components';

export const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 20;
  background-color: #5b5a7c78;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
`;

export const MainM = styled.div`
  width: 80vw;
  max-width: 400px;
  margin: auto;
  justify-self: center;
`;

export const DepositInput = styled.div`
  background-color: #212121;
  border-radius: 10px;
  padding: 0.5rem 1.2rem;
  width: 100%;
  max-width: 380px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DepositForm = styled.form`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 10px;
  gap: 10px;
  color: #fff;
  justify-content: center;
  align-items: center;
`;

export const Inputsec = styled.div`
  margin: auto;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-self: center;
  margin: auto;
`;

export const Input = styled.input`
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
`;

export const Select = styled.select`
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
`;
