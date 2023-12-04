'use client';

import { toast } from 'react-hot-toast';
import { Copy, Server } from 'lucide-react';

import { Button } from './button';
import { Badge, BadgeProps } from './badge';
import { Alert, AlertDescription, AlertTitle } from './alert';

type ApiAlertProps = {
  title: string;
  description: string;
  variant: 'admin' | 'public';
};

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admid',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export default function ApiAlert({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('API route copied to the clipboard.');
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="rounded bg-muted px-2 py-1 text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
