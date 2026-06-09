"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils/axios";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");
    } catch (err) {
      alert("Login fallito");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Login</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <Button variant="contained" onClick={handleLogin}>
          Accedi
        </Button>
      </Box>
    </Box>
  );
}