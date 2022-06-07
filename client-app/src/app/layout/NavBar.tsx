import React from 'react';
import {
    Button,
    Container,
    Menu
} from 'semantic-ui-react';





interface Props {
    openForm: () => void;
    logout: () => void;
}



export default function NavBar({ openForm, logout }: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    Users
                </Menu.Item>
                <Menu.Item name='Users' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create User' />
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={logout} content='Logout' />
                </Menu.Item>
            </Container>
        </Menu>
    );
}
