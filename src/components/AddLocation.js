import React, { useState, useReducer, useEffect } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LocationTiming from "./LocationTiming";
import { initialTimingState, formatPhoneNumber } from "../common/type";

const states = [
  { id: "1", name: "New York" },
  { id: "2", name: "Chichago" },
  { id: "3", name: "California" },
];

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
  facility: {
    color: "#000",
    backgroundColor: "#ebe8e9",
    marginTop: "17px",

    "&:hover": {
      color: "#000",
      backgroundColor: "#ebe8e9",
    },
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
    case "onInputChange":
      return { ...state, [action.id]: action.value };

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
  const [errors, setErrors] = useState(null);
  const [phoneValid, setPhoneValid] = useState(false);
  const [zipValid, setZipValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [locationState, dispatch] = useReducer(reducer, initialState);

  const submitTimings = (timings) => {
    dispatch({ type: "mergeTimings", value: timings });
  };

  const closeTimings = () => {
    setIsFacilityOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    setSubmitted(true);
    const locationArray = JSON.parse(localStorage.getItem("locations")) || [];

    if (!locationState.locationName) {
      errors.locationName = "Required";
    }
    if (!locationState.addressLine1) {
      errors.addressLine1 = "Required";
    }
    if (!locationState.zip) {
      errors.zip = "Required";
    } else if (
      !(locationState.zip.length >= 5 && locationState.zip.length <= 10)
    ) {
      setZipValid(false);
      errors.zip = "Length should be 5-10";
    } else {
      setZipValid(true);
    }
    if (!locationState.phone) {
      errors.phone = "Required";
    } else if (!formatPhoneNumber(locationState.phone)) {
      setPhoneValid(false);
      errors.phone = "Invalid Format";
    } else {
      setPhoneValid(true);
    }
    setErrors(errors);
    console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      locationState.phone = formatPhoneNumber(locationState.phone);
      if (!id) {
        locationArray.push(locationState);
      } else {
        locationArray[id] = locationState;
      }
      localStorage.setItem("locations", JSON.stringify(locationArray));
      history.push("/");
      setSubmitted(false);
    }
  };

  return (
    <>
      <div className={classes.locationContainer}>
        <Grid container className={classes.loactionWrapper}>
          <Typography variant="h6" className={classes.title}>
            Add Locations
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container>
              <Grid item xs={12} sm={12} className={classes.locationField}>
                <TextField
                  id="locationName"
                  label="Location Name"
                  fullWidth
                  value={locationState.locationName}
                  onChange={(e) =>
                    dispatch({
                      type: "onInputChange",
                      value: e.target.value,
                      id: "locationName",
                    })
                  }
                  required="true"
                  error={
                    submitted && !(locationState && locationState.locationName)
                  }
                  helperText={errors && errors.locationName}
                  floatingLabelText="Location Name"
                  errorText="Required"
                />
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <TextField
                    required="true"
                    id="addressLine1"
                    label="Address Line1"
                    fullWidth
                    value={locationState.addressLine1}
                    onChange={(e) =>
                      dispatch({
                        type: "onInputChange",
                        value: e.target.value,
                        id: "addressLine1",
                      })
                    }
                    error={
                      submitted &&
                      !(locationState && locationState.addressLine1)
                    }
                    helperText={errors && errors.addressLine1}
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
                        type: "onInputChange",
                        value: e.target.value,
                        id: "suite",
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
                        type: "onInputChange",
                        value: e.target.value,
                        id: "addressLine2",
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
                        type: "onInputChange",
                        value: e.target.value,
                        id: "city",
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Select
                      labelId="state"
                      id="state"
                      value={locationState.stateName}
                      onChange={(e) => {
                        dispatch({
                          type: "onInputChange",
                          value: e.target.value,
                          id: "stateName",
                        });
                      }}
                    >
                      {states.map((state) => (
                        <MenuItem key={state.id} value={state.name}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField
                    required="true"
                    error={
                      submitted &&
                      !(locationState && locationState.zip && zipValid)
                    }
                    id="zip"
                    label="Zip Code"
                    fullWidth
                    value={locationState.zip}
                    helperText={errors && errors.zip}
                    onChange={(e) => {
                      const newVal = e.target.value.replace(/\s/g, "");
                      dispatch({
                        type: "onInputChange",
                        value: newVal,
                        id: "zip",
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.locationField}>
                  <TextField
                    required="true"
                    error={
                      submitted &&
                      !(locationState && locationState.phone && phoneValid)
                    }
                    id="phone"
                    label="Phone No."
                    type="text"
                    fullWidth
                    value={locationState.phone}
                    onChange={(e) =>
                      dispatch({
                        type: "onInputChange",
                        value: e.target.value,
                        id: "phone",
                      })
                    }
                    helperText={errors && errors.phone}
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
                        type: "onInputChange",
                        value: e.target.value,
                        id: "timezone",
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <Button
                    variant="contained"
                    color="secondary"
                    id="facilityTime"
                    fullWidth
                    className={classes.facility}
                    onClick={() => setIsFacilityOpen(true)}
                  >
                    Facility Time
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.locationField}>
                  <ChipInput
                    onChange={(chip) => {
                      dispatch({
                        type: "onInputChange",
                        value: chip,
                        id: "appointment",
                      });
                    }}
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
