'use client'

import { useState, useEffect } from 'react';
import { Howl } from 'howler';

import PlayButton from './playbutton';
import PlayBar from './playbar';
import Channel from './channel';
import RandomStereo from './randomStereo';
import ImageButton from './imageButton';

const DefaultSound1 = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3'], format: ['mp3'], volume: 0 });

export default function FullBoard(){
    const [playing, setPlaying] = useState<boolean>(false);
    const [position, setPosition] = useState<number>(0);
    const [solo, setSolo] = useState<number>(0);
    const [moving, setMoving] = useState<boolean>(false);
    const [sound1, setSound1] = useState<Howl>(DefaultSound1);
    const [sound2, setSound2] = useState<Howl>(DefaultSound1);
    const [sound3, setSound3] = useState<Howl>(DefaultSound1);
    const [sound4, setSound4] = useState<Howl>(DefaultSound1);
    const [sound5, setSound5] = useState<Howl>(DefaultSound1);
    const [duration1, setDuration1] = useState<number>(0);
    const [duration2, setDuration2] = useState<number>(0);
    const [duration3, setDuration3] = useState<number>(0);
    const [duration4, setDuration4] = useState<number>(0);
    const [duration5, setDuration5] = useState<number>(0);
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {setTime(Date.now());}, 100);
        const callback = (e: Event) => {
        setMoving(false);
        };

        window.addEventListener('mouseup', callback);

        return () => {
        clearInterval(interval);
        window.removeEventListener('mouseup', callback);
        };
    }, []);

    useEffect(() => {
        setDuration1(sound1.duration() * 1000);
    }, [sound1, sound1.duration()]);
    
    useEffect(() => {
        setDuration2(sound2.duration() * 1000);
    }, [sound2, sound2.duration()]);

    useEffect(() => {
        setDuration3(sound3.duration() * 1000);
    }, [sound3, sound3.duration()]);

    useEffect(() => {
        setDuration4(sound4.duration() * 1000);
    }, [sound4, sound4.duration()]);

    useEffect(() => {
        setDuration5(sound5.duration() * 1000);
    }, [sound5, sound5.duration()]);

    useEffect(() => {
        if(!moving){
            setPosition((sound1 === null) ? 0 : sound1.seek());
        }
    }, [time]);

    useEffect(() => {
        if(Math.min(duration1, duration2, duration3, duration4, duration5) - (position * 1000) <= 10){
            setPosition(Math.min(duration1, duration2, duration3, duration4, duration5));
            setPlaying(false);
            sound1.stop();
            sound2.stop();
            sound3.stop();
            sound4.stop();
            sound5.stop();
        }
    }, [position])

    const handlePlayButton = () => {
        if (playing){
            sound1.pause();
            sound2.pause();
            sound3.pause();
            sound4.pause();
            sound5.pause();
            setPlaying(false);
        }
        else{
            sound1.seek(position);
            sound2.seek(position);
            sound3.seek(position);
            sound4.seek(position);
            sound5.seek(position);

            sound1.play();
            sound2.play();
            sound3.play();
            sound4.play();
            sound5.play();
            setPlaying(true);
        }
    }

    return (
        <main className="flex h-full w-full items-center justify-center bg-gradient-to-r from-gray-100 to-gray-400">
            <div className='flex justify-between m-2 pr-5' id='channel'>
                <Channel
                    sound={sound1}
                    setSound={setSound1}
                    channel={1}
                    solo={solo}
                    setSolo={setSolo}
                />
                <Channel
                    sound={sound2}
                    setSound={setSound2}
                    channel={2}
                    solo={solo}
                    setSolo={setSolo}
                />
                <Channel
                    sound={sound3}
                    setSound={setSound3}
                    channel={3}
                    solo={solo}
                    setSolo={setSolo}
                />
                <Channel
                    sound={sound4}
                    setSound={setSound4}
                    channel={4}
                    solo={solo}
                    setSolo={setSolo}
                />
                <Channel
                    sound={sound5}
                    setSound={setSound5}
                    channel={5}
                    solo={solo}
                    setSolo={setSolo}
                />
            </div>

            <div className='flex flex-col justify-center m-2'>
                <h1 className="text-5xl font-mono text-center text-gray-700 mb-6 shadow-lg rounded-lg bg-gradient-to-r from-gray-300 to-gray-350">WP REAL MIXER</h1>

                <div className='flex justify-center m-2'>
                    <RandomStereo
                        time={time}
                        playing={playing}
                    />
                    <ImageButton />

                    <RandomStereo
                        time={time}
                        playing={playing}
                    />
                </div>

                <div className={'flex flex-col items-center m-3 bottom-2 pb-2 rounded-md ring ring-gray-700 ring-opacity-70'}>
                    <PlayButton playing={playing} onClick={handlePlayButton} />

                    <div className='w-80 mx-5'>
                    <PlayBar
                        sound1={sound1}
                        sound2={sound2}
                        sound3={sound3}
                        sound4={sound4}
                        sound5={sound5}
                        position={position}
                        setPosition={setPosition}
                        setMoving={setMoving}
                        duration={Math.floor(Math.min(duration1, duration2, duration3, duration4, duration5) / 1000)}
                    />
                    </div>
                </div>
            </div>
            
            {/* <h1 className="text-xl text-gray-600/50">Please select a project</h1> */}
        </main>
    )
}