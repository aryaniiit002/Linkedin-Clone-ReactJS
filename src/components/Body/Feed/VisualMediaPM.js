import React, { useState, useEffect, useRef } from 'react';
import './VisualMediaPM.css';
import ReactPlayer from "react-player";
import { db, storage } from '../../../firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';

// https://www.youtube.com/watch?v=eWO1b6EoCnQ  
// Closing popup on clicking outside component
let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        let mayHandler = (e) => {
            if (!domNode.current.contains(e.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", mayHandler)
        return () => { document.removeEventListener("mousedown", mayHandler) };

    })
    return domNode;
}

function VisualMediaPM(props) {

    const user = useSelector(selectUser);

    const [imageFile, setImageFile] = useState("");
    const [videoFile, setVideoFile] = useState("");

    let domNode = useClickOutside(() => {
        resetInfo()
    });

    const resetInfo = (event) => {
        setImageFile("");
        setVideoFile("");
        props.isWindow(false);
    };

    function handleImage(event) {
        let image = event.target.files[0];

        if (image === "" || image === undefined) {
            alert(`Not an image. This file is: ${typeof imageFile}`);
            return;
        }
        setImageFile(image);
    }

    const sendPost = e => {
        e.preventDefault();
        if (imageFile) {
            const uploadTask = storage.ref(`/images/${imageFile.name}`).put(imageFile);
            uploadTask.on(
                "state_changed", (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                },

                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    db.collection("posts").add({
                        USER: {
                            name: user.displayName,
                            description: user.email,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            photoUrl: user.photoUrl || '',
                        },
                        message: "",
                        imageUrl: downloadURL,
                        video: videoFile,
                        likes: {
                            count: 0,
                            whoLiked: [],
                        }

                    });
                }
            );
        }
        else {
            db.collection("posts").add({
                USER: {
                    name: user.displayName,
                    description: user.email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    photoUrl: user.photoUrl || '',
                },
                message: "",
                imageUrl: "",
                video: videoFile,
                likes: {
                    count: 0,
                    whoLiked: [],
                }
            });
        }

        resetInfo(e);

    };

    return (
        <>
            {props.isMedia && (
                <div className="PMcontainer">
                    <div className="PMcontent" ref={domNode}>
                        <div className="PMheader">
                            <h2 style={{ letterSpacing: "1px", fontSize: "25px", fontWeight: "400", marginBottom: "10px" }}>
                                {props.media === "photo" ? "Select your image" : "Select your video"}</h2>
                            <img onClick={(event) => resetInfo(event)} src="/images/close-icon.svg" alt="" />
                        </div>
                        <div className="sharedContent editor">
                            {props.media === "photo" ? (
                                <div className="uploadImage" style={{ textAlign: "center" }}>
                                    <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="imageFile" onChange={handleImage} style={{ display: "none" }} />
                                    {!(imageFile) && (
                                        <p class="input-image">
                                            <label style={{ letterSpacing: "1px" }} htmlFor="imageFile">Select image to share</label>
                                        </p>
                                    )}
                                    {imageFile && <img style={{ width: "100%" }} src={URL.createObjectURL(imageFile)} alt="" />}
                                </div>
                            ) : (
                                props.media === "video" && (
                                    <>
                                        <input
                                            className="input-videoLink"
                                            type="text"
                                            name="video"
                                            id="videoFile"
                                            value={videoFile}
                                            placeholder="Enter the video link"
                                            onChange={(event) => setVideoFile(event.target.value)}
                                        />
                                        {videoFile && <ReactPlayer width={"100%"} url={videoFile} />}
                                    </>
                                )
                            )}
                        </div>
                        <div className="send-media" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.15)" }}>
                            <button className="sendButtonF" style={{ marginRight: "25px" }}
                                onClick={(event) => resetInfo(event)} type="button">
                                Cancel
                            </button>
                            <button className={!(videoFile || imageFile) ? "sendButtonT" : "sendMedia"}
                                disabled={!(videoFile || imageFile) ? true : false}
                                onClick={sendPost} type="submit">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default VisualMediaPM;
