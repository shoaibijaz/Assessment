import React, { ChangeEvent, useState, useEffect } from 'react';
import { Button, Form, Segment, Header, Image, Grid } from 'semantic-ui-react';
import Swal from 'sweetalert2'
import axios from 'axios';
import userStore from '../../app/stores/userStore';
import { useHistory } from 'react-router-dom';

export default function ActivityForm() {

    const initialState = {
        email: '',
        password: ''
    }

    const history = useHistory();
    const isLoggedIn = userStore.isLoggedIn();

    if (isLoggedIn) {
        history.push('/');
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        if (activity.email && activity.password) {
            login();
        }
        else {
            Swal.fire("Please provide email & password");
        }
    }

    function login() {

        Swal.showLoading();

        axios.post('http://localhost:64323/api/account/login', activity)
            .then(res => {
                userStore.saveToke(res.data);
                Swal.close();
                history.push('/');
            }).catch((error) => {

                Swal.close();
                Swal.fire(error.response.data);
            });

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/assets/logo.png' /> Log-in to your account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Email Address' value={activity.email} name='email' onChange={handleInputChange} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password' value={activity.password} name='password' onChange={handleInputChange}
                        />

                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>

            </Grid.Column>
        </Grid>


    )
}