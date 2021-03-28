import React from 'react';
import styled, { css } from 'styled-components';

const BackdropStyled = styled.div <{ show?: boolean } & React.HTMLProps<HTMLDivElement>>`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 50;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);

    ${({ show }) => !show && css`
      opacity: 0;
      pointer-events: none;
    `}
`;

type Props = {
  show: boolean
  clicked: any
}
const backdrop = ({ show, clicked }: Props): JSX.Element => (
  <BackdropStyled onClick={clicked} show={show} />
);

export default backdrop;
