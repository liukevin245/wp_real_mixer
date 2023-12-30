'use client'

import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils/shadcn';

export default function Channel() {
  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'audio/mpeg': [],
      'audio/wav': []
    }
  });

  return (
    <section className={cn("container mx-auto rounded-md py-2 m-3 ring ring-gray-400 bg-gray-200 hover:bg-gray-300 bg-opacity-40 cursor-pointer")}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag to drop audio files here, or click to select audio files</p>
        <p>(Only *.mp3 and *.wav images will be accepted)</p>
      </div>
    </section>
  )
}