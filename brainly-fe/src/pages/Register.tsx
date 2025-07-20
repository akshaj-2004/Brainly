import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // ───────── refs ─────────
  const signupUsernameRef = useRef<HTMLInputElement>(null);
  const signupPasswordRef = useRef<HTMLInputElement>(null);
  const signinUsernameRef = useRef<HTMLInputElement>(null);
  const signinPasswordRef = useRef<HTMLInputElement>(null);

  // ───────── handlers ─────────
  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = signupUsernameRef.current?.value?.trim();
    const password = signupPasswordRef.current?.value?.trim();

    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

      alert("Account created successfully!");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Please try again.");
    }
  }

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = signinUsernameRef.current?.value?.trim();
    const password = signinPasswordRef.current?.value?.trim();

    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      console.log(response.data);

      const { token } = response.data;
      console.log(token)

      if (token) {
        localStorage.setItem("token", token);
        alert("You have signed in!");
        navigate("/Dashboard");
      } else {
        alert("Invalid server response");
      }
    } catch (err) {
      console.error("Signin failed:", err);
      alert("Signin failed. Please try again.");
    }
  }

  // ───────── markup ─────────
  return (
    <div className="flex">
      {/* ── SIGN‑UP ───────────────────────────────── */}
      <div className="h-screen w-[30vw] bg-slate-300 ml-32 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-3xl font-semibold">
            Welcome to <span className="text-blue-400">Brainly</span>
          </h1>

          <p className="mt-1 text-2xl font-semibold">Create your account</p>

          <form onSubmit={handleSignup} className="mt-7 flex flex-col gap-2">
            <input
              ref={signupUsernameRef}
              type="text"
              name="username"
              placeholder="Username"
              required
              className="border h-12 w-[22vw] rounded-lg p-2 hover:bg-slate-100"
            />
            <input
              ref={signupPasswordRef}
              type="password"
              name="password"
              placeholder="Password"
              required
              className="border h-12 w-[22vw] rounded-lg p-2 hover:bg-slate-100"
            />

            <button
              type="submit"
              className="bg-blue-400 px-4 py-2 rounded-2xl font-semibold hover:bg-blue-500"
            >
              Create my Account
            </button>
          </form>
        </div>
      </div>

      {/* ── DIVIDER ──────────────────────────────── */}
      <div className="h-screen w-[15vw] flex justify-center items-center">
        <span className="bg-blue-500 px-4 py-3 rounded-full text-white text-2xl">or</span>
      </div>

      {/* ── SIGN‑IN ───────────────────────────────── */}
      <div className="flex flex-col h-screen justify-center">
        <h2 className="text-2xl font-semibold">Login to your account</h2>

        <form onSubmit={handleSignin} className="mt-7 flex flex-col gap-3">
          <input
            ref={signinUsernameRef}
            type="text"
            name="username"
            placeholder="Username"
            required
            className="border h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200 shadow-md"
          />
          <input
            ref={signinPasswordRef}
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200 shadow-md"
          />

          <button
            type="submit"
            className="bg-blue-400 px-4 py-2 rounded-2xl font-semibold hover:bg-blue-500 shadow-md mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
