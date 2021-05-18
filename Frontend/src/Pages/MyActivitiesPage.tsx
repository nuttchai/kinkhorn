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

export default function MyActivitiesPage() {
  const userContext = useContext(UserContext);
  const params = { id: userContext.user.user_id };
  const classes = useStyles();

  useEffect(() => {
    apicall
      .getQueue(params)
      .then((res) => console.log('res :', res))
      .catch((err) => console.log('err : ', err));
  }, []);

  return (
    <div className={classes.root}>
      <h2 style = {{margin : '4px 8px'}}>My Activity</h2>
      <Link to='/history'>
          <Paper className={classes.paper}>
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
                    <Typography variant="subtitle1">
                    Canteen Name
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        2 items
                    </Typography>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="subtitle1">฿ 40.00</Typography>
                  </Grid> */}
                </Grid>
                <Grid item>
                  <Typography variant="body2" color ="primary"  style={{ cursor: 'pointer' }}>
                    Reorder
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
      </Link>
    </div>
  );
}
