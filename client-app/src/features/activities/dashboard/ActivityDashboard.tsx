import { useMediaQuery } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { ActivityFilters } from './ActivityFilters';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {

    const{activityStore} = useStore();
    const{loadingInitial, loadActivities, activityRegistry} = activityStore;

    // Some style Improvements
    const matches = useMediaQuery('(min-width:768px)');

    React.useEffect(() => {
        if(activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities]);

    if (loadingInitial) return <LoadingComponents content="Loading activities..." />

    return (
        <Grid >
            <Grid.Column style={{pt: 0}} width={matches ? "11" : '16'}>
                <ActivityList />
            </Grid.Column>
            {matches && <Grid.Column style={{paddingTop: 0}} width="5">
                <ActivityFilters/>
            </Grid.Column>}
        </Grid>
    )
})
