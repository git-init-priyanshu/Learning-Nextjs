import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const { token } = await request.json();
    console.log(token);

    // Finding user based on token
    // Also the token should not be expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log(user);
    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 500 });

    // If token is valid and we get the user then user is verified
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified", user, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
