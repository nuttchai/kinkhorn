import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
import * as apicall from '../api/apicall';
import { Link } from 'react-router-dom';
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
}));

export default function MyStorePage() {
  const userContext = useContext(UserContext);
  const params = { id: userContext.user._id };
  const classes = useStyles();
  const [mystore,setMyStore] = useState<apicall.IgetMyStoreResponse[]>([]);

  useEffect(() => {
    // apicall
    //   .getQueue(params)
    //   .then((res) => console.log('res :', res))
    //   .catch((err) => console.log('err : ', err));
    apicall.getMyStore(userContext.user._id)
    .then((res) => {
      console.log('res getMyStore :', res.data);
      // setMyStore(res.data => )
      // setMyStore(res.data)
      // res.data.map(store => console.log(data))
      // setMyStore([...mystore,res.data])
      setMyStore(res.data)
      
    }) 
      .catch((err) => console.log('err : ', err));
  }, []);

  const myStoreContent = (
    <>
    {
      mystore.map((store : any, i : number) => {
        // console.log('map here :',store)
        return (<>
        <Grid container wrap="nowrap" spacing={2} key={`${i}`}>
              <Grid item>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://picsum.photos/70/70"
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item xs>
                    <Typography variant="subtitle1">
                      {store.shop}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Grid>
        </>)
      })
    }
    </>
  )
  return (
    <div className={classes.root}>
      <h2 style = {{margin : '4px 8px'}}>My Store</h2>
      <Link to='/mystore/id'>
          <Paper className={classes.paper}>
            {/* <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://picsum.photos/70/70"
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item xs>
                    <Typography variant="subtitle1">
                    Canteen Name
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Grid> */}
            {myStoreContent}
          </Paper>
      </Link>
    </div>
  );
}
