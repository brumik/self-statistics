'use client'

import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import EventValueField from "./EventValueField";
import { useState } from "react";
import { IEventConfig, IEventConfigField, IEventConfigHydrated } from "@/lib/models/EventConfig";

type IEventConfigForPost = Omit<IEventConfig, 'user'>;

const save = async (data: IEventConfigForPost) => {
  try {
    const response = await fetch('/api/event-configs', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    await response.json() as IEventConfigHydrated;
  } catch (error) {
    console.error(error);
  }
};

interface Props {
  onSave: VoidFunction;
}

export default function AddEventTypeCard({ onSave }: Props) {
  const [form, setForm] = useState<IEventConfigForPost>({
    name: '',
    fields: [{ name: '', type: 'string' }]
  });

  const handleSave = async () => {
    await save(form);
    onSave();
    setForm({
      name: '',
      fields: [{ name: '', type: 'string' }]
    });
  }

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box pb={2} component="form">
            <Typography variant="h5" component="h5" gutterBottom>Add new config</Typography>
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
            variant="text"
            onClick={() => {
              form.fields.push({ name: '', type: 'string' });
              setForm({ ...form });
            }}
          >Add New Field</Button>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSave}
          >Save</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
