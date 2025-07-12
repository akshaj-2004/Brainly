import { useRef, type ReactElement } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export function Signup(): ReactElement {

    const nameref = useRef<HTMLInputElement>(null);
    const passref = useRef<HTMLInputElement>(null);
    const navi = useNavigate();

    async function signup(e?: React.FormEvent) {
        e?.preventDefault(); 

        const username = nameref.current?.value;
        const password = passref.current?.value;

        if (!username || !password) {
            alert("Username and password are required");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            alert("You have signed up");
            navi('/Signin')
        } catch (err) {
            console.error("Signup failed:", err);
            alert("Signup failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form className="flex flex-col gap-4" onSubmit={signup}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border p-2 rounded"
                        ref={nameref}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 rounded"
                        ref={passref}
                    />
                    <Button variant="primary" size="lg" text="Signin" onClick={signup}/>
                </form>
            </div>
        </div>
    );
}
