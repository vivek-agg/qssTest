import React, { useReducer } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
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
  },
  timeInput: {
    width: "60px",
    top: "7px",
    "& input": {
      padding: "5px",
      height: "14px",
    },
  },
  checkbox: {
    width: "80px",
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
              //   isToPm: fromCopy.isToPm,
              //   isFromPm: fromCopy.isFromPm,
            }
          : {
              ...s,
            }
      );
    case "toggleToPm":
      return state.map((s, index) => ({
        ...s,
        isToPm: action.index === index ? !s.isToPm : s.isToPm,
      }));

    case "toggleFromPm":
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

  const [formState, dispatch] = useReducer(reducer, initialTimingState);

  const changeTimeFormat = (e, index, type) => {
    const taretValue = e.target.value;
    let dispatchType;
    const timeArray = taretValue.split(":");
    const newHours = timeArray[0] < 12 ? timeArray[0] : (timeArray[0] * 1) % 12;
    const newMins = timeArray[1] ? timeArray[1] : "00";
    if (type === "from") {
      dispatchType = "fromTimeChange";
    } else {
      dispatchType = "toTimeChange";
    }
    dispatch({
      type: dispatchType,
      index,
      value: (newHours < 10 ? "0" : "") + newHours + ":" + newMins,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    props.submitTimings(formState);
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
                <div>
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
                  {/* <FormControlLabel
                    control={
                      <Switch
                        checked={row.isFromPm}
                        onChange={() => {
                          dispatch({ type: "toggleFromPm", index });
                        }}
                        name={`${row}FromSwitch`}
                      />
                    }
                    label="Small"
                  /> */}
                  <Switch
                    checked={row.isFromPm}
                    onChange={() => {
                      dispatch({ type: "toggleFromPm", index });
                    }}
                    name={`${row}FromSwitch`}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
                <div>
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
                  <Switch
                    checked={row.isToPm}
                    onChange={() => {
                      dispatch({ type: "toggleToPm", index });
                    }}
                    name={`${row}ToSwitch`}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
                <div
                  onClick={() => dispatch({ type: "applyToAllChecked", index })}
                >
                  Apply to All Checked
                </div>
              </div>
            ))}
            <Button onClick={props.closeTimings}>Cancel </Button>
            <Button type="submit">Save </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LocationTiming;
