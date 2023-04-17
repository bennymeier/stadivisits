import mongoose from 'mongoose';

interface IStadium {
  name: string;
  city: string;
  street: string;
  country: string;
  longitude: number;
  latitude: number;
  capacity: number;
  image: string;
  visitedBy: string[];
  comments: string[];
}

const { Schema } = mongoose;
const stadiumSchema = new Schema<IStadium>(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    country: { type: String, required: true },
    longitude: { type: Number },
    latitude: { type: Number },
    capacity: { type: Number, required: true },
    image: { type: String, required: true },
    visitedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

let Stadium = null;

try {
  Stadium = mongoose.model('Stadium', stadiumSchema);
} catch (e) {
  Stadium = mongoose.model('Stadium');
}

export default Stadium as any;
// const Stadium =
//   mongoose.models.stadiumSchema || mongoose.model('Stadium', stadiumSchema);

// export default Stadium;
