'use client'

import { useEffect, useState } from "react";

type RandomStereoProps = {
    time: number, 
    playing: boolean
}

export default function RandomStereo({playing}: RandomStereoProps){
    const [amp, setAmp] = useState<number>(0);
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {setTime(Date.now());}, 300);
    
        return () => {
          clearInterval(interval);
        };
      }, []);

    useEffect(() => {
        if(playing){
            setAmp(Math.floor(Math.random() * 20));
        }
        else{
            setAmp(0);
        }
    }, [time, playing]);

    return (
        <>
            <div className={'flex flex-col items-center m-3 bottom-2 rounded-md ring ring-gray-700 ring-opacity-70'}>
                {Array(20).fill(0).map((_, i) => {if(i - 19 > -amp) return (
                    <div key={i} className="flex justify-center ring ring-gray-700 ring-opacity-70 m-2 px-8">
                    </div>
                )
                else return (
                    <div key={i} className="flex justify-center ring ring-gray-700 ring-opacity-0 m-2 px-8">
                    </div>
                )
                })}
            </div>
        </>
    );
}