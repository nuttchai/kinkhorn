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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    background: '#e6c0c2',
    // background : '#d8a1a4',
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
}));

export default function HomePageSeller() {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const [mystore, setMyStore] = useState<any>([]);
  // const [myqueue, setMyQueue] = useState<apicall.IgetMyStoreResponse[]>([]);
  const [myqueue, setMyQueue] = useState<any>([]);
  // const params = { id : userContext.user._id }
  const refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    apicall.getMyStore(userContext.user._id).then((res) => {
      console.log('res', res.data);
      setMyStore(res.data);
    });
    
    apicall.getQueueSeller('60aa81019f558400b7de3fd9').then((res) => {
      console.log('res', res);
    })
    
    console.log('my store : ',mystore);

    mystore.map((store: any, index: number) => {
      console.log(store._id);
      apicall
        .getQueueSeller(store._id)
        .then((res) => {
          console.log('res', index, res);
          setMyQueue(res.data);
        })
        .catch((err) => console.log('err : ', index, err));
    });
    console.log('MyQueue : ', myqueue);
  }, []);

  console.log('my store : ',mystore);
  const OrderContent = (
    <>
      {mystore.map((store: any, index: number) => {
        console.log('myqueue : ', myqueue);
        return (
          <>
            <div style ={{display : 'flex', flexFlow : 'column'}}>
              <h4 style={{ margin: '4px 8px' }}>{store.shop} ({myqueue.length})</h4>
            </div>
            <Link to="/order/id" key={index}>
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Grid item xs container direction="column" spacing={2}>
                      {myqueue.map((queue: any, index: number) => {
                        console.log('queue : ', queue);
                        return (
                          <>
                            
                              <Grid item xs key={index}>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexFlow: 'row',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <Subtitle font="14px">{queue._id}</Subtitle>
                                  <Subtitle>{queue.orderTime}</Subtitle>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexFlow: 'row',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <div
                                    style={{ display: 'flex', flexFlow: 'row' }}
                                  >
                                    <div
                                      style={{
                                        fontWeight: 'bold',
                                        marginRight: '4px',
                                      }}
                                    >
                                      {queue.orderList.length} items{' '}
                                    </div>{' '}
                                    {/* <div>for Visarut</div> */}
                                  </div>
                                  <div style={{ marginTop: '0' }}>
                                    <i className="fas fa-chevron-right"></i>
                                  </div>
                                </div>
                              </Grid>
                              <ColorLine color="#C1C7CF" />
                          </>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          </>
        );
      })}
    </>
  );
  return (
    <div className={classes.root}>
      <div>
        <button onClick={refreshPage}>Click to reload!</button>
      </div>
      <h2 style={{ margin: '4px 8px' }}>Order</h2>
      {OrderContent}
    </div>
  );
}
