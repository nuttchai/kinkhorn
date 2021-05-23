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
import Colorline from '../Components/ColorLine';
import { connect } from 'react-redux';
import { fetchMyStore, loadCurrentKiosk } from '../Redux/Shopping/shopping-action';
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

interface IMyStorePage {
  fetchMyStore : (id : any) => (dispatch : any) => void,
  myStore : any,
  loadCurrentKiosk : any,
}

const MyStorePage = ( {fetchMyStore, myStore, loadCurrentKiosk} : IMyStorePage) => {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  // const [mystore,setMyStore] = useState<apicall.IgetMyStoreResponse[]>([]);

  useEffect(() => {
    // fetchMyStore(userContext.user._id);
    fetchMyStore(userContext.user._id)
    // apicall.getMyStore(userContext.user._id)
    // .then((res) => {
    //   console.log('res getMyStore :', res.data);
    //   setMyStore(res.data)
    // }) 
    //   .catch((err) => console.log('err : ', err));

  }, []);

  const myStoreContent = (
    <>
    {
      myStore.map((store : any, i : number) => {
        // console.log('map here :',store)
        return (<>
        
        <Link to={`mystore/${store._id}`} onClick = {() => loadCurrentKiosk(store)} key={i}>
        <Grid container wrap="nowrap" spacing={2}>
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
                    <Typography variant="h6" >
                      {store.shop}
                    </Typography>
                    <Typography variant="body2">
                      Canteen {store.area}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Grid>
          </Link>
            <Colorline color="#C1C7CF" />
        </>)
      })
    }
    </>
  )
  return (
    <div className={classes.root}>
      <Typography variant="h4" style = {{margin : '4px 8px'}}>My Store</Typography>
      
          <Paper className={classes.paper}>
            {myStoreContent}
          </Paper>
    </div>
  );
}
const mapStateToProps = (state: any) => {
  return {
    myStore : state.shop.kiosks,
  };
};

const mapDispatchToProps = (dispatch : any) => {
  return {
    fetchMyStore : (id : string) => dispatch(fetchMyStore(id)),
    loadCurrentKiosk : (kiosk : any) => dispatch(loadCurrentKiosk(kiosk))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyStorePage);