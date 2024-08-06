import Box from "@mui/material/Box/Box";
import AddEventTypeCard from "./AddEventTypeCard";
import ListEventTypes from "./ListEventTypes";

export default function EditEventTypesScreen() {
  return (
    <Box component="section" p={3}>
      <AddEventTypeCard />
      <ListEventTypes />
    </Box >
  );
}

