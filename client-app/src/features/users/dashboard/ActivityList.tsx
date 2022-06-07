import React from 'react';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { User } from '../../../app/models/user';

interface Props {
    users: User[];
    selectUser: (id: string) => void;
    deleteUser: (id: string) => void;
}

export default function ActivityList({ users, selectUser, deleteUser }: Props) {
    return (
        <Segment>
            <Item.Group divided>

                {users.map(activity => (
                    <Item key={activity.id}>

                        <Item.Content>
                            <Item.Header as='a'>
                                {activity.firstName}  {activity.lastName} - {activity.city}, {activity.state}, {activity.country}
                            </Item.Header>
                            <Item.Meta>
                                <Label basic content={activity.studentStatus} />
                                <Label basic content={activity.gender} />
                                <Label basic content={activity.major} />
                                <Label basic content={'AGE: ' + activity.age} />
                                <Label basic content={'SAT: ' + activity.sat} />
                                <Label basic content={'GRADE: ' + activity.grade} />
                                <Label basic content={'Height: ' + activity.height} />
                            </Item.Meta>
                          
                            <Item.Extra>
                                <Button onClick={() => selectUser(activity.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteUser(activity.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={activity.email} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}