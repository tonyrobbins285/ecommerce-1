'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Color, Size } from '@/types';
import { useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

type FilterProps = {
  valueKey: string;
  name: string;
  data: (Size | Color)[];
};

export default function Filter({ valueKey, name, data }: FilterProps) {
  const searchParams = useSearchParams();
  const [currentValue, setCurrentValue] = useState<string | null>(
    searchParams.get(valueKey),
  );
  const [currentSearchParams, setCurrentSearchParams] = useState<string | null>(
    searchParams.toString(),
  );
  const onClick = (id: string) => {
    const current = qs.parse(currentSearchParams as string);
    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
      setCurrentValue(null);
    } else {
      setCurrentValue(id);
    }

    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true },
    );

    setCurrentSearchParams(qs.stringify(query));
    window.history.replaceState('', '', url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((el) => (
          <div key={el.id} className="flex items-center">
            <Button
              className={cn(
                'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                currentValue === el.id && 'bg-black text-white',
              )}
              onClick={() => onClick(el.id)}
            >
              {el.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
