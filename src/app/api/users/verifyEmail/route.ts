import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const { token, emailType } = await request.json();
    console.log(token, emailType);

    let user = undefined;

    // Finding user based on token
    // Also the token should not be expired
    if (emailType === "VERIFY") {
      user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() },
      });
      console.log(user);

      if (!user)
        return NextResponse.json({ error: "Invalid token" }, { status: 500 });

      // Resetting token and token expiry
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
    } else {
      // If emailType === "RESET"
      user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      });
      console.log(user);

      if (!user)
        return NextResponse.json({ error: "Invalid token" }, { status: 500 });

      // Resetting token and token expiry
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;
    }
    user.isVerified = true;
    await user.save();

    return NextResponse.json(
      { message: "Email verified", user, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
