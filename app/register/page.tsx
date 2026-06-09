"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { axiosInstance } from "@/lib/utils/axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axiosInstance.post("/api/auth/register", form);
      router.push("/login");
    } catch {
      alert("Errore registrazione");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Register</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField name="nome" label="Nome" onChange={handleChange} />
        <TextField name="cognome" label="Cognome" onChange={handleChange} />
        <TextField name="email" label="Email" onChange={handleChange} />
        <TextField name="password" label="Password" type="password" onChange={handleChange} />
        <TextField name="confirmPassword" label="Conferma Password" type="password" onChange={handleChange} />

        <Button variant="contained" onClick={handleRegister}>
          Registrati
        </Button>
      </Box>
    </Box>
  );
}