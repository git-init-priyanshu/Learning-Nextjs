import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

import User from "@/models/userModel";

export const POST = async (request: NextRequest) => {
  try {
    const { newPassword, email } = await request.json();

     // Encrypting password
     const salt = await bcryptjs.genSalt(10);
     const encryptedPassword = await bcryptjs.hash(newPassword, salt);

    await User.findOneAndUpdate({ email }, { password: encryptedPassword });

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
