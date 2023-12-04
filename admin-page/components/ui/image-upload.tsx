/* eslint-disable react/jsx-no-duplicate-props */
'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <Image
              src={url}
              alt="image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="yrqmvfyh" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              <p>Upload an image</p>
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
}
