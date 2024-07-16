import { dbConfig } from "@/utils/dbConfig";
import postModel from "@/utils/model/postModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConfig();

    const users = await postModel.find();

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
