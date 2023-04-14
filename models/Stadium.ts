import mongoose from 'mongoose';

interface IStadium {
  name: string;
  city: string;
  country: string;
  capacity: number;
  image: string;
  visitedBy: string[];
  comments: string[];
}

const { Schema } = mongoose;
const stadiumSchema = new Schema<IStadium>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  capacity: { type: Number, required: true },
  image: { type: String, required: true },
  visitedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Stadium =
  mongoose.models.stadiumSchema || mongoose.model('Stadium', stadiumSchema);

export default Stadium;
