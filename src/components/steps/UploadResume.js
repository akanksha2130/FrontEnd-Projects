import React, { useRef, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  LinearProgress,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

const UploadResume = ({ data, onChange }) => {
  const inputRef = useRef(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      onChange(file);
      simulateUpload(file);
    }
  };

  const simulateUpload = (file) => {
    setUploading(true);
    setProgress(0);
    
    const url = URL.createObjectURL(file);
    setFileUrl(url);

    let uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleRemoveFile = () => {
    onChange(null);
    setFileUrl(null);
    setProgress(0);
    setUploading(false);
  };

  return (
    <Box sx={{ textAlign: "center", maxWidth: 500, margin: "auto" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Upload Resume
      </Typography>

      {/* Drag and Drop Area */}
      <Paper
        variant="outlined"
        sx={{
          border: "2px dashed #ccc",
          padding: "20px",
          cursor: "pointer",
          backgroundColor: "#fafafa",
          "&:hover": { borderColor: "#ff5722" },
        }}
        onClick={handleUploadClick}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: "#ff5722" }} />
        <Typography variant="body2" color="textSecondary">
          Choose a file or drag & drop it here
        </Typography>
        <Typography variant="caption" color="textSecondary">
          (PDF format only)
        </Typography>
        <input
          type="file"
          accept=".pdf"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </Paper>

      {/* Uploaded File Preview */}
      {data && (
        <Box mt={2} p={2} borderRadius={2} bgcolor="#f5f5f5">
          <Stack direction="row" alignItems="center" spacing={1}>
            <PictureAsPdfIcon color="error" />
            <Typography variant="body2">{data.name}</Typography>
            <IconButton
              href={fileUrl}
              download={data.name}
              title="Download Resume"
            >
              <DownloadIcon />
            </IconButton>
            <IconButton onClick={handleRemoveFile} title="Remove File">
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>

          {/* Upload Progress Bar */}
          {uploading && (
            <Box mt={1}>
              <LinearProgress variant="determinate" value={progress} />
              <Typography variant="caption" color="textSecondary">
                {progress}% Uploading...
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Next Button */}
     
    </Box>
  );
};

export default UploadResume;
