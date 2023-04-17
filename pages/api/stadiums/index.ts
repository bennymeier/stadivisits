import dbConnect from '../../../lib/dbConnect';
import Stadium from '../../../models/Stadium';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const stadiums = await Stadium.find({});
        res.status(200).json({ success: true, data: stadiums });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const stadium = await Stadium.create(req.body);
        res.status(201).json({ success: true, data: stadium });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
