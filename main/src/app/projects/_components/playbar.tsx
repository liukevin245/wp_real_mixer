'use client'

import { Howl } from "howler";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type PlayBarProps = {
    sound1: Howl, 
    sound2: Howl, 
    sound3: Howl, 
    sound4: Howl, 
    sound5: Howl, 
    position: number, 
    setPosition: (value: number) => void, 
    setMoving: (value: boolean) => void, 
    duration: number, 
}

export default function PlayBar({sound1, sound2, sound3, sound4, sound5, position, setPosition, setMoving, duration}: PlayBarProps){
    const TinyText = styled(Typography)({
        fontSize: '0.75rem',
        opacity: 0.38,
        fontWeight: 500,
        letterSpacing: 0.2,
    });

    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    return (
        <>
            <Slider
                aria-label="time-indicator"
                value={position}
                min={0}
                step={0.1}
                max={duration}
                className='text-gray-700'
                color='success'
                onChange={(e, value) => {setPosition(value as number); sound1.seek(position); sound2.seek(position); sound3.seek(position); sound4.seek(position); sound5.seek(position); if(e.type === 'mousedown') setMoving(true)}}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: -1,
                    ml: -1,
                    mr: -1,
                }}
            >
                <TinyText>{formatDuration(Math.min(position, duration))}</TinyText>
                <TinyText>-{formatDuration(Math.max(duration - position, 0))}</TinyText>
            </Box>
        </>
    )
}