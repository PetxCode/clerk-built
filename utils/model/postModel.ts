import { Document, Schema, models, model, Types } from "mongoose";

interface iPost {
  title: string;
  content: string;
  postImage: string;
  user: {};
}

interface iPostData extends iPost, Document {}

const postSchema = new Schema<iPostData>(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    postImage: {
      type: String,
    },

    user: {
      type: Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const postModel = models.posts || model<iPostData>("posts", postSchema);

export default postModel;
