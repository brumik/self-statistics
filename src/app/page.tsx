'use client'

import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import AddEventCard from "./AddEventCard";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IEventHydrated } from "@/lib/models/Event";


export default function Home() {
  const [data, setData] = useState<IEventHydrated[]>([]);

  const getData = async () => {
    try {
      const response = await fetch('/api/event');
      const result = await response.json() as IEventHydrated[];
      result.forEach(val => val.createdAt = new Date(val.createdAt.toString()));
      setData(result);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, [])

  const handleDelete = async (event: IEventHydrated) => {
      try {
        await fetch('/api/event', {
          method: 'DELETE',
          body: JSON.stringify(event)
        });

        getData();
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <Box component="section" p={3}>
      <AddEventCard onSave={getData} />
      <List>
        {data.map((event) => (
          <div key={event._id.toString()}>
            <ListItem
              secondaryAction={
                <IconButton onClick={() => handleDelete(event)} edge="end">
                  <Delete />
                </IconButton>
              }
            >
              <ListItemButton dense>
                <ListItemText
                  primary={`${event.type.name}: ${Object.entries(event.values).join(', ')}`}
                  secondary={event.createdAt.toUTCString()}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box >
  );
}

