import { Billboard } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export default async function getBillboard(id: string): Promise<Billboard> {
  const res = await axios.get(`${URL}/${id}`);

  return res.data;
}
