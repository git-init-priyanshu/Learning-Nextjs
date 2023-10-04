"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function VefifyEmailPage({ params }: any) {
  const searchParams = useSearchParams();

  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    setToken(token || "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      console.log(token);
      try {
        const response = await axios.post("/api/users/verifyEmail", {
          token,
          emailType: params.id,
        });

        setUser(response.data.user);
        setIsVerified(true);
      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
      }
    };
    token.length > 0 && verifyUserEmail();
  }, [params.id, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-4xl">
        {isVerified ? "Email verified" : "Not verified"}
      </h1>
      <h2 className=" p-2 text-white">{user ? `${user.email}` : "No token"}</h2>

      {isVerified && params.id === "VERIFY" && (
        <div>
          <Link
            href="/login"
            className="p-2 my-2 border rounded-lg mb-4 border-gray-300 text-white focus:outline-none focus:border-gray-600"
          >
            Login
          </Link>
        </div>
      )}
      {isVerified && params.id === "RESET" && (
        <div>
          <Link
            href={`/reset?email=${user.email}`}
            className="p-2 my-2 border rounded-lg mb-4 border-gray-300 text-white focus:outline-none focus:border-gray-600"
          >
            Reset Password
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="p-2 rounded-lg mb-4 text-red-500">Error</h2>
        </div>
      )}
    </div>
  );
}
