"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);

      // const response = axios.post("/api/users/signup", user);
      // toast.promise(response, {
      //   loading: "Loading...",
      //   success: (data) => `${data}`,
      //   error: (data) => `${data}`,
      // });
      const response = await axios.post("/api/users/signup", user)

      console.log(response.data);

      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className=" text-3xl mb-3">{loading ? "Loading..." : "Signup"}</h1>
        <hr />
        {/* Username */}
        <label htmlFor="username">Username</label>
        <input
          className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          value={user.username}
          id="username"
          placeholder="Username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="email"
          value={user.email}
          id="email"
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="password"
          value={user.password}
          id="password"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`p-2 text-sm border rounded-lg mb-4  focus:outline-none focus:border-gray-600 
          ${
            buttonDisabled
              ? " border-gray-500 text-gray-400"
              : "border-gray-300 text-white"
          }`}
        >
          Signup here
        </button>
        <Link href="/login" className=" hover:underline">Already a user? Login here</Link>
      </div>
    </>
  );
}
