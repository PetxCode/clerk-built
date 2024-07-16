import { Document, Schema, models, model } from "mongoose";

interface iUser {
  name: string;
  email: string;
  avatar: string;
  clerkID: string;
  posts: {}[];
}

interface iUserData extends iUser, Document {}

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
    },
    clerkID: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  { timestamps: true }
);

const userModel = models.users || model<iUserData>("users", userSchema);

export default userModel;
