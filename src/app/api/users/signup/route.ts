import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export const POST = async (req: NextRequest) => {

  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 500 }
      );
    }

    // Encrypting password
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    // Creating new user
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    });
    // Saving new user
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      { message: "User created successfully", success: true, user: savedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
