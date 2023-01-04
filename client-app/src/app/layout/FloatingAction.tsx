import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import { useHistory } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import React from 'react';

const actions = [{ icon:  <SportsBarIcon/> , name: 'Create Activity', path: '/createActivity'}];

export default observer(function FloatingAction() {
    const history = useHistory();
    const{activityStore, commonStore, profileStore} = useStore();
    const{loadingInitial} = activityStore;
    const{appLoaded} = commonStore;
    const{loadingProfile} = profileStore;

    function handleRederect(path: string) {
        history.push(path);
    }

    return (<>
    {!loadingInitial && 
    !loadingProfile &&
    appLoaded &&
        <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon/>}
        >
        {actions.map((action) => (
            <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleRederect(action.path)}
            />
        ))}
        </SpeedDial>}
        </>)
})