'use client'

import Divider from "@mui/material/Divider/Divider";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { IconButton, ListItemButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { IEventConfig } from "@/lib/models/EventConfig";

export default function EventTypeList() {
  const [data, setData] = useState<IEventConfig[]>([]);

  const getData = async () => {
    try {
      const response = await fetch('/api/event-config');
      const result = await response.json() as IEventConfig[];
      setData(result);
    } catch (error) {
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <List>
      {data.map(({ name, fields }) => (
        <div key={name}>
          <ListItem
            secondaryAction={
              <IconButton edge="end">
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemButton dense>
              <ListItemText
                primary={`${name}: ${fields.map(e => e.name).join(', ')}`}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}
