"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Typography variant="h3">
        Esame finale
      </Typography>
      <Typography variant="h5">
        Di Sofia Ourhanou
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => router.push("/login")}>
          Login
        </Button>

        <Button variant="outlined" onClick={() => router.push("/register")}>
          Register
        </Button>
      </Box>
    </Box>
  );
}