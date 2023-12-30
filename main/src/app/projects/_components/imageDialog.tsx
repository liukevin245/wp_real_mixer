'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ImageDialogProps = {
    open: boolean, 
    setOpen: (value: boolean) => void, 
    image: string, 
    setImage: (value: string) => void
}

export default function ImageDialog({open, setOpen, image, setImage}: ImageDialogProps) {
  const textRef = React.useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if(textRef.current){
        if(textRef.current.value !== ""){
            setImage(textRef.current?.value ?? image);
        }
        else{
            setImage('https://hackmd.io/_uploads/HJlkcBavT.png');
        }
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new image URL to change.
          </DialogContentText>
          <TextField
            inputRef={textRef}
            autoFocus
            margin="dense"
            id="url"
            label="image url"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}