import { Category } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategories(): Promise<Category[]> {
  const res = await axios.get(URL);

  return res.data;
}
