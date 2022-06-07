import React from "react";
import { Grid } from "semantic-ui-react";
import { User } from "../../../app/models/user";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    users: User[],
    selectedUser: User | undefined;
    selectUser: (id: string) => void;
    cancelSelectUser: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: User) => void;
    deleteUser: (id: string) => void;
    formErrors:any[]
}

export default function ActivityDashboard({ users, selectedUser,
    selectUser, cancelSelectUser, editMode, openForm, closeForm, createOrEdit, deleteUser, formErrors }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList users={users}
                    selectUser={selectUser}
                    deleteUser={deleteUser}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedUser && !editMode &&
                    <ActivityDetails
                        user={selectedUser}
                        cancelSelectUser={cancelSelectUser}
                        openForm={openForm} />
                }
                {editMode &&
                    <ActivityForm closeForm={closeForm} user={selectedUser} createOrEdit={createOrEdit} formErrors={formErrors} />}

            </Grid.Column>
        </Grid>
    )
}