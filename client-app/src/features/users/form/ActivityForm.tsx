import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment, List, Divider } from 'semantic-ui-react';
import { User } from '../../../app/models/user';

interface Props {
    user: User | undefined;
    closeForm: () => void;
    createOrEdit: (user: User) => void;
    formErrors: any[];
}

export default function ActivityForm({ user: selectedActivity, closeForm, createOrEdit, formErrors }: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        firstName: '',
        lastName: '',
        studentStatus: '',
        city: '',
        state: '',
        gender: '',
        major: '',
        country: '',
        age: 0,
        sat: 0,
        grade: 0,
        height: 0,
        email: '',
        password: 'Pa$$w0rd',
        username: '',
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Group widths='equal'>
                    <Form.Input placeholder='First name' value={activity.firstName} name='firstName' onChange={handleInputChange} />
                    <Form.Input placeholder='Last name' value={activity.lastName} name='lastName' onChange={handleInputChange} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input placeholder='Student Status' value={activity.studentStatus} name='studentStatus' onChange={handleInputChange} />
                    <Form.Input placeholder='Major' value={activity.major} name='major' onChange={handleInputChange} />
                </Form.Group>
                <Form.Input placeholder='Country' value={activity.country} name='country' onChange={handleInputChange} />
                <Form.Group widths='equal'>
                    <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                    <Form.Input placeholder='State' value={activity.state} name='state' onChange={handleInputChange} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input placeholder='Gender' value={activity.gender} name='gender' onChange={handleInputChange} />
                    <Form.Input placeholder='Age' value={activity.age} name='age' onChange={handleInputChange} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input placeholder='SAT' value={activity.sat} name='sat' onChange={handleInputChange} />
                    <Form.Input placeholder='Grade' value={activity.grade} name='grade' onChange={handleInputChange} />
                </Form.Group>
                <Form.Input ty placeholder='Height' value={activity.height} name='height' onChange={handleInputChange} />

                <Form.Input placeholder='Email' value={activity.email} name='email' onChange={handleInputChange} />
                <Form.Input placeholder='Password' value={activity.password} type='password' name='password' onChange={handleInputChange} />
                <Form.Group widths='equal'>
                    <Button floated='right' positive type='submit' content='Submit' />
                    <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                </Form.Group>
                <Divider />



            </Form>

            <List>
                {formErrors.map(item => (
                    <List.Item key={item.id}>
                        {item.message}
                    </List.Item>
                ))}

            </List>

        </Segment>

    )
}