import React from "react";
import {
  Typography,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Button,
  Chip,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const Skills = ({ data, onChange }) => {
  const [skill, setSkill] = React.useState("");
  const [level, setLevel] = React.useState("Intermediate");

  const addSkill = () => {
    if (skill.trim()) {
      onChange([...data, { name: skill, level }]);
      setSkill("");
      setLevel("Intermediate");
    }
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const commonInputStyle = {
    background: "#FAFAFA",
    "& fieldset": { border: "none" },
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Add Skill Sets
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* Skill Input */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            placeholder="Add Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            sx={commonInputStyle}
          />
        </Grid>

        {/* Experience Level Dropdown */}
        <Grid item xs={4}>
          <Select
            fullWidth
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            sx={commonInputStyle}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Expert">Expert</MenuItem>
          </Select>
        </Grid>

        {/* Add Button */}
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={addSkill}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#F15A29",
              color: "#fff",
              "&:hover": { backgroundColor: "#D14E24" },
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      {/* Skills List */}
      <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
        {data.map((item, index) => (
          <Chip
            key={index}
            label={`${item.name} (${item.level})`}
            onDelete={() => removeSkill(index)}
            deleteIcon={<CloseIcon />}
            sx={{
              backgroundColor: "#FAFAF5",
              color: "#000",
              fontWeight: 500,
              borderRadius: "8px",
              "& .MuiChip-deleteIcon": { color: "#D14E24" },
            }}
          />
        ))}
      </Box>

    
    </Box>
  );
};

export default Skills;
