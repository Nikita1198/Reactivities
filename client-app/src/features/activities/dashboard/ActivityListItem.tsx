import { format } from "date-fns";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from '@mui/material/Typography';
import RoomIcon from '@mui/icons-material/Room';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import React from "react";
import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { Chip, Stack, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import './ActivityListItem.css';

interface Prop {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Prop) {
  return (
    <Card 
      sx={{
          maxWidth: 800,
          mt:1, 
          mb:4,
          ':hover': {
            boxShadow: 10,}
          }}>
      <Box sx={{
        width: "85%",
        position: 'absolute',
        marginTop: "10px",
        marginLeft: "10px"
      }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          alignItems="flex-start" 
          spacing={0}
          sx={{ flexWrap: 'wrap', gap: 1 }}>
              {activity.isHost && 
              <Chip color="warning" icon={<EmojiObjectsIcon />} label='My activity' /> 
              }
              <Chip color="info" icon={<AccessTimeIcon />} label={format(activity.date!, "h:mm aa")} />
              <Chip color="info" icon={<RoomIcon />} label={activity.venue} />
              {activity.isGoing && !activity.isHost && (
                <Chip className="glow-on-hover" color='success' icon={<DirectionsRunIcon />} label='Going' />
              )}
          </Stack>
      </Box>
      <CardMedia
        component="img"
        height="200"
        image={`/assets/categoryImages/${activity.category}.jpg`}
        alt={activity.category}/>
      <CardContent sx={{
        display: "flex",
        justifyContent: "flex-start"}}>
        <Stack direction='column' >
          <Tooltip title={ 
            <p>Created by{" "}
              <strong>
                <Link to={`/profiles/${activity.host?.username}`}>
                  {activity.host?.displayName}
                </Link>
              </strong>
            </p>} placement="bottom">
            <Typography variant="h6" >
                <Link to={`/activities/${activity.id}`}>
                  {activity.title}
                </Link>
            </Typography>
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            {activity.description}
          </Typography>
        </Stack>
        <Stack
          sx={{marginLeft: "auto", paddingLeft: "10px" }}
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            spacing={0}
          >
          <ActivityListItemAttendee 
            host={activity.host} 
            attendees={activity.attendees!} />
        </Stack>
      </CardContent>
    </Card>
  );
}
