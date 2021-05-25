import React, { useEffect, useState } from 'react'
import { green } from '@material-ui/core/colors';
import Subtitle from '../Components/Subtitle';
// icons
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import QueryBuilderSharpIcon from '@material-ui/icons/QueryBuilderSharp';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';

import styled from 'styled-components';
import VerticalLine from '../Components/VerticalLine';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

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

const OrderingPage = ({orderstatus} : any) => {
    const [state,setState] = useState(0);
    const [color1,setColor1] = useState('4caf50') //"#4caf50"
    const [color2,setColor2] = useState('c8e6c9') //"#c8e6c9"
    const [color3,setColor3] = useState('c8e6c9')
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const myorder = orderstatus.orderstatus
    const handletest = () => {
        if(state === 0){
            setState(state+1)
            setColor2('4caf50')
        }
        else if (state === 1){
            setState(state+1)
            setColor3('4caf50')
        }
        else{
            setState(0)
            setColor2('c8e6c9')
            setColor3('c8e6c9')
        }
    }

    useEffect(() => {
        let items = 0;
        let price = 0;
        // console.log('myorder : ',myorder)
        myorder.orderInfo.orderList.forEach((item: any) => {
          items += item.qty;
          price += item.qty * item.price;
        });
    
        setTotalItems(items);
        setTotalPrice(price);
      }, [totalPrice, totalItems, setTotalPrice, setTotalItems]);

    // console.log('orderstatus : ',orderstatus);
    console.log('myorder : ',myorder);

    let hour;
    let minute;
    hour = Number( myorder.orderInfo.recieveTime.slice(11,13))
    minute = Number(myorder.orderInfo.recieveTime.slice(14,16))
    console.log(minute)
    console.log(hour+7)

    return (

         <div style = {{margin : '16px'}}>
            <h3>Order status</h3>
            <div>
                <div>Order ID : {myorder.orderId}</div>
                <div>Amount : {totalPrice} Baht</div>
            </div>
        <div>
            <h4>
                {/* ETA : 15 Min */}
            </h4>
            <Content>
                <div>
                    <FiberManualRecordTwoToneIcon style={{ color: '#'+color1 }}/>
                    <VerticalLine height = '80px' color = {'#'+color1}/>
                </div>
                <QueryBuilderSharpIcon fontSize="large" style = {{ margin : '0px 8px'}}/>
                <div> <BoldStyled> Order Placed</BoldStyled>  <Subtitle>We have recieved your order</Subtitle></div>
                <TimeStlyed>{myorder.orderInfo.orderTime.slice(11,16)}</TimeStlyed>
            </Content>
            <Content>
                <div>
                    <FiberManualRecordTwoToneIcon style={{ color: '#'+color2 }}/>
                    <VerticalLine height = '80px' color = {'#'+color2}/>
                </div>
                <FastfoodRoundedIcon fontSize="large" style = {{ margin : '0px 8px'}}/>
                <div> <BoldStyled> Order Processed</BoldStyled>  <Subtitle>We are preparing your order</Subtitle></div>
                <TimeStlyed>{hour+7}:{minute-15}</TimeStlyed>
            </Content>

            <Content>
                <div>
                    <FiberManualRecordTwoToneIcon style={{ color: '#'+color3 }}/>
                    <VerticalLine height = '80px' color = {'#'+color3}/>
                </div>
                <LocalMallRoundedIcon fontSize="large" style = {{ margin : '0px 8px'}}/>
                <div> <BoldStyled>Ready to Pickup</BoldStyled>  <Subtitle>Order{myorder.orderId}</Subtitle></div>
                <TimeStlyed> {hour+7}{myorder.orderInfo.recieveTime.slice(13,16)}</TimeStlyed>
            </Content>
        </div>
        {/* <Button variant = 'contained' onClick={() => handletest()}>
            ...
        </Button> */}
        </div>
               
    )
}

const mapStateToProps = (state: any) => {
    return {
      orderstatus: state.shop.orderstatus,
    };
  };
  
  export default connect(mapStateToProps)(OrderingPage);