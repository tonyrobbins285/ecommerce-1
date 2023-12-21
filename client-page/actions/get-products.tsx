import { Product } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

type Query = {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
};

export default async function getProducts(query: Query): Promise<Product[]> {
  const res = await axios.get(URL);

  return res.data;
}
