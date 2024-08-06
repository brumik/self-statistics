import Divider from "@mui/material/Divider/Divider";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { IconButton, ListItemButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { EventConfigurationDocument } from "../models/Event";

const configs: EventConfigurationDocument[] = [1, 2, 3, 4, 5].map(i => ({
  name: 'test' + i,
  fields: [
    { name: 'Value 1', type: 'text' },
    { name: 'Value 2', type: 'number' },
    { name: 'Value 1', type: 'boolean' },
  ],
}));

export default function EventTypeList() {
  return (
    <List>
      {configs.map(({ name, fields }) => (
        <>
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
        </>
      ))}
    </List>
  );
}
