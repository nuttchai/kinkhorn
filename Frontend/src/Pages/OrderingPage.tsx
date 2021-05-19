import React from 'react'
import { green } from '@material-ui/core/colors';
import Subtitle from '../Components/Subtitle';
// icons
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import QueryBuilderSharpIcon from '@material-ui/icons/QueryBuilderSharp';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';

import styled from 'styled-components';
import VerticalLine from '../Components/VerticalLine';
const Content = styled.div`
    display : flex;
    vertical-align : baseline;
`;

const BoldStyled = styled.div`
    font-Weight : bold;
`;

const TimeStlyed = styled.div`
    margin-left : auto;
    margin-right : 24px;
`;

export default function OrderingPage() {
    return (
        <>
         <div className="content-wrapper" style = {{margin : '16px'}}>
            <h3>Order status</h3>
            <div>
                <div>Order ID : 2345</div>
                <div>Amount : 345.00 Baht</div>
            </div>
        <div>
            <h4>
                ETA : 15 Min
            </h4>
            <Content>
                <div>
                    <FiberManualRecordTwoToneIcon style={{ color: green[500] }}/>
                    <VerticalLine height = '80px' color = '#4caf50'/>
                </div>
                <QueryBuilderSharpIcon fontSize="large" style = {{ margin : '0px 8px'}}/>
                <div> <BoldStyled> Order Placed</BoldStyled>  <Subtitle>We have recieved your order</Subtitle></div>
                <TimeStlyed>10:04</TimeStlyed>
            </Content>
            <Content>
                <div>
                    <FiberManualRecordTwoToneIcon style={{ color: green[100] }}/>
                    <VerticalLine height = '80px' color = '#c8e6c9'/>
                </div>
                <FastfoodRoundedIcon fontSize="large" style = {{ margin : '0px 8px'}}/>
                <div> <BoldStyled> Order Processed</BoldStyled>  <Subtitle>We are preparing your order</Subtitle></div>
                <TimeStlyed>10:08</TimeStlyed>
            </Content>

            <Content>
                <div>
                    <FiberManualRecordTwoToneIcon style={{ color: green[100] }}/>
                    <VerticalLine height = '80px' color = '#c8e6c9'/>
                </div>
                <LocalMallRoundedIcon fontSize="large" style = {{ margin : '0px 8px'}}/>
                <div> <BoldStyled>Ready to Pickup</BoldStyled>  <Subtitle>Order#234562 from Tasty Food</Subtitle></div>
                <TimeStlyed>11:00</TimeStlyed>
            </Content>
        </div>

        </div>
        </>
               
    )
}
