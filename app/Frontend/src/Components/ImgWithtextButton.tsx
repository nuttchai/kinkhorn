import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components';
type Props = {
    link : string;
    icon : string;
    name : string;
    img? : string;
  };
const ButtonStyled = styled.div`
  display: flex;
  flex-flow: column;
`;

export default function ImgWithtextButton({link, icon, name }: Props) : JSX.Element {
    return (<>
        <Button href={link}>
        <ButtonStyled>
          <i className={icon}></i>
          <div>{name}</div>
        </ButtonStyled>
      </Button>
    </>
    )
}
