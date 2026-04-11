import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../auth/constance";
import type { AuthResponseError } from "../types/types";

export default function Signup() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] =useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault();
        try {
            
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, username, password })
            });

            if (response.ok) {
                console.log("Signup successful");
                setErrorResponse("");

                goTo("/");
            } else {
                console.log("something went wrong");
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        } catch (error) {
            console.error(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Signup</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Signup</button> {/* ✅ type="submit" */}
            </form>
        </DefaultLayout>
    );
}