"use client"

import { IEvent, IEventHydrated } from "@/lib/models/Event";
import { IEventConfig, IEventConfigField } from "@/lib/models/EventConfig";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { HydratedDocument } from "mongoose";
import { useEffect, useState } from "react";

interface Props {
  onSave: VoidFunction;
}

interface IEventString extends Omit<IEvent, 'type' | 'user'> {
  type: string
}

const save = async (data: Omit<IEvent, 'user'>) => {
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    await response.json() as IEventHydrated;
  } catch (error) {
    console.error(error);
  }
}

const convertToType = (value: string, type: IEventConfigField['type']): string | number | boolean => {
  switch(type) {
    case 'string': return value;
    case 'number': return +value;
    case 'boolean': return !!value;
    default: return value;
  }
}

export default function AddEventCard({ onSave }: Props) {
  const [form, setForm] = useState<IEventString>({
    type: '',
    values: {},
    createdAt: new Date()
  });
  const [config, setConfig] = useState<Record<string, HydratedDocument<IEventConfig>>>({});

  const getConfig = async () => {
    try {
      const response = await fetch('/api/event-configs');
      const result = await response.json() as HydratedDocument<IEventConfig>[];
      const mapped = Object.assign({},
        ...result.map(({ _id, ...rest }) => ({
          [_id.toString()]: { ...rest, _id }
        })
        )
      );

      setConfig(mapped);
    } catch (error) {
      console.error(error);
      setConfig({});
    }
    // After fetch always reset the selected one
    setForm({ type: '', values: {}, createdAt: new Date() });
  };

  useEffect(() => {
    getConfig();
  }, []);

  const handleSave = async () => {
    await save({
      ...form,
      type: config[form.type]._id
    });
    onSave();
    setForm({ type: '', values: {}, createdAt: new Date() });
  }

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h5">Log a new event</Typography>
          <Box pt={3} component="form">
            <FormControl fullWidth>
              <InputLabel id="select-type-label">Event Type</InputLabel>
              <Select
                value={form.type}
                onChange={(e) => setForm({
                  type: e.target.value,
                  values: Object.assign({},
                    ...config[e.target.value as string].fields.map(({ name }) => ({ [name]: '' }))
                  ),
                  createdAt: new Date()
                })}
                label="Event Type"
                labelId="select-type-label"
              >
                {Object.entries(config).map(([key, value]) => (
                  <MenuItem value={key} key={key}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box pt={3}>
              <Typography variant="h6" component="h6" gutterBottom>Event details</Typography>
              {form.type && config[form.type].fields.map(({ name, type }) => (
                <TextField
                  margin="dense"
                  id={name}
                  key={name}
                  label={name}
                  type={type}
                  value={form.values[name]}
                  onChange={(e) => setForm(prev => {
                    let values = prev.values;
                    values[name] = convertToType(e.target.value, type);
                    return { ...prev, values };
                  })}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSave}
          >Add Event</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
