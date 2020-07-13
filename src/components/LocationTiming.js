import React, { useReducer } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { initialTimingState } from "../common/type";

const useStyles = makeStyles({
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
  facilityWrapper: {
    width: "650px",
    boxShadow: "3px 2px 14px grey",
    background: "white",
    padding: "30px",
  },
  timeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0",
  },
  timeInput: {
    width: "60px",
    "& input": {
      padding: "5px",
      height: "14px",
    },
  },
  checkbox: {
    width: "80px",
  },
  applyToAll: {
    border: "2px solid #29608c",
    padding: "5px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    color: "#29608c",
    fontWeight: "500",
  },
  buttonWrapper: {
    textAlign: "right",
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
  fromWrapper: {
    display: "flex",
    alignItems: "center",
  },
  fromAmPm: {
    display: "flex",
    color: "#000",
    fontSize: "13px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  fromAm: {
    background: "#e2e5e6",
    padding: "3px 10px",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  fromPm: {
    background: "#e2e5e6",
    padding: "3px 10px",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  toAmPm: {
    display: "flex",
    color: "#000",
    fontSize: "13px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  toAm: {
    background: "#e2e5e6",
    padding: "3px 10px",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  toPm: {
    background: "#e2e5e6",
    padding: "3px 10px",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  isChecked: {
    background: "#29608c",
    color: "#fff",
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case "toggleCheckBox":
      return state.map((s, index) => ({
        ...s,
        checked: action.index === index ? !s.checked : s.checked,
      }));

    case "fromTimeChange":
      return state.map((s, index) => ({
        ...s,
        from: action.index === index ? action.value : s.from,
      }));

    case "toTimeChange":
      return state.map((s, index) => ({
        ...s,
        to: action.index === index ? action.value : s.to,
      }));

    case "applyToAllChecked":
      const fromCopy = state[action.index];
      return state.map((s, index) =>
        s.checked
          ? {
              ...s,
              from: fromCopy.from,
              to: fromCopy.to,
              isToPm: fromCopy.isToPm,
              isFromPm: fromCopy.isFromPm,
            }
          : {
              ...s,
            }
      );
    case "toggleToAmPm":
      return state.map((s, index) => ({
        ...s,
        isToPm: action.index === index ? !s.isToPm : s.isToPm,
      }));

    case "toggleFromAmPm":
      return state.map((s, index) => ({
        ...s,
        isFromPm: action.index === index ? !s.isFromPm : s.isFromPm,
      }));

    default:
      return state;
  }
};

const LocationTiming = (props) => {
  const classes = useStyles();
  const { timings } = props;

  const [formState, dispatch] = useReducer(
    reducer,
    timings || initialTimingState
  );

  const changeTimeFormat = (e, index, type) => {
    const taretValue = e.target.value;
    let dispatchType, toPmDispatchType;
    const timeArray = taretValue.split(":");
    const newHours = timeArray[0] < 12 ? timeArray[0] : (timeArray[0] * 1) % 12;
    const newMins = timeArray[1] ? timeArray[1] : "00";
    if (type === "from") {
      dispatchType = "fromTimeChange";
      toPmDispatchType = "toggleFromAmPm";
    } else {
      dispatchType = "toTimeChange";
      toPmDispatchType = "toggleToAmPm";
    }
    dispatch({
      type: dispatchType,
      index,
      value: (newHours < 10 ? "0" : "") + newHours * 1 + ":" + newMins,
    });
    const isAlreadyPm =
      type === "from" ? formState[index].isFromPm : formState[index].isToPm;

    if (timeArray[0] > 12 && !isAlreadyPm) {
      dispatch({ type: toPmDispatchType, index });
    }
  };

  const toggleAmPm = (e, index, type) => {
    if (e.target.className.indexOf("isChecked") > 0) {
      return true;
    }
    let dispatchType = type === "from" ? "toggleFromAmPm" : "toggleToAmPm";
    dispatch({ type: dispatchType, index });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitTimings(formState);
    props.closeTimings();
  };

  return (
    <>
      <div className={classes.facilityContainer}>
        <div className={classes.facilityWrapper}>
          <Typography variant="h6" className={classes.title}>
            Facility Times
          </Typography>
          <form onSubmit={handleSubmit}>
            {formState.map((row, index) => (
              <div className={classes.timeRow} key={index}>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      color="primary"
                      checked={row.checked}
                      name={`${row}-checkbox`}
                      onChange={() =>
                        dispatch({
                          type: "toggleCheckBox",
                          index,
                        })
                      }
                    />
                  }
                  label={row.label}
                  labelPlacement="end"
                  className={classes.checkbox}
                />
                <div className={classes.fromWrapper}>
                  <TextField
                    variant="outlined"
                    className={classes.timeInput}
                    value={row.from}
                    onKeyDown={(e) => {
                      e.target.value.replace(/\s/g, "");
                    }}
                    onChange={(e) => {
                      const newVal = e.target.value.replace(/\s/g, "");
                      dispatch({
                        type: "fromTimeChange",
                        index,
                        value: newVal,
                      });
                    }}
                    onBlur={(e) => {
                      changeTimeFormat(e, index, "from");
                    }}
                  />
                  <div className={classes.fromAmPm}>
                    <div
                      onClick={(e) => toggleAmPm(e, index, "from")}
                      className={`${classes.fromAm} ${
                        !row.isFromPm ? classes.isChecked : ""
                      }`}
                    >
                      AM
                    </div>
                    <div
                      onClick={(e) => toggleAmPm(e, index, "from")}
                      className={`${classes.fromPm} ${
                        row.isFromPm ? classes.isChecked : ""
                      }`}
                    >
                      PM
                    </div>
                  </div>
                </div>
                <div className={classes.fromWrapper}>
                  <TextField
                    variant="outlined"
                    className={classes.timeInput}
                    value={row.to}
                    onChange={(e) =>
                      dispatch({
                        type: "toTimeChange",
                        index,
                        value: e.target.value,
                      })
                    }
                    onBlur={(e) => {
                      changeTimeFormat(e, index, "to");
                    }}
                  />
                  <div className={classes.toAmPm}>
                    <div
                      onClick={(e) => toggleAmPm(e, index, "to")}
                      className={`${classes.toAm} ${
                        !row.isToPm ? classes.isChecked : ""
                      }`}
                    >
                      AM
                    </div>
                    <div
                      onClick={(e) => toggleAmPm(e, index, "to")}
                      className={`${classes.toPm} ${
                        row.isToPm ? classes.isChecked : ""
                      }`}
                    >
                      PM
                    </div>
                  </div>
                </div>
                <div
                  className={classes.applyToAll}
                  onClick={() => dispatch({ type: "applyToAllChecked", index })}
                >
                  Apply to All Checked
                </div>
              </div>
            ))}
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                color="secondary"
                onClick={props.closeTimings}
                className={classes.cancelBtn}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className={classes.primaryBtn}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LocationTiming;
