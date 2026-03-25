import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../auth/constance";

export default function Signup() {

    const [ name, setName] = useState("");
    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");

    const auth = useAuth();
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {  
                const response = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, username, password })
            })
                
                if (response.ok){
                    console.log("Signup successful");
                    
                }else{
                    console.error("Signup failed");
                }
        } catch (error) {
            console.error( error);
        }
        
    }

    if (auth.isAuthenticated){
        return <Navigate to="/dashboard" />;
    }

    return (
        <DefaultLayout>
                <form className="form"  onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <label> Name</label>
                <input type="text" value = {name} onChange={(e)=> setName(e.target.value)} />
                <label> Username</label>
                <input type="text" value = {username} onChange={(e)=> setUsername(e.target.value)} />
        
                <label> Password</label>
                <input type="password"  value = {password} onChange={(e)=> setPassword(e.target.value)}/>
        
                <button>Signup</button>
            </form>
            </DefaultLayout>
    )
}