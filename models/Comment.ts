import mongoose from 'mongoose';

const { Schema } = mongoose;
const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stadium: {
      type: Schema.Types.ObjectId,
      ref: 'Stadium',
      required: true,
    },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.commentSchema || mongoose.model('Comment', commentSchema);

export default Comment;
