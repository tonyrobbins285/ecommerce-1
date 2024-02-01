'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

type CellLinkProps = {
  section: string;
  id: string;
  name: string;
};

export default function CellLink<T>({ section, id, name }: CellLinkProps) {
  const params = useParams();

  return <Link href={`/${params.storeId}/${section}/${id}`}>{name}</Link>;
}
