import React from "react";
import {
  Typography,
  Box,
  Divider,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
  Button
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Summary = ({ data, agreed, setAgreed }) => {
  const { resume, basicDetails = {}, skills = [], education = [] } = data;

  const extractYear = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : "N/A";
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {/* Stepper */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Summary
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />

      {/* Resume Section */}
      <Typography variant="h6" fontWeight={600}>Resume</Typography>
      {resume && resume instanceof File && (
        <Box mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>{resume.name}</Typography>
            <IconButton href={URL.createObjectURL(resume)} download={resume.name}>
              <PictureAsPdfIcon color="error" fontSize="large" />
            </IconButton>
          </Stack>
        </Box>
      )}
      <Divider sx={{ my: 2 }} />

      {/* Basic Details */}
      <Typography variant="h6" fontWeight={600}>Basic Information</Typography>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={6}><Typography><strong>First Name:</strong> {basicDetails?.firstName || "N/A"}</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Last Name:</strong> {basicDetails?.lastName || "N/A"}</Typography></Grid>
       </Grid>
       <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={6}><Typography><strong>Email:</strong> {basicDetails?.email || "N/A"}</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Phone:</strong> {`${basicDetails?.countryCode || ""} ${basicDetails?.phone || "N/A"}`}</Typography></Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />

      {/* Skills */}
      <Typography variant="h6" fontWeight={600}>Skill Sets</Typography>
      <Box sx={{ my: 2 }}>
        {skills.length > 0 ? (
          skills.map((s, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography><strong>Skill {i + 1}:</strong> {s.name}</Typography>
              <Typography><strong>Experience Level:</strong> {s.level}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No skills added.</Typography>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Education */}
      <Typography variant="h6" fontWeight={600}>Education</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: "none", mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Degree</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>University</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Start Year</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>End Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {education.length > 0 ? (
              education.map((e, i) => (
                <TableRow key={i}>
                  <TableCell>{e.degree || "N/A"}</TableCell>
                  <TableCell>{e.university || "N/A"}</TableCell>
                  <TableCell>{extractYear(e.startYear)}</TableCell>
                  <TableCell>{extractYear(e.endYear)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No education details provided.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ my: 3 }}>
        <Typography variant="body2" color="textSecondary">
          By submitting this form, you confirm that all information provided is accurate
          and complete to the best of your knowledge. Any false or misleading information
          may result in disqualification from the recruitment process or termination of
          employment if discovered later.
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
          Submission of this form does not guarantee an interview or employment. Your
          personal data will be handled confidentially and used solely for recruitment
          purposes in accordance with Beyond Labs LLC Privacy Policy.
        </Typography>
      </Box>

      {/* Agreement & Buttons */}
      <FormControlLabel
        control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} color="primary" />}
        label={<Typography variant="body2">By submitting, you agree to our <Typography component="span" color="primary">Terms & Conditions</Typography>.</Typography>}
      />

      
    </Box>
  );
};

export default Summary;
