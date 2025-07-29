"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const {data: session} = authClient.useSession();
  const onSubmit = () => {
    authClient.signUp.email({
      name,
      email,
      password
    }, {
      onError: () =>{
        window.alert("Error signing up")
      },
      onSuccess: () => {
        window.alert("Sign up successful")
      }
    })
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password
    }, {
      onError: () =>{
        window.alert("Error signing in")
      },
      onSuccess: () => {
        window.alert("Sign in successful")
      }
    })
  }

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if(session) {
    return (
      <div className="flex flex-col gap-y-4 p-4 items-center">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Logout</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10 ">
       <div className="flex flex-col items-center gap-y-4 p-4 ">
      <Input placeholder="name"
       value={name} onChange={(e) => 
       setName(e.target.value)} 
       />
      <Input placeholder="email"
       value={email} onChange={(e) =>
       setEmail(e.target.value)} 
       />
      <Input placeholder="password"
       value={password} onChange={(e) =>
       setPassword(e.target.value)}
       />
       <Button onClick={onSubmit}>Create user</Button>
    </div>
    <div className="flex flex-col items-center gap-y-4 p-4 ">
      <Input placeholder="email"
       value={email} onChange={(e) =>
       setEmail(e.target.value)} 
       />
      <Input placeholder="password"
       value={password} onChange={(e) =>
       setPassword(e.target.value)}
       />
       <Button onClick={onLogin}>Login</Button>
    </div>
    </div>
   
  );
}