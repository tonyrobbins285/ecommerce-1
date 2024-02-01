import Link from 'next/link';
import { HTMLAttributes } from 'react';

type ListItemProps = HTMLAttributes<HTMLElement> & {
  title: string;
  href: string;
};

export default function ListItem({
  title,
  href,
  className,
  children,
}: ListItemProps) {
  return (
    <Link className={className} href={href}>
      {title}
      {children}
    </Link>
  );
}
