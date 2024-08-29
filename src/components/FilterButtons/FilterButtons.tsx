import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

type FilterButtonsProps = {
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const fileTypes = [
    { type: 'All', image: '/all.png' },
    { type: 'PDF', image: '/pdf.png' },
    { type: 'Docs', image: '/docs.png' },
    { type: 'Images', image: '/images.png' },
    { type: 'MP3/Audio', image: '/mp3.png' },
    { type: 'MP4/Video', image: '/mp4.png' },
  ]

  return (
    <div className="flex gap-4 mb-4 w-full items-center justify-center">
      {fileTypes.map(({ type, image }) => (
        <Button
          key={type}
          onClick={() => onFilterChange(type)}
          className={`flex text-gray-500 items-center gap-2 px-4 py-2 rounded-full shadow-md  ${
            selectedFilter === type ? 'bg-gray-100' : 'bg-white '
          }`}
        >
          <Image src={image} width={20} height={20} alt={type} />
          {type}
        </Button>
      ))}
    </div>
  )
}
