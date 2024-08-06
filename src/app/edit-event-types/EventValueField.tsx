import { Autocomplete, Stack, TextField } from "@mui/material";

const typeOptions = [
  { label: "Number", id: "number" },
  { label: "Text", id: "text" },
  { label: "Boolean", id: "boolean" },
];

export default function EventValueField({ id }: { id: number }) {
  return (
    <Stack direction="row" spacing={1}>
      <TextField
        margin="dense"
        id={`value[]=${id}`}
        label="Value Name"
        type="text"
      />
      <Autocomplete
        disablePortal
        id={`valueType[]=${id}`}
        sx={{ flexGrow: 1 }}
        options={typeOptions}
        renderInput={(params) => <TextField {...params} label="Event Type" />}
      />
    </Stack>
  );
}
