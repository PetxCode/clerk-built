import { dbConfig } from "@/utils/dbConfig";
import userModel from "@/utils/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConfig();

    const users = await userModel.find();

    return NextResponse.json({
      message: "success from GET",
      status: 200,
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Errror from GET",
      status: 404,
      data: error,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();
    const { name, email, avatar, clerkID } = await req.json();

    const users = await userModel.create({ name, email, avatar, clerkID });

    return NextResponse.json({
      message: "success from POST",
      status: 200,
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Errror from POST",
      status: 404,
      data: error,
    });
  }
};
