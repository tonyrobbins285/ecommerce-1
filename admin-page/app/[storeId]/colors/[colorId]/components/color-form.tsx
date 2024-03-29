'use client';
import { z } from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Color } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .regex(/^#/, { message: 'String must be a valid hex code' }),
});

type ColorFormProps = {
  initialData: Color | null;
};

type FormValues = z.infer<typeof formSchema>;

export default function ColorForm({ initialData }: ColorFormProps) {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const toastMessage = initialData ? 'Color updated' : 'Color created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '', value: '' },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Color name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <Input
                      disabled={isLoading}
                      placeholder="Color value"
                      {...field}
                    />
                    <div
                      className="rounded-full border p-4"
                      style={{ backgroundColor: field.value }}
                    ></div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
}
