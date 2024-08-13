import { IEventConfigField } from "@/lib/models/EventConfig";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

interface Props {
  value: IEventConfigField
  onChange: (val: IEventConfigField) => void;
}

export default function EventValueField({ value, onChange }: Props) {
  return (
    <Stack direction="column" spacing={1}>
      <TextField
        margin="dense"
        label="Value Name"
        type="text"
        value={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
      />
      <FormControl>
        <InputLabel id="select-type-label">EventType</InputLabel>
        <Select
          value={value.type}
          onChange={(e) => onChange({ ...value, type: e.target.value as IEventConfigField['type'] })}
          label="EventType"
          labelId="select-type-label"
        >
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="string">Text</MenuItem>
          <MenuItem value="boolean">Boolean</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
