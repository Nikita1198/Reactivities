import { Box, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
    const{activityStore} = useStore();
    const{groupedActivities} = activityStore;

    return (
        <>
            {groupedActivities.map(([group, activities]) =>(
                <Box key={group} sx={{padding:0, pb: 1}}>
                    <Divider textAlign="left">
                        <Typography variant="body1" >
                            {group}
                        </Typography>
                    </Divider>
                    {activities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity}/>  
                    ))}
                </Box>
            ))}
        </>
    )
})