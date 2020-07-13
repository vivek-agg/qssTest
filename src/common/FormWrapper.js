import React from "react";
import ChipInput from "material-ui-chip-input";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  locationField: {
    paddingRight: "10px",
    paddingLeft: "10px",
    marginTop: "10px",
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

const FormWrapper = ({
  fields,
  state,
  dispatch,
  submitted,
  errors,
  setIsFacilityOpen,
  phoneValid,
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      {fields.map((field) => {
        switch (field.fieldType) {
          case "textField":
            return (
              <Grid
                item
                xs={field.xs}
                sm={field.sm}
                className={classes.locationField}
              >
                <TextField
                  id={field.id}
                  label={field.label}
                  fullWidth
                  value={state[field.name]}
                  onChange={(e) =>
                    dispatch({
                      type: field.type,
                      value: e.target.value,
                      id: field.name,
                    })
                  }
                  required={field.required}
                  error={submitted && errors[field.name]}
                  helperText={errors && errors[field.name]}
                  floatingLabelText="Location Name"
                  errorText="Required"
                />
              </Grid>
            );

          case "select":
            return (
              <Grid
                item
                xs={field.xs}
                sm={field.sm}
                className={classes.locationField}
              >
                <FormControl fullWidth>
                  <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                  <Select
                    labelId={field.id}
                    id={field.id}
                    value={state[field.name]}
                    onChange={(e) => {
                      dispatch({
                        type: field.type,
                        value: e.target.value,
                        id: field.name,
                      });
                    }}
                  >
                    {field.items.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            );

          case "chip":
            return (
              <Grid
                item
                xs={field.xs}
                sm={field.sm}
                className={classes.locationField}
              >
                <ChipInput
                  onChange={(chip) => {
                    dispatch({
                      type: field.type,
                      value: chip,
                      id: field.name,
                    });
                  }}
                  value={state[field.name]}
                  label={field.label}
                  fullWidth
                />
              </Grid>
            );
          default:
            return (
              <Grid item xs={12} sm={6} className={classes.locationField}>
                <Button
                  variant="contained"
                  color="secondary"
                  id={field.id}
                  fullWidth
                  className={classes.facility}
                  onClick={() => setIsFacilityOpen(true)}
                >
                  Facility Time
                </Button>
              </Grid>
            );
        }
      })}
    </Grid>
  );
};

export default React.memo(FormWrapper);
