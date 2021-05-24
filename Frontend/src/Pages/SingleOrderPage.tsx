import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    //   padding: '6px 16px',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SingleOrderPage = () => {
  const userContext = useContext(UserContext);
  const params = { id: userContext.user._id };
  const classes = useStyles();

  useEffect(() => {
    // axios
    //   .get("http://143.198.208.245:9000/api/orders/queue/customer", { params })
    //   .then((res) => console.log("res :", res));
  }, []);
  return (
    <div style={{ width: "100%" }} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs = {12}>
          <Box fontWeight="fontWeightLight" m={-0.5}>
        
        Order ID
        
        </Box>
        </Grid>
        <Grid item xs={1}>
        <Typography variant="body2">
          <Box fontWeight="fontWeightBold" >
              500
              </Box>
              </Typography>
              
        
        </Grid>
        <Grid item xs={4}>
        <Typography variant="body2">
          <Box fontWeight="fontWeightBold" >
              Order for
              </Box>
              </Typography>
             
              
        </Grid>
        <Grid item xs={7}>
        <Typography variant="body2">
        <Box textAlign="right">
                Client Name
                </Box>
              </Typography>
              <Typography variant="body2">
              {/* <Box textAlign="right"> */}
                {/* 60 */}
                {/* </Box> */}
              </Typography>
        </Grid>
      </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                <i className="fas fa-map-marker-alt"/> Canteen Name
                </Typography>
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        
        <Box fontWeight="fontWeightBold" m={-0.5}>
        
          Order Summary
          
          </Box>
          
        </Grid>
        
        <Grid item xs={1}>
        <Typography variant="body2">
          <Box fontWeight="fontWeightBold" >
              1x
              </Box>
              </Typography>
              <Typography variant="body2">
              <Box fontWeight="fontWeightBold"  >
              10x
              </Box>
              </Typography>
        
        </Grid>
        <Grid item xs={9}>
        <Typography variant="body2">
          <Box fontWeight="fontWeightRegular" >
              Spaghetti Carbonara
              </Box>
              </Typography>
              <Typography variant="body2">
              <Box fontWeight="fontWeightRegular" >
              Spaghetti Carbonara
              </Box>
              </Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant="body2">
        <Box textAlign="right">
                60
                </Box>
              </Typography>
              <Typography variant="body2">
              <Box textAlign="right">
                60
                </Box>
              </Typography>
        </Grid>
      </Grid>
      </Paper>
      <Paper className={classes.paper}>
      <Grid container spacing={2}>
      <Grid item xs={10}>
        <Box fontWeight="fontWeightLight" m={-0.5}>
          Subtotal
        </Box>
        <Box fontWeight="fontWeightLight" m={-0.5}>
          VAT (7%)
        </Box>
        </Grid>
              <Grid item xs={2}>
              <Typography variant="body2">
              <Box textAlign="right">
                200
                </Box>
              </Typography>
              <Typography variant="body2">
              <Box textAlign="right">
                2
                </Box>
              </Typography>
              
        </Grid>
        <Grid item xs={10}>
        <Typography variant="body2">
              <Box fontWeight="fontWeightBold" m={-0.5}>
          Total
        </Box>
        </Typography>
        </Grid>
        <Grid item xs={2}>
              <Typography variant="body2">
              <Box textAlign="right">
                14000
                </Box>
              </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item></Grid>
          {/* </Grid> */}
        {/* </Grid> */}
      </Paper>
    </div>
  );
}

const mapStateToProps = (state : any) => {
  return {
    current: state.shop.currentItem,
  };
};

export default connect(mapStateToProps)(SingleOrderPage);