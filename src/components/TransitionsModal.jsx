
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { Input } from "./Input";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ModalList } from './ModalList';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function TransitionsModal(props) {

  return (

    <div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.isModalOpen}
      onClose={props.closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.isModalOpen}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
          Щоб забронювати місце введіть наступні дані:
          </Typography>
            <ModalList></ModalList>
        </Box>
      </Fade>
    </Modal>
  </div>

  )
}