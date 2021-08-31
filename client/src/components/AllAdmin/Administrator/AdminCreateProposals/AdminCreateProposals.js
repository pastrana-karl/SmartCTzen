import React, { useState } from 'react';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';
import Input from '../../../UI/Input/Input';

import classes from './AdminCreateProposals.module.css';

const AdminCreateProposals = ( props ) => {  
    const [inputProposalTitle, setInputProposalTitle] = useState();
    const [inputProposalDescription, setInputProposalDescription] = useState();
    const [inputProposalDate, setInputProposalDate] = useState();
    const [inputProposalLocation, setInputProposalLocation] = useState();
    const [inputProposalPhoto, serInputProposalPhoto] = useState();

    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminCreateProposalsHeader}>
                    <CardHeader>
                        <h2 className={classes.Text}>Proposals</h2>
                    </CardHeader>
                </div>
                <div className={classes.AdminCreateProposalsContentDiv}>
                    <form>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Proposal Title</label>
                            <Input 
                                type="text"
                                placeholder="Proposal Title"
                                id="title"
                                value={inputProposalTitle}
                                onChange={(event) => {
                                    setInputProposalTitle(event.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Description</label>
                            <Input 
                                type="text"
                                placeholder="Description"
                                id="description"
                                value={inputProposalDescription}
                                onChange={(event) => {
                                    setInputProposalDescription(event.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>When</label>
                            <Input 
                                type="text"
                                placeholder="When"
                                id="date"
                                value={inputProposalDate}
                                onChange={(event) => {
                                    setInputProposalDate(event.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Where</label>
                            <Input 
                                type="text"
                                placeholder="Where"
                                id="location"
                                value={inputProposalDate}
                                onChange={(event) => {
                                    setInputProposalDate(event.target.value);
                                }}
                            />
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminCreateProposals;