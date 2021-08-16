import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { auth } from '../../firebase';
import './Register.css';
import { Link } from 'react-router-dom';

function Register(props) {

    const email = props.location.state.userdata.email;
    const password = props.location.state.userdata.password;

    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const dispatch = useDispatch();

    const register = () => {
        if (!name) {
            return alert("Please enter a full name");
        };
    
        console.log(email, password);
        auth.createUserWithEmailAndPassword(email, password)
            .then(userAuth => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic,
            })
            .then(() => {
                dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
                }))
            })
            }).catch(error => alert(error));
        };

    return (
        <div className="login">
            <img src="../images/login-logo.svg"
            alt="linkedin logo" width="140"
            />
            <h1>Make the most of your professional life</h1>
            <form>
            <label >
                Full name (required if registering)
                </label>
                <input
                    type="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder=""
                />
                <label >
                    Profile picture URL (optional)
                </label>
                <input
                    type="text"
                    value={profilePic}
                    onChange={e => setProfilePic(e.target.value)}
                    placeholder=""
                />
                <Link to={{pathname:"/"}}>
                <button className="link_button" type="submit" onClick={register}>Continue</button></Link>
            </form>
            <p>Looking to create a page for a business? <a href="https://www.linkedin.com/help/linkedin/answer/122238?trk=registration-frontend_join-form-page-help-link" rel="noreferrer" target="_blank">Get help.</a>
            </p>
        </div>
    )
}

export default Register;
