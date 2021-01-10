import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Post = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  {
    collection: 'posts',
  }
);

export default mongoose.model('Post', Post);
