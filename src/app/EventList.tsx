import Divider from "@mui/material/Divider/Divider";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Typography from "@mui/material/Typography/Typography";
import { EventDocument } from "./models/Event";
import { IconButton, ListItemButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const elements: EventDocument[] = [1, 2, 3, 4, 5].map(i => ({
  type: 'test',
  values: [i, i * 2],
  createdAt: new Date(),
}));

export default function EventList() {
  return (
    <List 
      // subheader={<Typography variant="h3" component="h3">Events</Typography>}
    >
      {elements.map(({ type, values, createdAt }) => (
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
                primary={`${type}: ${values?.join(', ')}`}
                secondary={createdAt.toLocaleString()}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
}
