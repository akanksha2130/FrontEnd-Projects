import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import dayjs from "dayjs";

const Education = ({ data, onChange }) => {
  const [newEducation, setNewEducation] = useState({
    degree: "",
    university: "",
    startYear: null,
    endYear: null,
  });

  const [error, setError] = useState("");

  const addEducation = () => {
    if (
      !newEducation.degree ||
      !newEducation.university ||
      !newEducation.startYear ||
      !newEducation.endYear
    ) {
      setError("Please fill out all fields before adding.");
      return;
    }

    if (newEducation.endYear.isBefore(newEducation.startYear)) {
      setError("End Year cannot be before Start Year.");
      return;
    }

    setError("");
    onChange([...data, newEducation]);
    setNewEducation({
      degree: "",
      university: "",
      startYear: null,
      endYear: null,
    });
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onChange(items);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Add Education
      </Typography>

      {error && (
        <Typography color="error" mb={1}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2} alignItems="center" mb={1}>
        <Grid item xs={6}>
          <TextField
            label="Add Degree"
            fullWidth
            variant="outlined"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="University/College"
            fullWidth
            variant="outlined"
            value={newEducation.university}
            onChange={(e) =>
              setNewEducation({ ...newEducation, university: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              label="Start Year"
              value={newEducation.startYear}
              onChange={(date) =>
                setNewEducation({ ...newEducation, startYear: date })
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              label="End Year"
              value={newEducation.endYear}
              onChange={(date) => {
                if (
                  newEducation.startYear &&
                  date.isBefore(newEducation.startYear)
                ) {
                  setError("End Year cannot be before Start Year.");
                } else {
                  setError("");
                }
                setNewEducation({ ...newEducation, endYear: date });
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="warning"
          onClick={addEducation}
          disabled={
            !newEducation.degree ||
            !newEducation.university ||
            !newEducation.startYear ||
            !newEducation.endYear ||
            (newEducation.startYear &&
              newEducation.endYear &&
              newEducation.endYear.isBefore(newEducation.startYear))
          }
        >
          Add +
        </Button>
      </Box>
      </Grid>

     

      {data.length > 0 && (
        <Box mt={2}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="education-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data.map((edu, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          p={1}
                          mb={1}
                          border={1}
                          borderColor="grey.300"
                          borderRadius={2}
                          bgcolor="#fafafa"
                        >
                          <IconButton {...provided.dragHandleProps}>
                            <DragIndicatorIcon />
                          </IconButton>

                          <Typography>
                            {edu.degree} - {edu.university} (
                            {dayjs(edu.startYear).format("YYYY")} -{" "}
                            {dayjs(edu.endYear).format("YYYY")})
                          </Typography>

                          <IconButton
                            color="error"
                            onClick={() => removeEducation(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      )}
    </Box>
  );
};

export default Education;
