import Box from "@mui/material/Box/Box";
import EventList from "./EventList";
import AddEventCard from "./AddEventCard";

export default function Home() {
  return (
    <Box component="section" p={3}>
      <AddEventCard />
      <EventList />
    </Box >
  );
}

