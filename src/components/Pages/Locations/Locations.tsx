import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { fetchLocations } from "../../../redux/locationsData/locationsSlice";

import {
  dimentionFilterNames,
  locationFilterNames,
  typeFilterNames,
} from "./filters";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export function Locations() {
  const classes = useStyles();
  const locations = useTypedSelector((state) => state.location.locationsData);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimention, setDimention] = useState("");

  useEffect(() => {
    dispatch(fetchLocations({ page, name, type, dimention }));
  }, [page, name, type, dimention]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSelectName = (e: any) => {
    setName(e.target.value);
  };
  const handleSelectType = (e: any) => {
    setType(e.target.value);
  };
  const handleSelectDimention = (e: any) => {
    setDimention(e.target.value);
  };

  return (
    <div>
      <div
        className={classes.root}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Pagination
          count={locations?.info?.pages ?? 1}
          page={page}
          onChange={handleChangePage}
        />
      </div>

      <br />

      {/* ___________________________________________FILTERS______________________________________ */}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">name</InputLabel>
      </FormControl>
      <Select
        onChange={handleSelectName}
        label="Species"
        inputProps={{
          name: "age",
          id: "outlined-age-native-simple",
        }}
      >
        <option aria-label="None" />
        <option>--select value--</option>
        {locationFilterNames.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </Select>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">type</InputLabel>
      </FormControl>
      <Select
        onChange={handleSelectType}
        label="Status"
        inputProps={{
          name: "age",
          id: "outlined-age-native-simple",
        }}
      >
        <option aria-label="None" value="" />
        <option>--select value--</option>
        {typeFilterNames.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </Select>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Dimention</InputLabel>
      </FormControl>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        onChange={handleSelectDimention}
        label="Age"
      >
        <option aria-label="None" value="" />
        <option>--select value--</option>
        {dimentionFilterNames.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </Select>
      {/* ________________________________________________________________________________________ */}

      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Dimensions</TableCell>
              <TableCell align="right">Residents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations &&
              locations.results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.type}</TableCell>
                  <TableCell align="right">{item.dimension}</TableCell>
                  <TableCell align="right">
                    {item.residents.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
