import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";

import {
  ICharacter,
  ICharactersData,
} from "../../../redux/charactersData/charactersSlice";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export function ModalCharacter({
  openModal,
  handleCloseModal,
  character,
}: any) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{character?.name}</h2>
      <Avatar
        style={{
          width: "100px",
          height: "100px",
          marginRight: "100px",
        }}
        src={character?.image}
        alt="item image"
      />
      <p id="simple-modal-description">{character?.origin.name}</p>
    </div>
  );
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
