import { ReactNode } from 'react';

type ContainerType = {
  children: ReactNode;
};

export default function Container({ children }: ContainerType) {
  return <div className="mx-auto max-w-screen-xl px-4">{children}</div>;
}
