import { IEventConfigField } from "@/lib/models/EventConfig";
import { Autocomplete, Stack, TextField } from "@mui/material";

const typeOptions = [
  { label: "Number", id: "number" },
  { label: "String", id: "string" },
  { label: "Boolean", id: "boolean" },
];

interface Props {
  value: IEventConfigField
  onChange: (val: IEventConfigField) => void;
}

export default function EventValueField({ value, onChange }: Props) {
  return (
    <Stack direction="row" spacing={1}>
      <TextField
        margin="dense"
        label="Value Name"
        type="text"
        value={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
      />
      <Autocomplete
        disablePortal
        sx={{ flexGrow: 1 }}
        options={typeOptions}
        value={typeOptions.find(({ id }) => id === value.type)}
        onChange={(_, val) => onChange({ ...value, type: val?.id as IEventConfigField['type'] })}
        renderInput={(params) => <TextField
          {...params}
          label="Event Type"
        />}
      />
    </Stack>
  );
}
