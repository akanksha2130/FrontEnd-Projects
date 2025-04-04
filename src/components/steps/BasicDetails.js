import React, { useState } from "react";
import { Grid, OutlinedInput, InputAdornment, Select, MenuItem, Box, Typography, FormHelperText } from "@mui/material";

const countryOptions = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+33", flag: "🇫🇷", name: "France" },
];

const BasicDetails = ({ data, onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleCountryChange = (event) => {
    const selected = countryOptions.find((c) => c.code === event.target.value);
    setSelectedCountry(selected);
    handleChange("countryCode", selected.code);
  };

  const commonInputStyle = {
    background: "#FAFAFA",
    "& fieldset": { border: "none" },
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Basic Information
      </Typography>

      <Grid container spacing={2}>
        {/* First Name */}
        <Grid item xs={12}>
          <OutlinedInput
            fullWidth
            placeholder="First Name"
            required
            value={data.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={data.firstName && data.firstName.length < 3}
            sx={commonInputStyle}
          />
          {data.firstName && data.firstName.length < 3 && (
            <FormHelperText sx={{ color: "red" }}>Min length: 3 characters.</FormHelperText>
          )}
        </Grid>

        {/* Last Name */}
        <Grid item xs={12}>
          <OutlinedInput
            fullWidth
            placeholder="Last Name"
            required
            value={data.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            sx={commonInputStyle}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <OutlinedInput
            fullWidth
            placeholder="Email Address"
            required
            type="email"
            value={data.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            error={data.email && !/\S+@\S+\.\S+/.test(data.email)}
            sx={commonInputStyle}
          />
          {data.email && !/\S+@\S+\.\S+/.test(data.email) && (
            <FormHelperText sx={{ color: "red" }}>Enter valid email id</FormHelperText>
          )}
        </Grid>

        {/* Phone Number */}
        <Grid item xs={10}>
          <OutlinedInput
            fullWidth
            required
            type="tel"
            placeholder="Phone Number"
            value={data.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={data.phone && (data.phone.length < 10 || !/^\d+$/.test(data.phone))}
            startAdornment={
              <InputAdornment position="start">
                <Box sx={{ display: "flex", alignItems: "center", background: "#F5F5F5", padding: "8px 12px", borderRadius: "8px 0 0 8px" }}>
                  <Select
                    value={selectedCountry.code}
                    onChange={handleCountryChange}
                    variant="standard"
                    disableUnderline
                    sx={{ minWidth: 70, background: "transparent" }}
                  >
                    {countryOptions.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </InputAdornment>
            }
            sx={commonInputStyle}
          />
          {data.phone && (data.phone.length < 10 || !/^\d+$/.test(data.phone)) && (
            <FormHelperText sx={{ color: "red" }}>Enter valid phone number</FormHelperText>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicDetails;
