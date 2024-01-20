'use client';
import { useState } from 'react';

import * as z from 'zod';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateStoreModalStore } from '@/store/zustand';

import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const storeSchema = z.object({
  name: z.string().min(4),
});

export default function CreateStoreModal() {
  const { isOpen, onClose } = useCreateStoreModalStore();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof storeSchema>) => {
    try {
      setIsLoading(true);
      const res = await axios.post('/api/stores', values);
      window.location.assign(`/${res.data.id}`);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="E-Commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button disabled={isLoading} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
