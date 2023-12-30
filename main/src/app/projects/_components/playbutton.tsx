'use client'

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import IconButton from '@mui/material/IconButton';

export interface PlayButtonProps {
    playing: boolean, 
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function PlayButton({playing, onClick}: PlayButtonProps){
    return (
        <IconButton onClick={onClick}>
            {
                playing ? 
                <PauseCircleOutlineIcon fontSize="large" /> : 
                <PlayCircleOutlineIcon fontSize="large" />
            }
        </IconButton>
        
    );
}