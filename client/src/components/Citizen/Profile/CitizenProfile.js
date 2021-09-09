import React from 'react';
import "./CitizenProfileLayout.css";

// export default function CitizenProfile() {
//     return (
//         <div className="profile">
//             <img src="https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg" alt="DP" className="profilePic" />
//             <br/><div className="profileName">Ivann Calandria</div><br/>
//             <table>
//                 <tr>
//                     <td>
//                         <div className="profileBadgeCard">
//                             <h3>Badge</h3>
//                         </div>
//                     </td>
//                     <td>
//                         {/* <div class="row">
//                             <div class="column">
//                                 <div class="card">
//                                     <h3>Proposals Created</h3>
//                                     <p>#</p>
//                                 </div>
//                             </div>

//                             <div class="column">
//                                 <div class="card">
//                                     <h3>Approved Proposals</h3>
//                                     <p>#</p>
//                                 </div>
//                             </div>
//                             <div class="column">
//                                 <div class="card">
//                                     <h3>Voted Proposals</h3>
//                                     <p>#</p>
//                                 </div>
//                             </div>
//                             <div class="column">
//                                 <div class="card">
//                                     <h3>Verified Reports</h3>
//                                     <p>#</p>
//                                 </div>
//                             </div>
//                         </div> */}
//                         <table>
//                             <tr>
//                                 <td>
//                                     <h3>Proposals Created</h3>
//                                     <p></p>
//                                 </td>
//                                 <td>
//                                     <h3>Proposals Approved</h3>
//                                     <p></p>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     <h3>Verified Reports</h3>
//                                     <p></p>
//                                 </td>
//                                 <td>
//                                     <h3>Voted Proposals</h3>
//                                     <p></p>
//                                 </td>
//                             </tr>
//                         </table>

//                     </td>
//                 </tr>
//             </table>
//             <div className="profileInfo">
//                 <h3>Personal Information</h3>
//                 <label>Last Name</label>
//                 <div className="profileDesc"> Calandria</div>
//                 <label>First Name</label>
//                 <div className="profileDesc"> Ivann Benedict</div>
//                 <label>Middle Name</label>
//                 <div className="profileDesc"> Villanueva</div>
//                 <label>Suffix (if available)</label>
//                 <div className="profileDesc">n/a</div>
//                 <label>Birthdate</label>
//                 <div className="profileDesc">July 27, 1999</div>
//                 <label>Sex</label>
//                 <div className="profileDesc">Male</div>
//                 <label>Address</label>
//                 <div className="profileDesc">Antipolo City</div>
//             </div>
//             <div className="profileCred">
//                 <h3>Login Credentials</h3>
//                 <label>Email Address</label>
//                 <div className="profileDesc">icalandria@yahoo.com</div>
//                 <label>Password</label>
//                 <div className="profileDesc">********</div><i className="editIcon far fa-edit"></i>
                
//             </div>
//         </div>
       
       
//     )
// }

const CitizenProfile = () => (
        <div className="profile">
             <img src="https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg" alt="DP" className="profilePic" />
             <br/><div className="profileName">Ivann Calandria</div><br/>
             <table>
                 <tr>
                     <td>
                         <div className="profileBadgeCard">
                             <h3>Badge</h3>
                         </div>
                     </td>
                     <td>
                         <table>
                             <tr>
                                 <td>
                                     <h3>Proposals Created</h3>
                                     <p></p>
                                 </td>
                                 <td>
                                     <h3>Proposals Approved</h3>
                                     <p></p>
                                 </td>
                             </tr>
                             <tr>
                                 <td>
                                     <h3>Verified Reports</h3>
                                     <p></p>
                                 </td>
                                 <td>
                                     <h3>Voted Proposals</h3>
                                     <p></p>
                                 </td>
                             </tr>
                         </table>

                     </td>
                 </tr>
             </table>
             <div className="profileInfo">
                 <h3>Personal Information</h3>
                 <label>Last Name</label>
                 <div className="profileDesc"> Calandria</div>
                 <label>First Name</label>
                 <div className="profileDesc"> Ivann Benedict</div>
                 <label>Middle Name</label>
                 <div className="profileDesc"> Villanueva</div>
                 <label>Suffix (if available)</label>
                 <div className="profileDesc">n/a</div>
                 <label>Birthdate</label>
                 <div className="profileDesc">July 27, 1999</div>
                 <label>Sex</label>
                 <div className="profileDesc">Male</div>
                 <label>Address</label>
                 <div className="profileDesc">Antipolo City</div>
             </div>
             <div className="profileCred">
                 <h3>Login Credentials</h3>
                 <label>Email Address</label>
                 <div className="profileDesc">icalandria@yahoo.com</div>
                 <label>Password</label>
                 <div className="profileDesc">********</div><i className="editIcon far fa-edit"></i>
                
             </div>
         </div>
    );


export default CitizenProfile;