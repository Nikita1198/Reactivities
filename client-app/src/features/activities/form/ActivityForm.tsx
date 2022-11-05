import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm() {
    const history = useHistory();
    const{activityStore} = useStore();
    const{createActivity, updateActivity, 
        loading, loadActivity, loadingInitial } = activityStore;
    const{id} = useParams<{id: string}>();

    const [activity, setActivity] = React.useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    React.useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);


    function handeleSubmit() {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    function handeleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if(loadingInitial) return <LoadingComponents content='Loading activity...'/>

    return (
        <Segment clearing>
            <Form onSubmit={handeleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handeleInputChange}/>
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handeleInputChange}/>
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handeleInputChange}/>
                <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handeleInputChange}/>
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handeleInputChange}/>
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handeleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cencel'/>
            </Form>
        </Segment>
    )
})