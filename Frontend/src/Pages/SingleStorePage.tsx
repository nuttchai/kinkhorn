import react, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
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
import { connect } from 'react-redux';
import ColorLine from '../Components/ColorLine';
import Item from '../item/item';
import { Link } from 'react-router-dom';
import { green, red, blue } from '@material-ui/core/colors';
import { Card, IconButton, Fab } from '@material-ui/core';
import { menuType } from './CreateStorePage';
import { Wrapper } from '../item/item.styles';
import Subtitle from '../Components/Subtitle';
import { Col, Row } from 'react-grid-system';
import * as apicall from '../api/apicall';
import produce from 'immer';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    margin: 'auto',
    alignItems: 'center',
    maxWidth: 600,
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
  StyledKiosk: {
    marginLeft: '16px',
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
  },
  StyledLink: {
    display: 'flex',
    flexFlow: 'row',
    color: '#00000',
  },
}));

const SingleStorePage = ({ currentKiosk }: any) => {
  const classes = useStyles();
  const [state, setState] = useState({
    storeStatus: false,
  });
  const [edit, setEdit] = useState(false);

  const [newMenu, setNewMenu] = useState<menuType[]>([]);

  useEffect(() => {
    setNewMenu(currentKiosk.id.menu);
  }, []);

  const handleAddFields = () => {
    setNewMenu([
      ...newMenu,
      {
        id: '',
        name: '',
        price: 0,
        description: '',
        category: '',
        img: '',
      },
    ]);
  };

  const UpdateMenu = () => {
    const requestData = { ...currentKiosk.id, menu: newMenu };
    console.log('final data  : ', requestData);
    apicall
      .updateMyStore(requestData)
      .then((res) => console.log('res : ', res))
      .catch((err) => console.log('err : ', err));
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };
  // console.log(edit)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleRemoveFields = (index: number) => {
    console.log('pop :', index);
    const values = [...newMenu];

    values.splice(index, 1);
    setNewMenu(values);
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

  const DeleteStore = () => {
    console.log('id delte : ', currentKiosk.id._id);
    apicall
      .deleteStore(currentKiosk.id._id)
      .then((res) => console.log('delete res : ', res))
      .catch((err) => console.log('err delete : ', err));
  };

  const CustomSwitch = withStyles({
    switchBase: {
      '&$checked': {
        color: green[600],
      },
      '&$checked + $track': {
        backgroundColor: green[300],
      },
    },
    checked: {},
    track: {},
  })(Switch);
  // console.log(' currentKiosk : ', currentKiosk.id.menu);
  // console.log('new Menu : ', newMenu);
  const Menu = (
    <>
      {newMenu.map((ele: any, i: number) => {
        // console.log('ele : ', ele.name);
        return (
          <>
            <Grid
              item
              key={i}
              xs={12}
              sm={4}
              style={{ marginLeft: '16px' }}
            >
              {edit ? (
                <Wrapper>
                  <div className={classes.StyledLink}>
                    <div style={{ paddingTop: '5px' }}>
                      {/* FIXME : src={item.image} */}
                      <img
                        src={'https://picsum.photos/70/70'}
                        alt="photo"
                        style={{ width: '70px', height: '70px' }}
                      />
                    </div>
                    <div className={classes.StyledKiosk}>
                      <Row>
                        <Col>
                          <input
                            type="text"
                            placeholder={ele.name}
                            onChange={(e) => {
                              const name = e.target.value;
                              setNewMenu((currentMenu) =>
                                produce(currentMenu, (v) => {
                                  v[i].name = name;
                                })
                              );
                            }}
                            // value={newMenu.}
                          />
                        </Col>
                        <Col style={{ fontWeight: 'bold' }}>
                          <input
                            onChange={(e) => {
                              const price = e.target.value;
                              setNewMenu((currentMenu) =>
                                produce(currentMenu, (v) => {
                                  v[i].price = +price;
                                })
                              );
                            }}
                            placeholder={ele.price}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <input
                            onChange={(e) => {
                              const description = e.target.value;
                              setNewMenu((currentMenu) =>
                                produce(currentMenu, (v) => {
                                  v[i].description = description;
                                })
                              );
                            }}
                            placeholder={ele.description}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <IconButton
                    disabled={newMenu.length === 1}
                    onClick={() => handleRemoveFields(i)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>
                </Wrapper>
              ) : (
                <Item item={ele} isEdit={edit} />
              )}

              <ColorLine color="#C1C7CF" />
            </Grid>
          </>
        );
      })}
    </>
  );

  // console.log('New Menu : ', newMenu);
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
            <h4> {currentKiosk.id.shop} </h4>
          </div>

          <i className="fas fa-chevron-right" style={{ marginRight: '24px' }} />
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
        {Menu}
      </Paper>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          margin: '4px',
        }}
      >
        {!edit ? (
          <>
            <Button
              variant="contained"
              color="default"
              style={{ margin: '8px', maxWidth: '100px' }}
              startIcon={<CreateIcon />}
              onClick={() => handleEdit()}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => DeleteStore()}
            >
              Delete Store
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '8px', maxWidth: '100px' }}
              startIcon={<CreateIcon />}
              onClick={() => {
                handleEdit();
                UpdateMenu();
              }}
            >
              Update
            </Button>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentKiosk: state.shop.currentKiosk,
  };
};

export default connect(mapStateToProps)(SingleStorePage);
