"use client"

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from "@mui/material";

const typeOptions = [
  { label: "test", id: "test" }
];

const perTypeValues = {
  test: [
    { label: "Value Number", type: "number" },
    { label: "Value Text", type: "text" }
  ]
}

export default function AddEventCard() {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h5">Log a new event</Typography>
          <Box pt={3} component="form">
            <Autocomplete
              disablePortal
              id="event-type-select"
              options={typeOptions}
              renderInput={(params) => <TextField {...params} label="Event Type" />}
            />

            <Box pt={3}>
              <Typography variant="h6" component="h6" gutterBottom>Event details</Typography>
              {perTypeValues.test.map(({ label, type }) => (
                <div key={label}>
                  <TextField margin="dense" id={label} key={label} label={label} type={type} />{' '}
                </div>
              ))}
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button>Add Event</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
