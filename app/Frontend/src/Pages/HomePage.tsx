import React, {
  Component,
  useEffect,
  useState,
  useContext,
  useRef,
  useMemo,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
// import { BsFillCaretDownFill } from 'react-icons/bs';
import { Row, Col, useScreenClass } from 'react-grid-system';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import SwiperCore, { Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Card, Container } from '@material-ui/core';
import '../style.css';
import ImgWithtextButton from '../Components/ImgWithtextButton';
import Subtitle from '../Components/Subtitle';
import Button from '../Components/Button';

const RecMenu = styled.div`
  display : flex;
  flex-flow : row;
`;

const KioskName = styled.div`
  font-weight : bold;
`;



interface ShopInfo {
  id: string;
  menu: any;
  owner: string;
  shop: string;
}

interface Menu {
  name: string;
  price: number;
}

SwiperCore.use([Pagination, Controller, Thumbs]);

function Home() {
  const screenClass = useScreenClass();
  const isMobile = useMemo(() => ['xs', 'sm'].includes(screenClass), [screenClass]);
  const slides = [];
  const [homePageInfo, setHomePageInfo] = useState([]);
  const [isCanteenOpen, setIsCanteenOpen] = useState(false);
  const userContext = useContext(UserContext);

  const toggleCanteenDropdown = () => {
    setIsCanteenOpen((prevState) => !prevState);
  };

  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} tag="li">
        <img
          src={`https://picsum.photos/id/${i + 1}/450/200`}
          style={{ listStyle: 'none'}}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  }

  // const fetchShop = useRef(() => {});
  // fetchShop.current = () => {
  //   axios.get('http://143.198.208.245:9000/api/shops/customer').then((res) => {
  //     // console.log('res ', res);
  //     // console.log('res.data.data ', res.data.data);
  //     setHomePageInfo(res.data.data);
  //     // console.log('home ',homePageInfo);
  //     // console.log('map : ', homePageInfo[0].shop);
  //   });
  // };

  // useEffect(() => {
  //   fetchShop.current();
  // }, [fetchShop]);

  // const ShopData = (
  //   <div>
  //     {homePageInfo.map((data: ShopInfo, i) => (
  //       <div key ={`data-${i}`}>
  //         {data.shop}{' '}
  //         {data.menu.map((ele: Menu) => (
  //           <div>
  //             {ele.name} price : {ele.price}
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <>
      <div className="content-wrapper">
        <Container maxWidth="sm">
          <Card style={{ margin: '12px 0px'}}>
              <Swiper
                id="main"
                tag="section"
                wrapperTag="ul"
                pagination
                spaceBetween={0}
                slidesPerView={1}
              >
                {slides}
              </Swiper>
          </Card>
          <Card>
            <Row style={{ textAlign: 'center' }}>
              <Col style={{ margin: '8px' }}>
                {/* <img src={`https://picsum.photos/43/43`} alt={'canteen img'}/> */}
                <ImgWithtextButton link='/canteen' icon='fas fa-utensils fa-2x' name='Canteen A'/>
              </Col>
              <Col style={{ margin: '8px' }}>
              <ImgWithtextButton link='/canteen' icon='fas fa-utensils fa-2x' name='Canteen A'/>
              </Col>
            </Row>
            <Row style={{ textAlign: 'center' }}>
              <Col>
              <ImgWithtextButton link='/canteen' icon='fas fa-utensils fa-2x' name='Canteen A'/>
              </Col>
              <Col>
              <ImgWithtextButton link='/canteen' icon='fas fa-utensils fa-2x' name='Canteen A'/>
              </Col>
              <Col>
              <ImgWithtextButton link='/canteen' icon='fas fa-utensils fa-2x' name='Canteen A'/>
              </Col>
            </Row>
          </Card>
          <Card style={{ margin: '8px 0px'}}>
            <h4 style ={{ margin : '8px 16px'}}>Recommend Menu</h4>
            <RecMenu>
              <Col style={{ display: 'flex', flexFlow: 'column', maxWidth: '140px' }}>
                <div style = {{margin : '8px 16px'}}>
                  <img src={'https://picsum.photos/90/90'} alt="food img" width='100' height='100' style = {{borderRadius : '5%'}}/>
                  <KioskName style={{margin:'0px'}}>Kiosk Name</KioskName>
                  <Subtitle>Canteen A</Subtitle>
                </div>
              </Col>
              <Col style={{ display: 'flex', flexFlow: 'column', maxWidth: '140px' }}>
                <div style = {{margin : '8px'}}>
                  <img src={'https://picsum.photos/90/90'} alt="food img" width='100' height='100' style = {{borderRadius : '5%'}}/>
                  <KioskName style={{margin:'0px'}}>Kiosk Name</KioskName>
                  <Subtitle>Canteen A</Subtitle>
                </div>
              </Col>
            </RecMenu>

          </Card>
        </Container>
        {/* <Float>
          <Button
          border="none"
          color="pink"
          height = "60px"
          onClick={() => console.log("You clicked on the pink circle!")}
          radius = "50%"
          width = "60px"
                />
        </Float> */}
      </div>
    </>
  );
}

export default Home;