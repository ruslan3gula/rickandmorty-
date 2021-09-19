import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
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

import {
  fetchEpisodes,
  fetchEpisodesSuccess,
  fetchEpisodesError,
} from "../../../redux/episodeData/episodesSlice";

import { episodesFilterNames } from "./filters";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    table: {
      minWidth: 650,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export function Episodes() {
  const classes = useStyles();
  const episodes = useTypedSelector((state) => state.episodes);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchEpisodes({ page, name }));
  }, [page, name]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSelectName = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div>
      <div
        className={classes.root}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Pagination
          count={episodes?.episodesData?.info?.pages ?? 1}
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
        {episodesFilterNames.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </Select>
      {/* _____________________________________________________________________________________ */}
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">ir_date</TableCell>
              <TableCell align="right">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {episodes &&
              episodes.episodesData.results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.air_date}</TableCell>
                  <TableCell align="right">
                    <a>{item.url}</a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
