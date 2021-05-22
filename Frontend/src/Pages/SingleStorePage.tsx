import react, { useState } from 'react';
import {
    createMuiTheme,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Switch,
  Typography,
  withStyles,
} from '@material-ui/core';
import { green, red, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    margin: '8px 16px',
    alignItems: 'center',
    maxWidth: 500,
    background: '#ededed',
    // background : '#d8a1a4',
  },
  switch: {
    // display : 'flex',
    // justifyContent : 'space-between',
    // padding: theme.spacing(1),
    margin: '8px 0px',
    // alignItems : 'center',
  },
  image: {
    borderRadius: '50%',
    width: '50px',
    margin: '8px',
  },
  outService: {
    color: '#f0ad4e',
    fontWeight: 'bold',
  },
  InService: {
    color: '#5cb85c',
    fontWeight: 'bold',
  },
}));

export default function SingleStorePage() {
  const classes = useStyles();
  const [state, setState] = useState({
    storeStatus: false,
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const InService = (
    <>
      <div className={classes.InService}>Open</div>
    </>
  );

  const OutService = (
    <>
      <div className={classes.outService}>Closed</div>
    </>
  );

  const CustomSwitch = withStyles({
    switchBase : {
      '&$checked' : {
        color : green[600],
      },
    '&$checked + $track' : {
      backgroundColor : green[300],
    },
    },
    checked : {},
    track : {},
  })(Switch);

  return (
    <>
      <Paper>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <div
            style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}
          >
            <img
              src="https://picsum.photos/200/200"
              className={classes.image}
            />
            <h4> GrabFood aroijung </h4>
          </div>

          <i className="fas fa-chevron-right" style={{ marginRight: '16px' }} />
        </Grid>

        <Paper className={classes.paper}>
          <div>Store Status</div>
          <FormControlLabel
            control={
              <CustomSwitch
                checked={state.storeStatus}
                onChange={handleChange}
                name="storeStatus"
              />
            }
            labelPlacement="start"
            label={state.storeStatus ? InService : OutService}
            className={classes.switch}
          />
        </Paper>
      </Paper>
    </>
  );
}
