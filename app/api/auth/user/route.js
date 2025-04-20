import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/database/db";
import User from "@/lib/database/models/schema";

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    console.log("Incoming user data:", data);

    // Check if the user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return new Response(
        JSON.stringify({ message: "User already exists", user: existingUser }),
        { status: 200 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Create a new user
    const user = await User.create(data);
    console.log("User saved to database:", user);

    return new Response(JSON.stringify({ message: "User saved successfully" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error saving user to database:", error.message);
    return new Response(JSON.stringify({ error: "Failed to save user" }), {
      status: 500,
    });
  }
}