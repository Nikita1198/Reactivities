import { Avatar, AvatarGroup } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";
import Popover from '@mui/material/Popover';
import { Link } from "react-router-dom";

interface Props {
    attendees: Profile[];
    host: Profile | undefined;
}

export default observer(function ActivityListItemAttendee({attendees, host}: Props) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <AvatarGroup 
            max={2} 
            sx={{
                "& .MuiAvatar-root": { 
                    width:'2.2em', 
                    height: '2.2em', 
                    fontSize: 15,
                    border: '2px solid',}
            }}>
            {attendees.map(attendee => (
                <Link key={attendee.username} 
                        to={`/profiles/${attendee.username}`}>
                    <Avatar 
                        key={attendee.username}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        aria-owns={attendee.username}
                        aria-haspopup="true"
                        src={attendee.image || "/assets/user.png"} />
                    <Popover
                        id={attendee.username}
                        disableScrollLock
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transitionDuration={300}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <ProfileCard profile={attendee}/> 
                    </Popover>
                </Link>
            ))}
        </AvatarGroup>
    )
})