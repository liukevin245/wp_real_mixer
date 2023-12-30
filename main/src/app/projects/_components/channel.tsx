'use client'

import { Howl } from "howler";
import { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone'
import { Tooltip } from "@material-tailwind/react";
import { cn } from "@/lib/utils/shadcn";
import Button from '@mui/material/Button';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Gain from "./gain";
import Slider from '@mui/material/Slider';

import test from '../test.mp3'

type ChannelProps = {
    sound: Howl, 
    setSound: (value: Howl) => void, 
    channel: number, 
    solo: number, 
    setSolo: (value: number) => void, 
}

function CircularProgressWithLabel(
    props: CircularProgressProps & { pan: number, setPan: (value: number) => void, angle: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={100 - (25 * Math.abs(props.pan))} sx={{color:'gray'}} style={{transform: 'rotate(0deg)'.replace('0', `${props.angle}`)}} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: -3,
            right: 0,
            position: 'absolute',
            display: 'flex flex-col',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
            <div className="opacity-0 w-full">
                <Slider 
                    aria-label="pan"
                    min={-1}
                    step={0.05}
                    max={1}
                    value={props.pan}
                    onChange={(e, value) => {props.setPan(value as number)}}
                />
            </div>
            <div className="flex justify-center -my-6">
                <Typography
                    variant="caption"
                    component="div"
                    sx={{color:'gray'}}
                >{`${props.pan}`}</Typography>
            </div>
        </Box>
      </Box>
    );
  }

const DefaultSound = new Howl({ src: [test], format: ['mp3'] });

export default function Channel({sound, setSound, channel, solo, setSolo}: ChannelProps){
    const [mute, setMute] = useState<boolean>(false);
    const [pan, setPan] = useState<number>(0);
    const [imported, setImportStatus] = useState(false);

    const {
        getRootProps: getRootProps1,
        getInputProps: getInputProps1
    } = useDropzone({
        accept: {
        'audio/mpeg': [],
        'audio/wav': []
        },
        onDrop: (acceptedFiles: File[]) => onDrop(acceptedFiles)
    });

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            setImportStatus(true);
            const soundof = new Howl({
                src: [URL.createObjectURL(file)],
                html5: true, 
                format: ['mp3'],
                volume: 0
            });

            setSound(soundof);
        });
    };

    useEffect(() => {
        if((solo !== 0) && (solo !== channel) && (sound !== null)){
            sound.mute(true);
        }
        else if(!mute && (sound !== null)){
            sound.mute(false);
        }
    }, [solo, mute]);

    useEffect(() => {
        sound.stereo(pan);
    }, [pan]);

    return (
        <div className="flex flex-col">
            {imported ? (
                <section className={cn("rounded-md px-1 py-2 m-3 ring ring-gray-400 bg-gray-200 hover:bg-gray-300 bg-opacity-40 cursor-pointer")}>
                    <div {...getRootProps1({ className: 'dropzone' })}>
                        <input {...getInputProps1()} />
                        <p className="text-center">Imported</p>
                    </div>
                </section>
            ) : (
                <Tooltip content={
                    <div className='text-xl text-white bg-black'>
                        Drag to drop audio files here, or click to select audio files
                        <br />
                        (Only *.mp3 and *.wav images will be accepted)
                    </div>
                    } >
                    <section className={cn("rounded-md px-1 py-2 m-3 ring ring-gray-400 bg-gray-200 hover:bg-gray-300 bg-opacity-40 cursor-pointer")}>
                        <div {...getRootProps1({ className: 'dropzone' })}>
                            <input {...getInputProps1()} />
                            <p className="text-center">Import</p>
                        </div>
                    </section>
                </Tooltip>
            )}

            <div className="flex flex-col rounded-md pt-5 pb-2 px-2 m-1 mx-2 ring ring-gray-700 ring-opacity-70">
                <p className="font-sans font-bold text-center text-xl text-gray-700 pb-3">
                    CH{channel}
                </p>
                
                <div className="flex justify-center mb-2">
                    <CircularProgressWithLabel
                        pan={pan}
                        setPan={setPan}
                        angle={315 + 45 * (pan) - 45 * (1 - Math.abs(pan))}
                    />
                </div>

                {(!mute) ? 
                (<Button 
                    variant="text"
                    className="text-gray-700 text-center text-lg font-bold m-1 mb-3 ring ring-gray-700 ring-opacity-70 bg-gray-200 hover:bg-gray-700 hover:bg-opacity-70"
                    onClick={() => {sound.mute(!mute); setMute(!mute)}}
                >
                    M
                </Button>) 
                : 
                (<Button 
                    variant="text"
                    className="text-yellow-600 text-center text-lg font-bold m-1 mb-3 ring ring-gray-700 ring-opacity-70 bg-gray-200 hover:bg-gray-700 hover:bg-opacity-70"
                    onClick={() => {sound.mute(!mute); setMute(!mute)}}
                >
                    M
                </Button>)}

                {(solo !== channel) ? 
                (<Button 
                    variant="text"
                    className="text-gray-700 text-center text-lg font-bold m-1 mb-3 ring ring-gray-700 ring-opacity-70 bg-gray-200 hover:bg-gray-700 hover:bg-opacity-70"
                    onClick={() => {if(solo === channel) setSolo(0); else setSolo(channel)}}
                >
                    S
                </Button>)
                : 
                (<Button 
                    variant="text"
                    className="text-red-700 text-center text-lg font-bold m-1 mb-3 ring ring-gray-700 ring-opacity-70 bg-gray-200 hover:bg-gray-700 hover:bg-opacity-70"
                    onClick={() => {if(solo === channel) setSolo(0); else setSolo(channel)}}
                >
                    S
                </Button>)}

                <Gain
                    sound={sound}
                />
            </div>
        </div>
    );
}