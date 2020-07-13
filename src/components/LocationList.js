import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(locationName, addressLine1, phone) {
  return { locationName, addressLine1, phone };
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  noLocationWrapper: {
    top: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    transform: "translateY(-75%)",
  },
  locationImage: {
    width: "150px",
    height: "150px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#d8d8d8",
  },
  locationSvg: {
    fontSize: "96px",
    color: "#286090",
  },
  noLocationInfo: {
    "& p": {
      padding: "0",
    },
  },
  noLocationInfoTitle: {
    fontSize: "16px",
    fontWeight: "700",
  },
  noLocationInfoSubTitle: {
    fontSize: "14px",
    fontWeight: "400",
  },
});

export default function LocationList() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(
    JSON.parse(localStorage.getItem("locations"))
  );

  rows.map((row) => {
    return createData(row.locationName, row.addressLine1, row.phone);
  });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteLocation = (id) => {
    // debugger;
    const storedLocations = JSON.parse(localStorage.getItem("locations"));
    storedLocations.splice(id, 1);
    // if (storedLocations.length) {
    localStorage.setItem("locations", JSON.stringify(storedLocations));
    // }
    setRows(storedLocations);
  };

  return (
    <>
      {rows.length ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Location Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 && rows.length
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.locationName}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {row.addressLine1}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>{row.phone}</TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Link to={`/addLocation/${index}`} className={classes.link}>
                      <EditIcon />
                    </Link>
                    <DeleteIcon onClick={() => deleteLocation(index)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <div className={classes.noLocationWrapper}>
          <div className={classes.locationImage}>
            <PinDropOutlinedIcon className={classes.locationSvg} />
          </div>
          <div className={classes.noLocationInfo}>
            <p className={classes.noLocationInfoTitle}>
              Kindly Add Your Location First
            </p>
            <p className={classes.noLocationInfoSubTitle}>
              There is no location added right now
            </p>
          </div>
        </div>
      )}
    </>
  );
}
