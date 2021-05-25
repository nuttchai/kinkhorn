import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
import * as apicall from '../api/apicall';
import { Link } from 'react-router-dom';
import Subtitle from '../Components/Subtitle';
import VerticalLine from '../Components/VerticalLine';
import { loadCurrentOrder, loadOrderStatus } from '../Redux/Shopping/shopping-action';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import ColorLine from '../Components/ColorLine';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  paperalert: {
    paddingLeft: theme.spacing(2),
    paddingRight : theme.spacing(2),
    paddingTop : theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    background: '#e6c0c2',
    // background : '#d8a1a4',
  },
}));

const OrderHistoryPage = ({ loadCurrentOrder, loadOrderStatus }: any) => {
  let history = useHistory();
  const userContext = useContext(UserContext);
  // const params = { id: userContext.user._id };
  const classes = useStyles();
  const [mystore, setMyStore] = useState<any>([]);
  const [myqueue, setMyQueue] = useState<any>([]);
  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleOrderAccept = (queue: any) => {
    loadCurrentOrder(queue,true);
    // apicall
    //   .changeStatus(queue._id, 'accept')
    //   .then((res) => console.log('res : ', res))
    //   .catch((err) => console.log('er : ', err));
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
          .getHistory(data._id,'frontstore')
          .then((res) => {
            console.log('res : ',res)
            setMyQueue(res.data.data);
            loadOrderStatus(res.data);
            return { ...data, queue: res.data };
          })
          .then((data) => {
            setMyStore(data);
          });
      });
    })
  }, []);
  console.log('queueueueu : ',myqueue);
  const OrderContent = (
    <>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <h4 style={{ margin: '4px 8px' }}>{mystore.shop}</h4>
      </div>

      {myqueue.map((queue: any) => {

        const time = queue.time.slice(11, 16);
        // const status = queue.status;
        // let show = false;
        // let textStatus = <></>;
        // let className = classes.paper;
        // // console.log(status);
        // if (status === 'notaccept') {
        //   className = classes.paperalert
        //   textStatus = <div style={{ color: 'yellow' }}>Waiting</div>;
        // } else if (status === 'accept') {
          
        //   textStatus = <div style={{ color: 'green' }}>ACCEPTED</div>;
        // } else if (status === 'complete') {
        //   textStatus = <div style={{ color: 'gray' }}>COMPLETED</div>;
        // }

        return (
          <>
            <Paper className = {classes.paper}>
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
                            {queue.orderList.length} items
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
        <h2 style={{ margin: '4px 8px' }}>Order History</h2>
        <Button
          startIcon={<RefreshIcon />}
          onClick={refreshPage}
          style={{ right: '0px' }}
        ></Button>
      </div>
      {OrderContent}
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadCurrentOrder: (order: any,view : boolean) => dispatch(loadCurrentOrder(order,view)),
    loadOrderStatus: (queue: any) => dispatch(loadOrderStatus(queue)),
  };
};

export default connect(null, mapDispatchToProps)(OrderHistoryPage);
