import axios from 'axios';
import React, { useContext, useEffect } from 'react';
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    // background : '#e6c0c2',
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

export default function OrderHistoryPage() {
  const userContext = useContext(UserContext);
  const params = { id: userContext.user._id };
  const classes = useStyles();

  useEffect(() => {
    apicall
      .getQueueCustomer(params)
      .then((res) => console.log('res :', res))
      .catch((err) => console.log('err : ', err));
  }, []);

  return (
    <div className={classes.root}>
      <h2 style = {{margin : '4px 8px'}}>Order</h2>
      <h4 style = {{margin : '4px 8px'}}>Canteen Name1</h4>
      <Link to='/history'>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              {/* <Grid item>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://picsum.photos/70/70"
                />
              </Grid> */}
              <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <div style = {{display : 'flex', flexFlow : 'row',justifyContent : 'space-between'}}>
                        <Subtitle font = '18px'>
                        ORDER ID
                        </Subtitle>
                         <Subtitle>5:15 PM</Subtitle>
                    </div>
                    <div style = {{display : 'flex', flexFlow : 'row',justifyContent : 'space-between'}}>
                        <div style = {{display : 'flex', flexFlow : 'row'}}>
                            <div style ={{ fontWeight : 'bold', marginRight : '4px'}}>2 item </div> <div>for Visarut</div>
                        </div> 
                        <div style = {{ marginTop : '0'}}><i className="fas fa-chevron-right"></i></div>
                    </div>
                  </Grid>
                  <Grid item xs>
                    <div style = {{display : 'flex', flexFlow : 'row',justifyContent : 'space-between'}}>
                        <Subtitle font = '18px'>
                        ORDER ID
                        </Subtitle>
                         <Subtitle>5:15 PM</Subtitle>
                    </div>
                    <div style = {{display : 'flex', flexFlow : 'row',justifyContent : 'space-between'}}>
                        <div style = {{display : 'flex', flexFlow : 'row'}}>
                            <div style ={{ fontWeight : 'bold', marginRight : '4px'}}>2 item </div> <div>for Visarut</div>
                        </div> 
                        <div style = {{ marginTop : '0'}}><i className="fas fa-chevron-right"></i></div>
                    </div>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="subtitle1">฿ 40.00</Typography>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
      </Link>
    </div>
  );
}
