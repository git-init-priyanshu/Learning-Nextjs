import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export const GET = async (request: NextRequest) => {
  try {
    const userID = await getDataFromToken(request);

    // Getting all the data of user except some fieds
    const user = await User.findOne({ _id: userID }).select("-password -_id -isVerified -__v");
    console.log(user);
    return NextResponse.json({ message: "User Found", user });
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 400 });
  }
};
