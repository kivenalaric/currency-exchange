/* eslint-disable react/prop-types */
import React from 'react';
import { styled } from 'styled-components';

const CloseModal = styled.button`
  border: none;
  font-size: 1.5rem;
  position: absolute;
  right: 0;
  top: 0;
  font-weight: 700;
  padding: 0.5rem 1rem;
  background: none;
  color: #fcfcfc;
`;

function CloseBtn({ onClick }) {
  return (
    <CloseModal type="button" onClick={onClick}>
      X
    </CloseModal>
  );
}

export default CloseBtn;
