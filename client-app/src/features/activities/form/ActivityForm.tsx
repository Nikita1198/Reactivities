import React, { ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit}:Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = React.useState(initialState)

    function handeleSubmit() {
        createOrEdit(activity);
    }

    function handeleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handeleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handeleInputChange}/>
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handeleInputChange}/>
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handeleInputChange}/>
                <Form.Input placeholder="Date" value={activity.date} name="date" onChange={handeleInputChange}/>
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handeleInputChange}/>
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handeleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cencel'/>
            </Form>
        </Segment>
    )
}