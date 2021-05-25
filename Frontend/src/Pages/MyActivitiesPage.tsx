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
import { loadCurrentOrder } from '../Redux/Shopping/shopping-action';
import { connect } from 'react-redux';

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

interface MyActivitiesPageProps {
  loadCurrentOrder : (order : any,view : boolean) => (dispatch : any) => void,
}

const MyActivitiesPage = ({loadCurrentOrder} : MyActivitiesPageProps) => {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const [myactivity, setMyAcitivity] = useState<any>([]);
  const [history, sethistory] = useState<any>([]);

  useEffect(() => {
    apicall
      .getQueueCustomer(userContext.user._id)
      .then((res) => {
        console.log('res Queue:', res.data);
        setMyAcitivity(res.data);
      })
      .catch((err) => console.log('err : ', err));

    apicall.getHistory(userContext.user._id,'customer')
    .then((res) => {
      console.log('res History :', res.data.data)
      sethistory(res.data.data)
    })
      .catch((err) => console.log('err : ', err));
  }, []);

  console.log('my act : ', myactivity);
  const myact = (
    <>
      {
        myactivity.map( (act : any) => {
          let status;
          if (act.status === "notaccept"){
            status = (<div style ={{color : '#FF8C00'}}>
              waiting
            </div>)
          }
          else if (act.status === "accept"){

            status = (<div style ={{color : 'green'}}>
              preparing
            </div>)
          }
          else {
            status = (<div>
              completed
            </div>)
          }
          return (<>
          <Link to={`myactivity/${act._id}`} key={`$act._id`} onClick={() => loadCurrentOrder(act,true)} >
          <Paper className = {classes.paper}>
          <Grid container wrap="nowrap" spacing={2} >
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
              <Typography variant="subtitle1">{act.shop}</Typography>
              <Typography variant="body2" color="textSecondary">
                {act.orderList.length} item
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="primary"
              style={{ cursor: 'pointer' }}
            >
              {status}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
      </Link>
          </>)
        })
      }
    </>
  );

  const myhist = (<>
  {
        history.map( (act : any) => {
          let status;
          if (act.status === "notaccept"){
            status = (<div style ={{color : 'yellow'}}>
              waiting
            </div>)
          }
          else if (act.status === "accept"){

            status = (<div style ={{color : 'green'}}>
              preparing
            </div>)
          }
          else {
            status = (<div>
              completed
            </div>)
          }
          return (<>
          {/* <Link to={`myactivity/${act._id}`} key={`$act._id`} onClick={() => loadCurrentOrder(act,true)} > */}
          <Paper className = {classes.paper}>
          <Grid container wrap="nowrap" spacing={2} >
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
              <Typography variant="subtitle1">{act._id}</Typography>
              <Typography variant="body2" color="textSecondary">
                {act.orderList.length} item
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="primary"
              style={{ cursor: 'pointer' }}
            >
              {status}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
      {/* </Link> */}
          </>)
        })
      }

  </>)
  return (
    <div className={classes.root}>
      <h2 style={{ margin: '4px 8px' }}>My Activity</h2>
      {/* <Link to="/history"> */}
        <Paper className={classes.paper}>{myact}</Paper>
      {/* </Link> */}
      <h2 style={{ margin: '4px 8px' }}>History</h2>
      <Paper className={classes.paper}>{myhist}</Paper>
    </div>
  );
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    loadCurrentOrder : (order : any, view : boolean) => dispatch(loadCurrentOrder(order,view)),
  };
};

export default connect(null,mapDispatchToProps)(MyActivitiesPage);
