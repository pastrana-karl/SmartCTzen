import React from 'react';

import AdminLayout from '../AdminLayout/AdminLayout';
import AdminProfileButton from '../../../UI/Buttons/AdminProfileButton/AdminProfileButton';
import ProfileIconCard from '../../../UI/Cards/ProfileIconCard/ProfileIconCard';
import ProfileInput from '../../../UI/Input/ProfileInput/ProfileInput';

import classes from './AdminProfile.module.css';

const AdminProfile = () => {
    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.Content}>
                    <div className={classes.AdminProfile}>
                        <ProfileIconCard />
                        <h2>Summary</h2>
                        <div className={classes.ButtonDiv}>
                            <AdminProfileButton>Reports</AdminProfileButton>
                            <AdminProfileButton>Proposals</AdminProfileButton>
                        </div>
                    </div>
                    <div>
                        <h2>Personal Information</h2>
                        <div>
                            <form className={classes.AdminProfileForm}>
                                <div className={classes.FormDiv}>
                                    <label>City/Municipality</label>
                                    <ProfileInput
                                        placeholder="City/Municipality"
                                        type="text"
                                        id="city-municipality"
                                    />
                                </div>
                                <div className={classes.FormDiv}>
                                    <label>Region</label>
                                    <ProfileInput
                                        placeholder="Region"
                                        type="text"
                                        id="region"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* LOGIN CREDENTIALS */}

                        <h2>Login Credentials</h2>
                        <div>
                            <form className={classes.AdminProfileForm}>
                                <div className={classes.FormDiv}>
                                    <label>Email Address</label>
                                    <ProfileInput
                                        placeholder="Email address"
                                        type="email"
                                        id="email"
                                    />
                                </div>
                                <div className={classes.FormDiv}>
                                    <label>Password</label>
                                    <ProfileInput
                                        placeholder="Password"
                                        type="password"
                                        id="password"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
}

export default AdminProfile;