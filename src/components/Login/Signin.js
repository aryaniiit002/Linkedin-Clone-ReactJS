import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { auth, googleProvider } from '../../firebase';
import './Signin.css';
import { Link } from 'react-router-dom';

function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    
    const loginToApp = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
          .then(userAuth => {
            dispatch(login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
              profileUrl: userAuth.user.photoURL,
            }))
          })
          .catch(error => alert(error));
      };

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider).then((result) => {
            dispatch(login({
                email: result.user.email,
                uid: result.user.uid,
                displayName: result.user.displayName,
                profileUrl: result.user.photoURL,
                }))
            }).catch(error => alert(error));
    };

    return (
        <div className="login">
            <Link to={{pathname:"/"}} ><img className="login-img" src="../images/login-logo.svg"
            alt="linkedin logo" width="140" height="270"
            /></Link>
            <h1>Welcome Back</h1>
            <h4>Don't miss your next opportunity. Sign in to stay updated on your professional world.</h4>
            <form>
                <label >
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder=""
                />
                <label>
                    Password (6 or more characters)
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder=""
                />
                <Link to={{pathname:"/"}}>
                    <button className="link_button" type="button" onClick={loginToApp}>Sign in</button>
                </Link>
            </form>
            <div className="google_button">
                <span> ────────────  or  ────────────</span>
                <button type="submit" onClick={signInWithGoogle}>
                    <img src="../images/google.svg" width="40px" height="24px" alt="google-logo" />
                    Join with Google
                </button>
            </div>
            <p>Looking to create a page for a business? <a href="https://www.linkedin.com/help/linkedin/answer/122238?trk=registration-frontend_join-form-page-help-link" rel="noreferrer" target="_blank">Get help.</a>
            </p>
        </div>
    )
}

export default Signin
