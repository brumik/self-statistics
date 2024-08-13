'use client'

import List from "@mui/material/List/List";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IEventConfig } from "@/lib/models/EventConfig";
import { HydratedDocument } from "mongoose";
import { Delete, Edit } from "@mui/icons-material";
import AddEventTypeCard from "./AddEventTypeCard";

export default function EditEventTypesScreen() {
  const [data, setData] = useState<HydratedDocument<IEventConfig>[]>([]);

  const getData = async () => {
    try {
      const response = await fetch('/api/event-config');
      const result = await response.json() as HydratedDocument<IEventConfig>[];
      setData(result);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, [])

  const handleDelete = async (event: HydratedDocument<IEventConfig>) => {
    try {
      await fetch('/api/event-config', {
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
      <Grid spacing={2} container>
        <Grid item xs={12} md={4}>
          <AddEventTypeCard onSave={getData} />
        </Grid>
        {data.map((event) => (
          <Grid key={event._id.toString()} item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  {event.name}
                </Typography>
                <List>
                  {event.fields.map((e, idx) => (
                    <ListItemText key={e.name + idx} primary={`${e.name}: ${e.type}`} />
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <ButtonGroup variant="outlined">
                  {false && (
                    <Button endIcon={<Edit />}>
                      Edit
                    </Button>
                  )}
                  <Button
                    endIcon={<Delete />}
                    color="error"
                    onClick={() => handleDelete(event)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

