import React, { useContext, useState } from 'react';
// import { useFormik } from 'formik';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import axios from 'axios';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Input from '../../../UI/Input/Input';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import { Context } from '../../../../context/Context';

import classes from './AdminCreateProposals.module.css';
import Swal from 'sweetalert2';

const AdminCreateProposals = () => {
    const { aUser } = useContext(Context);
    const { register, handleSubmit } = useForm();



    const onSubmit = async (data) => {
        const coverImage = '';

        const createProposal = {
            userName: data.userName,
            title: data.title,
            description: data.description,
            location: data.location,
            coverImage,
        };

        const formData = new FormData();
        const filename = Date.now() + data.coverImage[0].name;
        formData.append('name', filename);
        formData.append('file', data.coverImage[0]);
        formData.append("upload_preset", "dev_prac");
        formData.append("cloud_name", "karlstorage");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", formData);
            createProposal.coverImage = res.data.secure_url;
            // console.log(data);

            try {
                const res = await axios.post('/api/proposals/', createProposal);
                Swal.fire({
                    icon: 'success',
                    title: 'Updated',
                    text: 'Proposal submitted'
                });
            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            console.log (err);
        }

        // await axios.post('/api/proposals', formData);
        // console.log(data);
        // console.log('data-image' + data.coverImage[0]);
    }

    return (
        <AdminLayout>
            <div className={classes.AdminCreateProposalsHeader}>
                <CardHeader>
                    <h2 className={classes.Text}>Proposals</h2>
                </CardHeader>
            </div>
            <div className={classes.AdminCreateProposalsContentDiv}>
                <form className={classes.AdminCreateProposalForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.AdminCreateProposalFormDiv}>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Username</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='userName'
                                name='userName'
                                placeholder='Username'
                                defaultValue={aUser.data.user.username}
                                ref={register}
                                readOnly
                            />
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Proposal Title</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Proposal Title'
                                ref={register}
                            />
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Description</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='description'
                                name='description'
                                placeholder='Description'
                                ref={register}
                            />
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Location</label>
                            <input  
                                className={classes.Input}
                                type='text'
                                id='location'
                                name='location'
                                placeholder='Location'
                                ref={register}
                            />
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Image</label>
                            <input
                                type='file'
                                id='coverImage'
                                name='coverImage'
                                placeholder='Insert Image'
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className={classes.ButtonDiv}>
                        <SubmitButton />
                        <CancelButton />
                    </div>
                </form>
                <div className={classes.QuoteDiv}>
                    <p className={classes.Quote}></p>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminCreateProposals;

// const AdminCreateProposals = () => {
//     const { aUser } = useContext(Context);
//     const [ coverImage, setCoverImage ] = useState()

//     const validationSchema = Yup.object({
//         userName: Yup.string().required('Required!'),
//         title: Yup.string().required('Required!'),
//         description: Yup.string().required('Required!'),
//         location: Yup.string().required('Required!')
//     });

//     const formik = useFormik({
//         initialValues: {
//             userName: aUser.user.username,
//             title: '',
//             description: '',
//             location: '',
//             coverImage: ''
//         },
//         onSubmit: values => {

//             let data = new FormData();
//             data.append('coverImage', values.coverImage);

//             console.log('Form data', values);
//             console.log({
//                 fileName: values.file.name,
//             });
//         },
//         validationSchema
//     });

//     const messageCap = '“When we succeed, we succeed because of our individual initiative, but also because we do things together.” -Barack Obama';


//     return(
        // <AdminLayout>
        //     <div className={classes.AdminCreateProposalsHeader}>
        //         <CardHeader>
        //             <h2 className={classes.Text}>Proposals</h2>
        //         </CardHeader>
        //     </div>
        //     <div className={classes.AdminCreateProposalsContentDiv}>
        //         <form className={classes.AdminCreateProposalForm} onSubmit={formik.handleSubmit}>
        //             <div className={classes.AdminCreateProposalFormDiv}>
        //                 <div className={classes.AdminCreateProposalsFormInput}>
        //                     <label>Username</label>
        //                     <Input
        //                         type='text'
        //                         id='userName'
        //                         name='userName'
        //                         placeholder='Username'
        //                         onChange={formik.handleChange}
        //                         onBlur={formik.handleBlur}
        //                         value={aUser.user.username}
        //                     />
        //                     { formik.touched.userName && formik.errors.userName ? (
        //                         <div className={classes.InputValidation}>{formik.errors.userName}</div>
        //                         ) : null }
        //                 </div>
        //                 <div className={classes.AdminCreateProposalsFormInput}>
        //                     <label>Proposal Title</label>
        //                     <Input
        //                         type='text'
        //                         id='title'
        //                         name='title'
        //                         placeholder='Proposal Title'
        //                         onChange={formik.handleChange}
        //                         onBlur={formik.handleBlur}
        //                         value={formik.values.title}
        //                     />
        //                     { formik.touched.title && formik.errors.title ? (
        //                         <div className={classes.InputValidation}>{formik.errors.title}</div>
        //                         ) : null}
        //                 </div>
        //                 <div className={classes.AdminCreateProposalsFormInput}>
        //                     <label>Description</label>
        //                     <Input
        //                         type='text'
        //                         id='description'
        //                         name='description'
        //                         placeholder='Description'
        //                         onChange={formik.handleChange}
        //                         onBlur={formik.handleBlur}
        //                         value={formik.values.description}
        //                     />
        //                     { formik.touched.description && formik.errors.description ? (
        //                         <div className={classes.InputValidation}>{formik.errors.description}</div>
        //                         ) : null}
        //                 </div>
        //                 <div className={classes.AdminCreateProposalsFormInput}>
        //                     <label>Location</label>
        //                     <Input
        //                         type='text'
        //                         id='location'
        //                         name='location'
        //                         placeholder='Location'
        //                         onChange={formik.handleChange}
        //                         onBlur={formik.handleBlur}
        //                         value={formik.values.location}
        //                     />
        //                     { formik.touched.location && formik.errors.location ? (
        //                         <div className={classes.InputValidation}>{formik.errors.location}</div>
        //                         ) : null}
        //                 </div>
        //                 <div className={classes.AdminCreateProposalsFormInput}>
        //                     <label>Location</label>
        //                     <Input
        //                         type='file'
        //                         id='coverImage'
        //                         name='coverImage'
        //                         placeholder='Location'
        //                         onChange={(event) => {
        //                             setCoverImage('coverImage', event.currentTarget.files[0]);
        //                         }}
        //                         onBlur={formik.handleBlur}
        //                         value={formik.values.coverImage}
        //                     />
        //                     {/* { formik.touched.location && formik.errors.location ? (
        //                         <div className={classes.InputValidation}>{formik.errors.location}</div>
        //                         ) : null} */}
        //                 </div>
        //             </div>
        //             <div className={classes.ButtonDiv}>
        //                 <SubmitButton />
        //                 <CancelButton />
        //             </div>
        //         </form>
        //         <div className={classes.QuoteDiv}>
        //             <p className={classes.Quote}>{messageCap}</p>
        //         </div>
        //     </div>
        //  </AdminLayout>
//     );
// }

// export default AdminCreateProposals;

// const AdminCreateProposals = () => {
//     const { aUser } = useContext(Context);
//     // const [userName, setUserName] = useState('');
//     // const [title, setTitle] = useState('');
//     // const [description, setDescription] = useState('');
//     // const [location, setLocation] = useState('');
//     // const [message, setMessage] = useState('');
//     // const [coverImage, setCoverImage] = useState(null);

//     // const onChangeFile = e => {
//     //     setCoverImage(e.target.files[0]);
//     // }

//     // const changeOnClick = (e) => {
//     //     e.preventDefault();

//     //     const formData = new FormData();
//     //     formData.append('userName', userName);
//     //     formData.append('title', title);
//     //     formData.append('description', description);
//     //     formData.append('location', location);
//     //     formData.append('coverImage', coverImage);

//     //     setUserName('');
//     //     setTitle('');
//     //     setDescription('');
//     //     setLocation('');
        
//     //     console.log(formData);
//     // }

//     const validationSchema = Yup.object({
//         userName: Yup.string().required('Required!'),
//         title: Yup.string().required('Required!'),
//         description: Yup.string().required('Required!'),
//         location: Yup.string().required('Required!')
//     });

//     const formik = useFormik({
//         initialValues: {
//             userName: aUser.user.username,
//             title: '',
//             description: '',
//             location: '',
//             coverImage: '',
//         },
//         onSubmit: values => {
//             //const formData = new FormData();
//             //formData.append('coverImage', coverImage);
//             axios.post('/api/proposals', values);
//             console.log(values);
//             //console.log(formData)
//             //const formData = await new FormData();

//             // formData.append('userName', values.userName);
//             // formData.append('title', title);
//             // formData.append('description', description);
//             // formData.append('location', location);

//             // setUserName('');
//             // setTitle('');
//             // setDescription('');
//             // setLocation('');

//             // axios.post('/api/proposals', formData)
//             //     .then((res) => setMessage(res.data))
//             //     .catch((err) => {
//             //         console.log(err);
//             // });
//             // console.log(userName);
//         },
//         validationSchema
//     });

//     const messageCap = '“When we succeed, we succeed because of our individual initiative, but also because we do things together.” -Barack Obama';

//     //console.log(aUser.user.username);
//     //console.log('Form values', formik.values); 

//     return(
//         <AdminLayout>
//             <div className={classes.AdminCreateProposalsHeader}>
//                 <CardHeader>
//                     <h2 className={classes.Text}>Proposals</h2>
//                 </CardHeader>
//             </div>
//             <div className={classes.AdminCreateProposalsContentDiv}>
//                 <form className={classes.AdminCreateProposalForm} onSubmit={formik.onSubmit}>
//                     <div className={classes.AdminCreateProposalFormDiv}>
//                         <div className={classes.AdminCreateProposalsFormInput}>
//                             <label>Username</label>
//                             <Input
//                                 className={classes.Input}
//                                 type='text'
//                                 id='userName'
//                                 name='userName'
//                                 placeholder='Username'
//                                 //onChange={(e) => setUserName(e.target.value)}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={aUser.user.username}
//                             />
//                             { formik.touched.userName && formik.errors.userName ? (
//                                 <div className={classes.InputValidation}>{formik.errors.userName}</div>
//                                 ) : null }
//                         </div>
//                         <div className={classes.AdminCreateProposalsFormInput}>
//                             <label>Proposal Title</label>
//                             <Input
//                                 type='text'
//                                 id='title'
//                                 name='title'
//                                 placeholder='Proposal Title'
//                                 //onChange={(e) => setTitle(e.target.value)}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.title}
//                             />
//                             {/* { formik.touched.title && formik.errors.title ? (
//                                 <div className={classes.InputValidation}>{formik.errors.title}</div>
//                                 ) : null} */}
//                         </div>
//                         <div className={classes.AdminCreateProposalsFormInput}>
//                             <label>Description</label>
//                             <Input
//                                 type='text'
//                                 id='description'
//                                 name='description'
//                                 placeholder='Description'
//                                 // onChange={(e) => setDescription(e.target.value)}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.description}
//                             />
//                             {/* { formik.touched.description && formik.errors.description ? (
//                                 <div className={classes.InputValidation}>{formik.errors.description}</div>
//                                 ) : null} */}
//                         </div>
//                         <div className={classes.AdminCreateProposalsFormInput}>
//                             <label>Location</label>
//                             <Input
//                                 type='text'
//                                 id='location'
//                                 name='location'
//                                 placeholder='Location'
//                                 // onChange={(e) => setLocation(e.target.value)}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.location}
//                             />
//                             {/* { formik.touched.location && formik.errors.location ? (
//                                 <div className={classes.InputValidation}>{formik.errors.location}</div>
//                                 ) : null} */}
//                         </div>
//                         {/* <div className={classes.AdminCreateProposalsFormInput}>
//                             <label>Proposal Image</label>
//                             <Input
//                                 type='file'
//                                 id='coverImage'
//                                 name='coverImage'
//                                 placeholder='Insert Photo'
//                                 onChange={onChangeFile}
//                                 // onChange={e => {
//                                 //     formik.handleChange;
//                                 //     setFilename('coverImage', e.target.files[0]);
//                                 // }}
//                                 // value={formik.values.coverImage}
//                             />
//                             { formik.touched.coverImage && formik.errors.coverImage ? (
//                                 <div className={classes.InputValidation}>{formik.errors.coverImage}</div>
//                                 ) : null}
//                         </div> */}
//                     </div>
//                     <div className={classes.ButtonDiv}>
//                         <SubmitButton />
//                         <CancelButton />
//                     </div>
//                 </form>
//                 <div className={classes.QuoteDiv}>
//                     <p className={classes.Quote}>{messageCap}</p>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }

// export default AdminCreateProposals;
