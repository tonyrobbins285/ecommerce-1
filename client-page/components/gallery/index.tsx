'use client';

import { Image as ImageType } from '@/types';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import GallaryTab from './gallery-tab';

type GalleryProps = {
  images: ImageType[];
};

export default function Gallery({ images }: GalleryProps) {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GallaryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
    </Tab.Group>
  );
}
