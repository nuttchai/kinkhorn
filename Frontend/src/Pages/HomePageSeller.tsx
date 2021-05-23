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
  const [mystore, setMyStore] = useState<apicall.IgetMyStoreResponse[]>([]);
  // const params = { id : userContext.user._id }

  useEffect(() => {
    apicall.getMyStore(userContext.user._id).then((res) => {
      setMyStore(res.data);
  
    });
  }, []);

  // console.log('myStore : ', mystore)
  const OrderContent = (
    <>
      {mystore.map((store: any,index : number) => {
        // console.log(store);
        return (
          <>
            <h4 style={{ margin: '4px 8px' }}>{store.shop}</h4>
             <Link to="/order/id" key = {index}>
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Grid item xs container direction="column" spacing={2}>
                    
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
      <h2 style={{ margin: '4px 8px' }}>Order</h2>
      {OrderContent}
    </div>
  );
}
