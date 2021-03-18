import React, { Component, useEffect, useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import pic from '../img/img_avatar3.png';
import User from '../Types/User.d';
import { UserContext } from '../Context/UserContext';
import { BsFillCaretDownFill } from "react-icons/bs";
import { Container, Row, Col } from 'react-grid-system';

const CanteenStyled = styled.div`
    cursor : pointer;
`;

const Droplist = styled.div`
  display : flex;
  width : 100%;
  flex-flow : column nowrap;
  margin-bottom : 0px;
  text-overflow: clip;
  white-space: nowrap;
`;



function Home() {
    const [homePageInfo,setHomePageInfo] = useState([]);
    const [isCanteenOpen,setIsCanteenOpen] = useState(false);
    const userContext = useContext(UserContext);

    const toggleCanteenDropdown = () => {
        setIsCanteenOpen((prevState) => !prevState);
      };
      
    const fetchShop = () => {
        axios.get('http://143.198.208.245:9000/api/shops/customer').then((res) => {
            console.log("shop ",res);
            console.log("set ",res.data.data);
            setHomePageInfo(res.data.data);
            // console.log("home ",homePageInfo);
            // console.log("map : ", homePageInfo[0].shop);
        })
    };
    useEffect(() => {
        fetchShop();
        console.log("myinfo ",homePageInfo);
      }, []); 
    return (
        <>
        <Container>
            <Row>
                <Col>
                    <h1>
                        Kin Khorn HomePage
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        {userContext.user.name}
                    </div>
                    <img src={userContext.user.picture} alt='pic'/>
                    {/* <p>
                        {homePageInfo}
                    </p> */}
                </Col>
            </Row>
            <CanteenStyled onClick = {toggleCanteenDropdown}>Canteen <BsFillCaretDownFill/> </CanteenStyled>
            {isCanteenOpen && (
                <Droplist>
                    <a href = '/cafeteriaA'>Cafeteria A</a>
                    <a href = '/cafeteriaC'>Cafeteria C</a>
                    <a href = '/cafeteriaJ'>Cafeteria J</a>
                    <a href = '/cafeteriaIT'>Cafeteria IT</a>
                    <a href = '/cafeteriaL'>Cafeteria L</a>
                </Droplist>
            )}
            {/* {ShopData} */}
            {homePageInfo.map((data,i)=>{
                console.log("map data : ",data);
            }
            )}
        </Container>
        </>
    );

}

export default Home;
