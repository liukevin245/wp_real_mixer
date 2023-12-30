'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ImageDialog from './imageDialog';


const ImageButtonBase = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  left: 50, 
  top: 50, 
  height: 300,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});


export default function ImageButton() {
    const [image, setImage] = useState<string>('https://hackmd.io/_uploads/HJlkcBavT.png')
    const [open, setOpen] = useState<boolean>(false);
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {setTime(Date.now());}, 10);
    
        return () => {
          clearInterval(interval);
        };
      }, []);

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                <ImageButtonBase
                onClick={() => setOpen(true)}
                focusRipple
                style={{
                    width: 200, 
                    height: 200, 
                    transform: 'rotate(0deg)'.replace('0', ((time / 100) % 360) as unknown as string),
                }}
                >
                <ImageSrc style={{ backgroundImage: `url(${image})`, borderRadius: '50%' }} />
                </ImageButtonBase>
            </Box>

            <ImageDialog
                open={open}
                setOpen={setOpen}
                image={image}
                setImage={setImage}
            />
        </>
    );
}