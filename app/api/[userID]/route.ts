import { dbConfig } from "@/utils/dbConfig";
import postModel from "@/utils/model/postModel";
import userModel from "@/utils/model/userModel";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { userID } = params;
    const post = await userModel.findById(userID).populate({
      path: "posts",
    });

    return NextResponse.json({
      message: "success from GET",
      status: 200,
      data: post,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Errror from GET",
      status: 404,
      data: error.message,
    });
  }
};

export const POST = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { userID } = params;
    const { title, content, postImage } = await req.json();

    const user = await userModel.findById(userID);

    if (user) {
      const post = await postModel.create({ title, content, postImage });

      user.posts.push(new Types.ObjectId(post?._id));
      user.save();

      return NextResponse.json({
        message: "success from POST",
        status: 201,
        data: post,
      });
    } else {
      return NextResponse.json({
        message: "Errror from UserID",
        status: 404,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Errror from GET",
      status: 404,
      data: error,
    });
  }
};
