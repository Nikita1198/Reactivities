import React from "react";
import { format } from "date-fns";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from '@mui/material/Typography';
import RoomIcon from '@mui/icons-material/Room';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { Chip, Stack, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { atcb_action } from 'add-to-calendar-button';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import 'add-to-calendar-button/assets/css/atcb.css';
import './ActivityListItem.css';
import 'animate.css';


interface Prop {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Prop) {

  return (
    <div className='bg-image hover-overlay hover-zoom'>
      <Card 
        sx={{
            maxWidth: 800,
            mt:2, 
            mb:2,
            }}>
        <Box 
        sx={{
          width: "78%",
          position: 'absolute',
          zIndex: 10,
          marginTop: "10px",
          marginLeft: "10px"
        }}>
          <Stack 
            direction={{ xs: 'row' }} 
            spacing={0}
            sx={{ flexWrap: 'wrap', gap: 1 }}>
                {activity.isCancelled && 
                <Chip color='error'icon={<CancelTwoToneIcon />} label='Canceled!'/>}
                <Chip 
                  color={(activity.isGoing || activity.isCancelled) ? "secondary" : 'primary'} 
                  icon={<AccessTimeIcon />} 
                  disabled={activity.isCancelled}
                  label={format(activity.date!, "h:mm aa")} 
                  onClick={e => {
                    e.preventDefault();
                    atcb_action({
                      name: activity.title,
                      startDate: format(activity.date!, "yyyy-mm-dd"),
                      startTime: format(activity.date!, "HH:MM"),
                      endDate: format(activity.date!, "yyyy-mm-dd"),
                      endTime: format(activity.date!, "HH:MM"),
                      location: activity.venue,
                      description: activity.description,
                      options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
                      timeZone: "Europe/Moscow",
                      iCalFileName: "Reminder-Event",
                    });
                  }}/>
                <Chip 
                  disabled={activity.isCancelled}
                  color={(activity.isGoing || activity.isCancelled) ? "warning" : 'primary'}
                  icon={<RoomIcon />} 
                  label={activity.venue} 
                  sx={{textOverflow: "ellipsis", maxWidth: 130}} />
                {(activity.isGoing && !activity.isCancelled) && (
                  <Chip color='secondary' variant="outlined" className='glow-on-hover' icon={<DirectionsRunIcon />} label='Going'/>
                )}
            </Stack>
        </Box>
        <Box sx={{height: 53}} className='card-top-label'>
          <Link to={`/activities/${activity.id}`}>
            <CardMedia
              sx={{display: (activity.isGoing && !activity.isCancelled) ? '' : "none"}}
              component="img"
              height="300"
              image={`/assets/categoryImages/${activity.category}.jpg`}
              alt={activity.category}/>
          </Link>
        </Box>
        <CardContent sx={{
          minHeight: 90,
          display: "flex",
          justifyContent: "flex-start",
          "&:last-child": {
            paddingBottom: 2,
            paddingTop: 1.65,
            paddingRight: '10px',
            paddingLeft: '10px',
          }}}>
          <Stack direction='column' spacing='5'>
            {(!activity.isGoing || activity.isCancelled) && 
            <>
              <Tooltip title="Check out the new activity!" followCursor>
                <Typography variant="h6" className="card-label">
                    <Link to={`/activities/${activity.id}`}>
                      {activity.title}
                    </Link>
                </Typography>
              </Tooltip>
              <Typography variant="body2" color="text.secondary">
                {activity.description}
              </Typography>
            </>}
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
    </div>
  );
}
