import React, { FC, useEffect, useState } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Pagination from "@material-ui/lab/Pagination";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ModalCharacter } from "./ModalCharacter";

import {
  fetchCharacters,
  fetchCharactersSuccess,
} from "../../../redux/charactersData/charactersSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export const Characters: FC = () => {
  const classes = useStyles();

  const characters = useTypedSelector(
    (state) => state.characters.charactersData
  );

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedChar, setSelectedChar] = useState(null);

  const handleOpenModal = (character: any) => {
    setSelectedChar(character);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(fetchCharacters({ page, species, status, gender }));
  }, [page, species, status, gender]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSelectSpecies = (e: any) => {
    setSpecies(e.target.value);
  };
  const handleSelectStatus = (e: any) => {
    setStatus(e.target.value);
  };
  const handleSelectGender = (e: any) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <div
        className={classes.root}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Pagination
          count={characters?.info?.pages ?? 1}
          page={page}
          onChange={handleChangePage}
        />
      </div>

      <br />

      {/* ___________________________________________FILTERS______________________________________ */}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">species</InputLabel>
      </FormControl>
      <Select
        onChange={handleSelectSpecies}
        label="Species"
        inputProps={{
          name: "age",
          id: "outlined-age-native-simple",
        }}
      >
        <option aria-label="None" />
        <option>--select value--</option>
        <option value={"Human"}>Human</option>
        <option value={"Alien"}>Alien</option>
        <option value={"Mythological Creature"}>Mythological Creature</option>
        <option value={"Animal"}>Animal</option>
      </Select>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">status</InputLabel>
      </FormControl>
      <Select
        onChange={handleSelectStatus}
        label="Status"
        inputProps={{
          name: "age",
          id: "outlined-age-native-simple",
        }}
      >
        <option aria-label="None" value="" />
        <option>--select value--</option>
        <option value={"Alive"}>Alive</option>
        <option value={"Dead"}>Dead</option>
        <option value={"unknown"}>unknown</option>
      </Select>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">gender</InputLabel>
      </FormControl>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        onChange={handleSelectGender}
        label="Age"
      >
        <option aria-label="None" value="" />
        <option>--select value--</option>
        <option value={"Male"}>Male</option>
        <option value={"Female"}>Female</option>
        <option value={"unknown"}>Unknown</option>
      </Select>
      {/* ________________________________________________________________________________________ */}

      <br />
      <div className={classes.demo}>
        <List dense={false}>
          {characters &&
            characters.results.map((item) => (
              <ListItem onClick={() => handleOpenModal(item)} key={item.id}>
                <ListItemIcon>
                  <Avatar
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "100px",
                    }}
                    src={item.image}
                    alt="item image"
                  />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.species} />
                <ListItemText primary={item.status} />
                <ListItemText primary={item.gender} />
              </ListItem>
            ))}
        </List>
        <ModalCharacter
          character={selectedChar}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};
