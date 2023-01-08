import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../app/models/activity";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Avatar, Badge, ListItem, ListItemAvatar, Paper, styled, Typography } from "@mui/material";

interface Props {
  activity: Activity;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default observer(function ActivityDetailedSidebar({
  activity: { attendees, host },
}: Props) {
  const [open, setOpen] = React.useState(true);

  if (!attendees) return null;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Paper>
      <List
        sx={{ width: "100%" }}
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={
            <Typography>
              {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
            </Typography>
          } />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List  component="nav"
            aria-label="main mailbox folders">
          {attendees.map((attendee) => (
              <ListItemButton  key={attendee.username} component={Link} to={`/profiles/${attendee.username}`}>
                <ListItemAvatar>
                  {attendee.username === host?.username ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt={attendee.displayName} src={attendee.image || "/assets/user.png"} />
                  </StyledBadge>) : (
                  <Avatar alt={attendee.displayName} src={attendee.image || "/assets/user.png"} />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography 
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="h6"
                      color="text.primary">
                      {attendee.displayName}{attendee.username === host?.username && " /Host"}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        
                      </Typography>
                    </React.Fragment>
                  }
                />
            </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Paper>
    // <>
    //   <Segment
    //     textAlign="center"
    //     style={{ border: "none", minWidth: 300 }}
    //     attached="top"
    //     secondary
    //     inverted
    //     color="teal"
    //   >
    //     {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
    //   </Segment>
    //   <Segment attached>
    //     <List relaxed divided>
    //       {attendees.map((attendee) => (
    //         <Item style={{ position: "relative" }} key={attendee.username}>
    //           {attendee.username === host?.username && (
    //             <Label
    //               style={{ position: "absolute" }}
    //               color="orange"
    //               ribbon="right"
    //             >
    //               Host
    //             </Label>
    //           )}
    //           <Image size="tiny" src={attendee.image || "/assets/user.png"} />
    //           <Item.Content verticalAlign="middle">
    //             <Item.Header as="h3">
    //               <Link to={`/profile/${attendee.username}`}>
    //                 {attendee.displayName}
    //               </Link>
    //             </Item.Header>
    //             <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
    //           </Item.Content>
    //         </Item>
    //       ))}
    //     </List>
    //   </Segment>
    // </>
  );
});
