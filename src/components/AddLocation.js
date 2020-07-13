import React, { useState, useReducer, useEffect } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LocationTiming from "./LocationTiming";
import { initialTimingState, formatPhoneNumber } from "../common/type";
import FormWrapper from "../common/FormWrapper";
import { FormFields } from "../common/FormField";

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
              <FormWrapper
                fields={FormFields}
                errors={errors}
                state={locationState}
                dispatch={dispatch}
                submitted={submitted}
                setIsFacilityOpen={setIsFacilityOpen}
                phoneValid={phoneValid}
                zipValid={zipValid}
              />
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
