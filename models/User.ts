import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    visitedStadiums: [{ type: Schema.Types.ObjectId, ref: 'Stadium' }],
  },
  { timestamps: true }
);

const User = mongoose.models.userSchema || mongoose.model('User', userSchema);

export default User as any;
