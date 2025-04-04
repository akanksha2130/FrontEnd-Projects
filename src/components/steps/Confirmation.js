import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";

const Confirmation = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      {/* Stepper */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          mb: 3,
        }}
      >
        {[...Array(5)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#F15A29",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            ✓
          </Box>
        ))}
      </Box>

      {/* Thank You Message */}
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#F15A29" }}>
        Great! Thank You for Applying
      </Typography>
      <Typography sx={{ mt: 2, color: "#555" }}>
        We appreciate your application. Our team will review it, and we’ll
        reach out soon if there’s a match. Stay tuned!
      </Typography>

      {/* Track Application Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#F15A29",
          "&:hover": { backgroundColor: "#D14E24" },
          mt: 3,
        }}
      >
        Track Application
      </Button>
    </Container>
  );
};

export default Confirmation;
