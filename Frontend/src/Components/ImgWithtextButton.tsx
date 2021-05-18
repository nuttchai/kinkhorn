import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
type Props = {
    link : string;
    icon : string;
    name : string;
    img? : string;
  };
const ButtonStyled = styled(Link)`
  display: flex;
  flex-flow: column;
`;

export default function ImgWithtextButton({link, icon, name }: Props) : JSX.Element {
    return (<>
        <Button>
        <ButtonStyled to={link}>
          <i className={icon}></i>
          <div>{name}</div>
        </ButtonStyled>
      </Button>
    </>
    )
}
