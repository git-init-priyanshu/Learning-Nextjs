import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    await sendEmail(email, "RESET");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
