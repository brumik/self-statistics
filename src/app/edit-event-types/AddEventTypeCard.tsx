'use client'

import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import EventValueField from "./EventValueField";

export default function AddEventTypeCard() {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box pb={2} component="form">
            <Typography variant="h6" component="h6" gutterBottom>New Event Type</Typography>
            <TextField
              margin="normal"
              id="name"
              label="Name"
              type="text"
            /><br />
            <EventValueField
              id={1}
            />
          </Box>
          <Button variant="contained">Add New Field</Button>
        </CardContent>
        <CardActions>
          <Button>Add Event</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
