'use client';
import { Color, Size } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

type FilterProps = {
  valueKey: string;
  name: string;
  data: (Size | Color)[];
};

export default function Filter({ valueKey, name, data }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] === null;
    }

    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true },
    );
  };

  return <div>Filter</div>;
}
