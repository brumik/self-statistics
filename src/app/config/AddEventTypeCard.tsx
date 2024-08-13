'use client'

import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import EventValueField from "./EventValueField";
import { useState } from "react";
import { IEventConfig, IEventConfigField } from "@/lib/models/EventConfig";

const save = async (data: IEventConfig) => {
  try {
    const response = await fetch('/api/event-config', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = await response.json() as IEventConfig;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export default function AddEventTypeCard() {
  const [form, setForm] = useState<IEventConfig>({
    name: '',
    fields: [
      { name: '', type: 'string' }
    ],
  });

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
              value={form.name}
              onChange={(event) => setForm(prev => ({ ...prev, name: event.target.value }))}
            /><br />
            {form.fields.map((item, idx) => (
              <EventValueField
                key={idx}
                value={item}
                onChange={(val: IEventConfigField) => {
                  form.fields[idx] = val;
                  setForm({ ...form });
                }}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              form.fields.push({ name: '', type: 'string' });
              setForm({ ...form });
            }}
          >Add New Field</Button>
        </CardContent>
        <CardActions>
          <Button onClick={() => save(form)}>Add Event</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
