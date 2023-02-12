import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetails() {
    const{activityStore} = useStore();
    const{selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity} = activityStore;
    const{id} = useParams<{id: string}>();

    React.useEffect(() => {
        if(id) loadActivity(id);
        return () => clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity]);

    if(loadingInitial || !activity) return <LoadingComponents />;

    return (
        <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 2, md: 3 }}
            >
            <Stack spacing={1}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat activityId={activity.id}/>
            </Stack>
            <Stack spacing={1} sx={{minWidth: 200}}>
                <ActivityDetailedSidebar activity={activity}/>
            </Stack>
        </Stack>
    )
})