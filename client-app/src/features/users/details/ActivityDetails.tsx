import React from 'react';
import { Button, Card, Label } from 'semantic-ui-react';
import { User } from '../../../app/models/user';

interface Props {
    user: User;
    cancelSelectUser: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({ user, cancelSelectUser, openForm }: Props) {
    return (
        <Card fluid>

            <Card.Content>
                <Card.Header> {user.firstName}  {user.lastName} - {user.city}, {user.state}, {user.country}</Card.Header>
                <Card.Meta>
                {user.email}
                </Card.Meta>
                <Card.Description>
                    <Label basic content={user.studentStatus} />
                    <Label basic content={user.gender} />
                    <Label basic content={user.major} />
                    <Label basic content={'AGE: ' + user.age} />
                    <Label basic content={'SAT: ' + user.sat} />
                    <Label basic content={'GRADE: ' + user.grade} />
                    <Label basic content={'Height: ' + user.height} />
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(user.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectUser} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

