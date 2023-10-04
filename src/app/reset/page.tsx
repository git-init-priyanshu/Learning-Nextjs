"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(true);
    const pass = password.password;
    const confPass = password.confirmPassword;
    if (pass === confPass && pass.length > 0 && confPass.length > 0) {
      setButtonDisabled(false);
    }
  }, [password]);

  const resetPassword = async () => {
    setLoading(true);

    const email = searchParams.get("email");
    console.log(email);
    try {
      await axios.post("/api/users/resetPassword", {
        newPassword: password.password,
        email,
      });

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className=" text-3xl mb-3">
          {loading ? "Loading..." : "Reset Password"}
        </h1>
        <hr />
        {/* New Password */}
        <label htmlFor="password">New Password</label>
        <input
          className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          value={password.password}
          id="password"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword({ ...password, password: e.target.value });
          }}
        />
        {/* Confirm Password*/}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          value={password.confirmPassword}
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword({ ...password, confirmPassword: e.target.value });
          }}
        />
        <div className="flex gap-6">
          <button
            onClick={resetPassword}
            disabled={buttonDisabled}
            className={`p-2 border text-sm border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600
            ${
              buttonDisabled
                ? " border-gray-500 text-gray-400"
                : "border-gray-300 text-white"
            }`}
          >
            Reset Password
          </button>
        </div>
      </div>
    </>
  );
}
