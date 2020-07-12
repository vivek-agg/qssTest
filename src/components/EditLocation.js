import React, { useState, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
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
  state: "",
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

    case "mergeTimings":
      return { ...state, timings: action.value };
    default:
      return state;
  }
};

const EditLocation = () => {
  const classes = useStyles();
  const { id } = useParams();
  let editState;

  if (id) {
    const locationArray = JSON.parse(localStorage.getItem("locations"));
    editState = locationArray.splice(id, 1);
  }

  const [isFacilityOpen, setIsFacilityOpen] = useState(false);

  const [locationState, dispatch] = useReducer(reducer, initialState);

  const submitTimings = (timings) => {
    console.log(timings);
    dispatch({ type: "mergeTimings", value: timings });
  };

  const closeTimings = () => {
    setIsFacilityOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const locationArray = JSON.parse(localStorage.getItem("locations")) || [];
    locationArray.push(locationState);
    localStorage.setItem("locations", JSON.stringify(locationArray));
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
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField id="suite" label="Suite No." fullWidth />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField
                    id="addressLine2"
                    label="Address Line2"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField id="city" label="City" fullWidth />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField id="state" label="State" fullWidth />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField id="zip" label="Zip Code" fullWidth />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField id="phone" label="Phone No." fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField id="timezone" label="Time Zone" fullWidth />
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
        />
      ) : (
        ""
      )}
    </>
  );
};

export default EditLocation;
