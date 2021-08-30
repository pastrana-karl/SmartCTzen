import React, { useState } from 'react';

import SuperAdminLayout from '../SuperAdminLayout';
import SuperAdminContentNavBar from './SuperAdminContentNavBar/SuperAdminContentNavBar';
import SuperAdminContentNavItems from './SuperAdminContentNavItems/SuperAdminContentNavItems';
import Input from '../../../UI/Input/Input';

import classes from './SuperAdminContent.module.css'
import SuperAdminContainer from '../../../UI/SuperAdminContainer/SuperAdminContainer';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

const SuperAdminContent = ( props ) => {

    const [inputHeader, setInputHeader] = useState();
    const [inputPartnerCommunities, setInputPartnerCommunities] = useState();
    const [inputUsers, setInputUsers] = useState();
    const [inputMembers, setInputMembers] = useState();
    const [inputMessage, setInputMessages] = useState();

    return (
        <React.Fragment>
            <SuperAdminLayout>
                <SuperAdminContentNavBar>
                    <SuperAdminContentNavItems />
                </SuperAdminContentNavBar>
                <SuperAdminContainer>
                    <form className={classes.SuperAdminForm}>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Header</label>
                            <Input 
                                type="text"
                                placeholder="Header"
                                id="header"
                                value={inputHeader}
                                onChange={(event) => {
                                    setInputHeader(event.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Parter Communities</label>
                            <Input 
                                type="number"
                                placeholder="Partner communities"
                                id="partner-communities"
                                value={inputPartnerCommunities}
                                onChange={(event) => {
                                    setInputPartnerCommunities(event.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Users</label>
                            <Input 
                                type="number"
                                placeholder="Users"
                                id="users"
                                value={inputUsers}
                                onChange={(event) => {
                                    setInputUsers(event.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Members</label>
                            <Input 
                                type="number"
                                placeholder="Members"
                                id="members"
                                value={inputMembers}
                                onChange={(event) => {
                                    setInputMembers(event.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Message</label>
                            <textarea
                                className={classes.SuperAdminTextArea}
                                placeholder="Input CEO Message"
                                id="Enter CEO message"
                                value={inputMessage}
                                onChange={(event) => {
                                    setInputMessages(event.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.SuperAdminButtonDiv}>
                            <SubmitButton />
                            <CancelButton />
                        </div>
                    </form>
                </SuperAdminContainer>
            </SuperAdminLayout>
        </React.Fragment>
    );
};

export default SuperAdminContent;