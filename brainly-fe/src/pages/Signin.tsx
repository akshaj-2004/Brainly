import { useRef, type ReactElement } from "react";
import { Button } from "../components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin(): ReactElement {

    const nameref = useRef<HTMLInputElement>(null);
    const passref = useRef<HTMLInputElement>(null);

    const navi = useNavigate();

    async function signin(e?: React.FormEvent) {
        e?.preventDefault(); 

        const username = nameref.current?.value;
        const password = passref.current?.value;

        if (!username || !password) {
            alert("Username and password are required");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            });

            alert("You have signed in");
            navi("/Dashboard")
        } catch (err) {
            console.error("Signup failed:", err);
            alert("Signup failed. Please try again.");
        }
    }

    


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="border p-2 rounded"
                        ref = {nameref}
                        
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 rounded"
                        ref = {passref}
                        
                    />
                    <Button
                        variant="primary"
                        size="lg"
                        text="Signin"
                        onClick={(e) => void signin(e)}   // forward the event, promise → void
                    />

                </form>
            </div>
        </div>
    );
}
