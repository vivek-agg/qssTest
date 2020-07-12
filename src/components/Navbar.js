import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  header: {
    background: "transparent",
    color: "#000",
  },
  button: {
    color: "#fff",
    background: "#2b5e8c",
    borderRadius: "15px",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Locations
          </Typography>

          <Link to="/addLocation" className={classes.link}>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<AddOutlinedIcon />}
            >
              Add Locations
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
