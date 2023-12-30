'use client'

import { Howl, Howler } from 'howler';

import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils/shadcn';
import { Tooltip, Button } from "@material-tailwind/react";
import PlayButton from '../../_components/playbutton';
import PlayBar from '../../_components/playbar';
import Channel from '../../_components/channel';

import type { User } from "@/lib/types";

const DefaultSound = new Howl({ src: [defaultMP3],format: ['mp3'],});

export default function ChannelList({ projectId }: { projectId: User["id"] }) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [solo, setSolo] = useState<number>(0);
  const [moving, setMoving] = useState<boolean>(false);

  const [soundImport1, setSoundImport1] = useState<Howl>(DefaultSound);
  const [soundImport2, setSoundImport2] = useState<Howl>(DefaultSound);

  var sound1 = soundImport1;
  var sound2 = soundImport2;
  var duration1 = soundImport1.duration || 3;
  var duration2 = soundImport2.duration

  let duration = Math.min(duration1, duration2);
  const duration_sec = Math.floor(Math.min(duration1, duration2) / 1000);
  const [time, setTime] = useState(Date.now());

  const onDrop = (acceptedFiles: File[], channel: number) => {
    acceptedFiles.forEach((file) => {
      if (channel === 1) {
        setImportStatus1(true);
        const soundof1 = new Howl({
          src: [URL.createObjectURL(file)],
          format: ['mp3'],
        });
        setSoundImport1(soundof1);
      } else if (channel === 2) {
        setImportStatus2(true);
        const soundof2 = new Howl({
          src: [URL.createObjectURL(file)],
          format: ['mp3'],
        });
        setSoundImport2(soundof2);
      }
    });
    console.log('Accepted files:', acceptedFiles);
  };
  
  useEffect(() => {
    const interval = setInterval(() => { setTime(Date.now()); }, 100);
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
    if (!moving) {
      setPosition((sound1 === null) ? 0 : sound1.seek());
    }
  }, [time]);

  useEffect(() => {
    if (duration - (position * 1000) <= 10) {
      setPosition(duration);
      setPlaying(false);
      if (sound1 !== null) {
        sound1.seek(duration);
      }
      if (sound2 !== null) {
        sound2.seek(duration);
      }
    }
  }, [position]);

  const handlePlayButton = () => {
    if (sound1.playing()) {
      sound1.pause();
      sound2.pause();
      setPlaying(false);
    } else {
      sound1.seek(position);
      sound2.seek(position);
      sound1.play();
      sound2.play();
      setPlaying(true);
    }
  }

  const [imported1, setImportStatus1] = useState(false);
  const [imported2, setImportStatus2] = useState(false);

  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1
  } = useDropzone({
    accept: {
      'audio/mpeg': [],
      'audio/wav': []
    },
    onDrop: (acceptedFiles: File[]) => onDrop(acceptedFiles, 1)
  });

  const {
    getRootProps: getRootProps2,
    getInputProps: getInputProps2
  } = useDropzone({
    accept: {
      'audio/mpeg': [],
      'audio/wav': []
    },
    onDrop: (acceptedFiles: File[]) => onDrop(acceptedFiles, 2)
  });

  return (
    <div className='flex flex-row'>
    <div className='flex flex-col w-300 gap-10'>
      <div className="flex flex-row gap-2 mt-10 ml-10">
        <div className='bg-white text-center gap-5 w-300'>
          {imported1 ? (
            <section className={cn("w-22 rounded-md px-1 py-2 m-3 ring ring-gray-400 bg-gray-200 hover:bg-gray-300 bg-opacity-40 cursor-pointer")}>
              <div {...getRootProps1({ className: 'dropzone' })}>
                <input {...getInputProps1()} />
                <p>Imported</p>
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
                  <p>import</p>
                </div>
              </section>
            </Tooltip>
          )}
          <Channel
            sound={sound1}
            channel={1}
            solo={solo}
            setSolo={setSolo}
          />
        </div>

        <div className='bg-white text-center gap-5 w-300'>
          {imported2 ? (
            <section className={cn("w-22 rounded-md px-1 py-2 m-3 ring ring-gray-400 bg-gray-200 hover:bg-gray-300 bg-opacity-40 cursor-pointer")}>
              <div {...getRootProps2({ className: 'dropzone' })}>
                <input {...getInputProps2()} />
                <p>Imported</p>
              </div>
            </section>
          ) : (
            <Tooltip content={
              <div className='text-xl text-white'>
                Drag to drop audio files here, or click to select audio files
                <br />
                (Only *.mp3 and *.wav images will be accepted)
              </div>
            } >
              <section className={cn("rounded-md px-1 py-2 m-3 ring ring-gray-400 bg-gray-200 hover:bg-gray-300 bg-opacity-40 cursor-pointer")}>
                <div {...getRootProps2({ className: 'dropzone' })}>
                  <input {...getInputProps2()} />
                  <p>import</p>
                </div>
              </section>
            </Tooltip>
          )}
          <Channel
            sound={sound2}
            channel={2}
            solo={solo}
            setSolo={setSolo}
          />
        </div>
      </div>
      <PlayButton playing={playing} onClick={handlePlayButton} />
      <div className='w-80 mx-5'>
        <PlayBar
          sound1={sound1}
          sound2={sound2}
          position={position}
          setPosition={setPosition}
          setMoving={setMoving}
          duration={duration_sec}
        />
      </div>
    </div>
    </div>
  );
}