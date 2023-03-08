import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }
type Item = {
    price: number;
    description: string;
    name: string;
};

import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
    req: NextApiRequest,
    // res: NextApiResponse<Data>
    res: NextApiResponse
  ) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  
  const results = JSON.parse(fileContents).items.map((el: Item, index: number) => ({
    ...el,
    id: index,
  }))

  res.status(200).json(results);
}