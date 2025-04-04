import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import UploadResume from "./steps/UploadResume";
import BasicDetails from "./steps/BasicDetails";
import Skills from "./steps/Skills";
import Education from "./steps/Education";
import Summary from "./steps/Summary";
import Confirmation from "./steps/Confirmation";

const steps = [
  "Upload Resume",
  "Basic Details",
  "Skill Set",
  "Education Details",
  "Summary",
  "Completed",
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("multiStepFormData");
    return saved
      ? JSON.parse(saved)
      : {
          resume: null,
          basicDetails: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          },
          skills: [],
          education: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("multiStepFormData", JSON.stringify(formData));
  }, [formData]);

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.resume !== null;
  
      case 1: {
        const { firstName, lastName, email, phone } = formData.basicDetails;
        return (
          firstName.trim().length >= 3 &&
          lastName.trim().length >= 3 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
          /^\d{10,}$/.test(phone)
        );
      }
  
      case 2:
        return formData.skills.length > 0;
  
      case 3:
        return formData.education.length > 0; // ✅ Fix here
  
      case 4:
        return agreed; // ✅ Moved from case 3
  
      default:
        return true;
    }
  };
  

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setValidationMessage("");
      setActiveStep((prev) => prev + 1);
    } else {
      setValidationMessage("Please fill in all required fields correctly.");
    }
  };

  const handleBack = () => {
    setValidationMessage("");
    setActiveStep((prev) => prev - 1);
  };

  const handleDataChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const confirmReset = () => {
    localStorage.removeItem("multiStepFormData");
    setFormData({
      resume: null,
      basicDetails: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      skills: [],
      education: [],
    });
    setActiveStep(0);
    setAgreed(false);
    setShowDialog(false);
    setValidationMessage("");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <UploadResume
            data={formData.resume}
            onChange={(value) => handleDataChange("resume", value)}
          />
        );
      case 1:
        return (
          <BasicDetails
            data={formData.basicDetails}
            onChange={(value) => handleDataChange("basicDetails", value)}
          />
        );
      case 2:
        return (
          <Skills
            data={formData.skills}
            onChange={(value) => handleDataChange("skills", value)}
          />
        );
      case 3:
        return (
          <Education
            data={formData.education}
            onChange={(value) => handleDataChange("education", value)}
          />
        );
      case 4:
        return (
          <Summary data={formData} agreed={agreed} setAgreed={setAgreed} />
        );
      case 5:
        return <Confirmation />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": { color: "#ccc" },
          "& .Mui-active .MuiStepIcon-root, & .Mui-completed .MuiStepIcon-root":
            {
              color: "#F15A29",
            },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Reset Icon Button */}
      {activeStep < steps.length - 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Tooltip title="Reset Form">
            <IconButton
              size="small"
              onClick={() => setShowDialog(true)}
              sx={{
                color: "#f44336",
                border: "1px solid #f44336",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "#ffeaea",
                },
              }}
            >
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Dialog for Confirm Reset */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Reset Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the form? All your entered data will
            be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmReset} color="error" variant="contained">
            Reset
          </Button>
        </DialogActions>
      </Dialog>

      {/* Step Content */}
      <Box sx={{ my: 4 }}>{renderStepContent(activeStep)}</Box>

      {/* Validation message */}
      {validationMessage && (
        <Typography color="error" textAlign="center" mt={2}>
          {validationMessage}
        </Typography>
      )}

      {/* Navigation Buttons */}
      {activeStep === 4 ? (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            onClick={handleBack}
            variant="outlined"
            sx={{ borderColor: "#333", color: "#333" }}
          >
            Edit
          </Button>
          <Button
            onClick={handleNext}
            disabled={!agreed}
            variant="contained"
            sx={{
              backgroundColor: agreed ? "#F15A29" : "#ccc",
              "&:hover": {
                backgroundColor: agreed ? "#D14E24" : "#ccc",
              },
            }}
          >
            Confirm
          </Button>
        </Box>
      ) : activeStep < steps.length - 1 ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ borderColor: "#333", color: "#333" }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            variant="contained"
            sx={{
              backgroundColor: "#F15A29",
              "&:hover": { backgroundColor: "#D14E24" },
            }}
          >
            Next
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};

export default MultiStepForm;
