import dbConnect from '../../../lib/dbConnect';
import Stadium from '../../../models/Stadium';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const stadium = await Stadium.findById(id);
        if (!stadium) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: stadium });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const stadium = await Stadium.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!stadium) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: stadium });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedStadium = await Stadium.deleteOne({ _id: id });
        if (!deletedStadium) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
