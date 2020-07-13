import React, { useState, useReducer, useEffect } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LocationTiming from "./LocationTiming";
import { initialTimingState } from "../common/type";

const useStyles = makeStyles({
  locationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100% - 64px)",
  },
  facilityContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    position: "absolute",
    top: 0,
    background: "rgba(0,0,0,0.5)",
    width: "100%",
    zIndex: 1,
  },
  loactionWrapper: {
    width: "650px",
    boxShadow: "3px 2px 14px grey",
    background: "white",
    padding: "30px",
  },
  facilityWrapper: {
    width: "650px",
    boxShadow: "3px 2px 14px grey",
    background: "white",
    padding: "30px",
  },
  form: {
    width: "100%",
  },
  locationField: {
    paddingRight: "10px",
    paddingLeft: "10px",
    marginTop: "10px",
  },
  primaryBtn: {
    background: "#29608c",
    marginTop: "16px",
  },
  cancelBtn: {
    background: "#f86a5d",
    marginRight: "16px",
    marginTop: "16px",
  },
  link: {
    textDecoration: "none",
  },
});

const initialState = {
  locationName: "",
  addressLine1: "",
  suite: "",
  addressLine2: "",
  city: "",
  stateName: "",
  zip: "",
  phone: "",
  timezone: "",
  facilityTime: "",
  appointment: "",
  timings: initialTimingState || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "onLocationChange":
      return { ...state, locationName: action.value };
    case "addressLine1Change":
      return { ...state, addressLine1: action.value };
    case "suiteChange":
      return { ...state, suite: action.value };
    case "addressLine2Change":
      return { ...state, addressLine2: action.value };
    case "cityChange":
      return { ...state, city: action.value };
    case "stateChange":
      return { ...state, stateName: action.value };
    case "zipChange":
      return { ...state, zip: action.value };
    case "phoneChange":
      return { ...state, phone: action.value };
    case "timezoneChange":
      return { ...state, timezone: action.value };

    case "mergeTimings":
      return { ...state, timings: action.value };

    case "changeToEditState":
      return action.value;
    default:
      return state;
  }
};

const AddLocation = ({ history }) => {
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const locationArray = JSON.parse(localStorage.getItem("locations"));
      const editState = locationArray.splice(id, 1);
      dispatch({ type: "changeToEditState", value: editState[0] });
    }
  }, []);

  const [isFacilityOpen, setIsFacilityOpen] = useState(false);

  const [locationState, dispatch] = useReducer(reducer, initialState);

  const submitTimings = (timings) => {
    dispatch({ type: "mergeTimings", value: timings });
  };

  const closeTimings = () => {
    setIsFacilityOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const locationArray = JSON.parse(localStorage.getItem("locations")) || [];
    if (!id) {
      locationArray.push(locationState);
    } else {
      locationArray[id] = locationState;
    }
    localStorage.setItem("locations", JSON.stringify(locationArray));
    history.push("/");
  };

  return (
    <>
      <div className={classes.locationContainer}>
        <Grid container className={classes.loactionWrapper}>
          <Typography variant="h6" className={classes.title}>
            Add Locations
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} sm={12} className={classes.locationField}>
                <TextField
                  id="locationName"
                  label="Location Name"
                  fullWidth
                  value={locationState.locationName}
                  onChange={(e) =>
                    dispatch({
                      type: "onLocationChange",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField
                    id="addressLine1"
                    label="Address Line1"
                    fullWidth
                    value={locationState.addressLine1}
                    onChange={(e) =>
                      dispatch({
                        type: "addressLine1Change",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField
                    id="suite"
                    label="Suite No."
                    fullWidth
                    value={locationState.suite}
                    onChange={(e) =>
                      dispatch({
                        type: "suiteChange",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField
                    id="addressLine2"
                    label="Address Line2"
                    fullWidth
                    value={locationState.addressLine2}
                    onChange={(e) =>
                      dispatch({
                        type: "addressLine2Change",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField
                    id="city"
                    label="City"
                    fullWidth
                    value={locationState.city}
                    onChange={(e) =>
                      dispatch({
                        type: "cityChange",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField
                    id="state"
                    label="State"
                    fullWidth
                    value={locationState.stateName}
                    onChange={(e) =>
                      dispatch({
                        type: "stateChange",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField
                    id="zip"
                    label="Zip Code"
                    fullWidth
                    value={locationState.zip}
                    onChange={(e) =>
                      dispatch({
                        type: "zipChange",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField
                    id="phone"
                    label="Phone No."
                    fullWidth
                    value={locationState.phone}
                    onChange={(e) =>
                      dispatch({
                        type: "phoneChange",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField
                    id="timezone"
                    label="Time Zone"
                    fullWidth
                    value={locationState.timezone}
                    onChange={(e) =>
                      dispatch({
                        type: "timezoneChange",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField
                    id="facilityTime"
                    label="Facility Time"
                    fullWidth
                    onClick={() => setIsFacilityOpen(true)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField
                    id="appointment"
                    label="Appointment Pool"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <Link to="/" className={classes.link}>
                    <Button
                      className={classes.cancelBtn}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    className={classes.primaryBtn}
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>

      {isFacilityOpen ? (
        <LocationTiming
          submitTimings={submitTimings}
          closeTimings={closeTimings}
          timings={locationState.timings}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default withRouter(AddLocation);
