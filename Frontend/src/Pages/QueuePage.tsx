import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Screen = styled.div`
    height : 100%;
    background : yellow;
    padding : 0px;
    margin : 0px;
`;

const Item = styled.div`
    width: 50%;
    height : 324px;
    float : left;
`;

function QueuePage() {
  return (
    <>
    <Screen>
        <Item>
            1
        </Item>
        <Item>
            2
        </Item>
        <Item>
            3
        </Item>
        <Item>
            4
        </Item>
    </Screen>
    </>
  );
}

export default QueuePage;
