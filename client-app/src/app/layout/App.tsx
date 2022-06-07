import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { User } from '../models/user';
import NavBar from './NavBar';
import UserDaboard from '../../features/users/dashboard/UserDaboard';
import Swal from 'sweetalert2'
import userStore from '../stores/userStore';
import { useHistory } from 'react-router-dom';

function App() {

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formErrors, setFormErros] = useState<any[]>([]);

    const history = useHistory();

    axios.interceptors.request.use(config => {
        const token = userStore.getToken();
        if (token) config.headers!.Authorization = `Bearer ${token}`
        return config;
    });


    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        Swal.showLoading();

        axios.get('http://localhost:64323/api/account').then(response => {
            setUsers(response.data);
            Swal.close();
        }).catch((error) => {

            if (error.response.status == 401) {
                userStore.logout();
                history.push('/login');
            }
        });
    };

    function handleSelectUser(id: string) {
        setSelectedUser(users.find(x => x.id === id));
    }

    function handleCancelSelectUser() {
        setSelectedUser(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectUser(id) : handleCancelSelectUser();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditUser(user: User) {

        setSubmitting(true);

        if (user.id) {
            updateUser(user);
        } else {
            addNewUser(user);
        }
    }

    function addNewUser(user: User) {

        Swal.showLoading();

        axios.post('http://localhost:64323/api/account/register', user)
            .then(res => {
                setEditMode(false);
                setFormErros([]);
                getUsers();
                Swal.close();
                setTimeout(() => {
                    Swal.fire("User has been added");
                }, 1000);

            }).catch((error) => {

                let errorsList: any = [];
                let errors = error.response.data.errors;

                setFormErros([]);

                if (errors) {
                    for (let item in errors) {
                        errors[item].forEach((element: any) => {
                            errorsList.push({ id: new Date(), message: element });
                        });
                    }
                }

                if (errorsList.length > 0)
                    setFormErros(errorsList);

                Swal.close();
            });

    }

    function updateUser(user: User) {

        axios.put('http://localhost:64323/api/account/' + user.id, user)
            .then(res => {
                setEditMode(false);
                setFormErros([]);
                getUsers();
                Swal.close();
                setTimeout(() => {
                    Swal.fire("User has been updated");
                }, 1000);


            }).catch((error) => {
                let errorsList: any = [];
                let errors = error.response.data.errors;

                if (errors) {
                    for (let item in errors) {
                        errors[item].forEach((element: any) => {
                            errorsList.push({ id: new Date(), message: element });
                        });
                    }
                }

                if (errorsList.length > 0)
                    setFormErros(errorsList);
            });

    }

    function handleDeleteUser(id: string) {

        Swal.fire({
            title: 'Do you want to remove this user?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {

            if (result.isConfirmed) {
                deleteUser(id);
            }

        })
    }

    function deleteUser(id: string) {

        Swal.showLoading();

        axios.delete('http://localhost:64323/api/account/' + id)
            .then(res => {
                getUsers();
                Swal.close();
                setTimeout(() => {
                    Swal.fire("User has been deleted");
                }, 1000);

            }).catch((error) => {
                Swal.close();
            });

    }

    function logout() {
        userStore.logout();
        history.push('/login');
    }

    return (
        <Fragment>
            <NavBar openForm={handleFormOpen} logout={logout} />
            <Container style={{ marginTop: '7em' }}>
                <UserDaboard
                    users={users}
                    selectedUser={selectedUser}
                    selectUser={handleSelectUser}
                    cancelSelectUser={handleCancelSelectUser}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditUser}
                    deleteUser={handleDeleteUser}
                    formErrors={formErrors}
                />
            </Container>

        </Fragment>
    );
}

export default App;
