import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as apicall from '../api/apicall';
import { Link } from 'react-router-dom';
import Subtitle from '../Components/Subtitle';
import VerticalLine from '../Components/VerticalLine';
import ColorLine from '../Components/ColorLine';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {
  loadCurrentOrder,
  loadOrderStatus,
} from '../Redux/Shopping/shopping-action';
import { useHistory } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';

const HomePageSeller = ({ loadCurrentOrder, loadOrderStatus }: any) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paperalert: {
      paddingLeft: theme.spacing(2),
      paddingRight : theme.spacing(2),
      paddingTop : theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      background: '#e6c0c2',
      // background : '#d8a1a4',
    },
    alert: {
      background: '#e6c0c2',
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    styledH2: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

  let history = useHistory();
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const [mystore, setMyStore] = useState<any>([]);
  // const [myqueue, setMyQueue] = useState<apicall.IgetMyStoreResponse[]>([]);
  const [myqueue, setMyQueue] = useState<any>([]);
  // const params = { id : userContext.user._id }
  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleOrderAccept = (queue: any) => {
    loadCurrentOrder(queue,false);
    apicall
      .changeStatus(queue._id, 'accept')
      .then((res) => console.log('res : ', res))
      .catch((err) => console.log('er : ', err));
    // console.log(queue)
    const path = '/order/' + queue._id;
    history.push(path);
  };

  useEffect(() => {
    apicall
      .getMyStore(userContext.user._id)
      .then((res) => {
        console.log('res', res);
        // console.log('res', typeof res.data.data);
        res.data.data.map((data) => {
          return apicall
            .getQueueSeller(data._id)
            .then((res) => {
              console.log('res : ',res)
              setMyQueue(res.data);
              loadOrderStatus(res.data);
              return { ...data, queue: res.data };
            })
            .then((data) => {
              // console.log('data ', data);
              setMyStore(data);
            });
        });
      })
      .catch((err) => console.log('err : ', err));
  }, []);

  const OrderContent = (
    <>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <h4 style={{ margin: '4px 8px' }}>{mystore.shop}</h4>

        <div style={{ margin: '4px 8px' }}>
          Order in Queue ({myqueue.length}){' '}
        </div>
      </div>

      {myqueue.map((queue: any) => {

        const time = queue.orderTime.slice(11, 16);
        const status = queue.status;
        let textStatus = <></>;
        let className = classes.paper;
        // console.log(status);
        if (status === 'notaccept') {
          className = classes.paperalert
          textStatus = <div style={{ color: '#FFD700' }}>Waiting</div>;
        } else if (status === 'accept') {
          
          textStatus = <div style={{ color: 'green' }}>ACCEPTED</div>;
        } else if (status === 'complete') {
          textStatus = <div style={{ color: 'gray' }}>COMPLETED</div>;
        }

        return (
          <>
            <Paper className={className}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid
                      item
                      xs
                      key={`${queue._id}`}
                      onClick={() => {
                        handleOrderAccept(queue);
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Subtitle font="14px">{queue._id}</Subtitle>
                        <Subtitle>{time}</Subtitle>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', flexFlow: 'row' }}>
                          <div
                            style={{
                              fontWeight: 'bold',
                              marginRight: '4px',
                            }}
                          >
                            {queue.orderList.length} items {textStatus}
                          </div>{' '}
                        </div>
                        <div style={{ marginTop: '0' }}>
                          <i className="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </Grid>
                    <ColorLine color="#C1C7CF" />
                    {/* </Link> */}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </>
        );
      })}
      {/* </Link> */}
    </>
  );
  return (
    <div className={classes.root}>
      <div className={classes.styledH2}>
        <h2 style={{ margin: '4px 8px' }}>Order</h2>
        <Button
          startIcon={<RefreshIcon />}
          onClick={refreshPage}
          style={{ right: '0px' }}
        ></Button>
      </div>
      {OrderContent}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadCurrentOrder: (order: any,view : boolean) => dispatch(loadCurrentOrder(order,view)),
    loadOrderStatus: (queue: any) => dispatch(loadOrderStatus(queue)),
  };
};

export default connect(null, mapDispatchToProps)(HomePageSeller);
