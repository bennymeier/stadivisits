import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    visitedStadiums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stadium' }],
  },
  { timestamps: true }
);

const User = mongoose.models.userSchema || mongoose.model('User', userSchema);

export default User;
