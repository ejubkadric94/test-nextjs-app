import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }


import path from 'path';
import { promises as fs } from 'fs';
import { Item } from '@/typescript/types';

export default async function handler(
    req: NextApiRequest,
    // res: NextApiResponse<Data>
    res: NextApiResponse
  ) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  
  let results = JSON.parse(fileContents).items.map((el: Item, index: number) => ({
    ...el,
    id: index,
  }))

  const searchValue = req.query.searchValue;
  if (searchValue && typeof searchValue === 'string') {
    results = results.filter((el: Item) => el.name.includes(searchValue))
  }

  res.status(200).json(results);
}