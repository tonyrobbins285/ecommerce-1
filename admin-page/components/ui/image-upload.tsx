'use client';

import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

import { Button } from './button';

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
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <CldImage
              priority={true}
              src={url}
              sizes="200px"
              width={400}
              height={604}
              alt="Billboard Image"
              className="object-cover"
            />
            <Button
              className="absolute right-2 top-2 z-10"
              type="button"
              onClick={() => onRemove(url)}
              variant="destructive"
              size="icon"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <CldUploadWidget
        options={{ sources: ['local', 'url', 'unsplash'] }}
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(results: any) => {
          onChange(results.info.public_id);
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            disabled={disabled}
            variant="secondary"
            onClick={() => open()}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            <p>Upload an image</p>
          </Button>
        )}
      </CldUploadWidget>
    </>
  );
}
