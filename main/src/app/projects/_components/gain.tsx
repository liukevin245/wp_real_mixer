'use client'

import { Howl } from 'howler';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

type GainProps = {
    sound: Howl
}

export default function Gain({sound}: GainProps){
    const [volume, setVolume] = useState<number>(0);

    function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }

    return (
        <div className='rounded-md py-5 m-1 ring ring-gray-700 ring-opacity-70'>
            <Box sx={{ height: 300 }} display='flex' justifyContent='center'>
                <Slider
                    sx={{
                    '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                    },
                    }}
                    value={volume}
                    orientation="vertical"
                    min={0}
                    step={0.001}
                    max={1}
                    valueLabelDisplay="off"
                    className='text-gray-700'
                    color='success'
                    onKeyDown={preventHorizontalKeyboardNavigation}
                    onChange={(e, value) => {setVolume(value as number); sound.volume(volume)}}
                />
            </Box>
        </div>
    );
}