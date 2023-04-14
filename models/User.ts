import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  visitedStadiums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stadium' }],
});

const User = mongoose.models.userSchema || mongoose.model('User', userSchema);

export default User;
