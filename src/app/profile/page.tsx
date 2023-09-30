"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>({
    username: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response: any = await axios.get("/api/users/getUserData");

        console.log(response.data);
        setUser(response.data.user);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p> <b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Admin?:</b> {user.isAdmin ? "Yes" : "No"}</p>
      <button
        onClick={handleLogout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Logout
      </button>
      {/* <button onClick={getUserDetails}>hello?</button> */}
      <hr />
    </div>
  );
}
