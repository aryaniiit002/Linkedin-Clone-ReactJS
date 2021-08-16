import React, { useState, useEffect, useRef } from 'react';
import './PostalModal.css';
import ReactPlayer from "react-player";
import { db, storage } from '../../../firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';

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

function PostalModal(props) {

    const user = useSelector(selectUser);

    const [editorText, setEditorText] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [videoFile, setVideoFile] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const resetInfo = () => {
        setEditorText("");
        setImageFile("");
        setVideoFile("");
        setAssetArea("");
        props.clickHandler(false);
    };

    let domNode = useClickOutside(() => {
        resetInfo()
    });

    function handleImage(event) {
        let image = event.target.files[0];

        if (image === "" || image === undefined) {
            alert(`Not an image. This file is: ${typeof imageFile}`);
            return;
        }
        setImageFile(image);
    }

    function switchAssetArea(area) {
        setImageFile("");
        setVideoFile("");
        setAssetArea(area);
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
                        message: editorText,
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
                message: editorText,
                imageUrl: "",
                video: videoFile,
                likes: {
                    count: 0,
                    whoLiked: [],
                }
            });
        }

        resetInfo();

    };

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            sendPost(e);
        }
    };

    return (
        <>
            {props.showModal && (
                <div className="PMcontainer">
                    <div className="PMcontent" ref={domNode}>
                        <div className="PMheader">
                            <h2>Create a post</h2>
                            <img onClick={() => resetInfo()} src="/images/close-icon.svg" alt="" />
                        </div>
                        <div className="sharedContent">
                            <div className="userInfo">
                                {props.name ? <img src={props.photoUrl} alt="" /> : <img src="/images/user.svg" alt="" />}
                                <span>{props.name ? props.name : "Name"}</span>
                            </div>
                            <div className="editor">
                                <textarea value={editorText}
                                    onChange={(event) => setEditorText(event.target.value)}
                                    placeholder="What do you want to talk about?" autoFocus={true}
                                    onKeyDown={handleKeypress}
                                />

                                {assetArea === "image" ? (
                                    <div className="uploadImage" style={{ textAlign: "center" }}>
                                        <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="imageFile" onChange={handleImage} style={{ display: "none" }} />
                                        <p>
                                            <label htmlFor="imageFile">Select an image to share</label>
                                        </p>
                                        {imageFile && <img style={{ width: "100%" }} src={URL.createObjectURL(imageFile)} alt="" />}
                                    </div>
                                ) : (
                                    assetArea === "video" && (
                                        <>
                                            <input
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
                        </div>
                        <div className="shareCreation">
                            <div className="attachAsset">
                                <button className="assetButton" onClick={() => switchAssetArea("image")} type="button">
                                    <img src="/images/share-image.svg" alt="" />
                                </button>
                                <button className="assetButton" onClick={() => switchAssetArea("video")} type="button">
                                    <img src="/images/share-video.svg" alt="" />
                                </button>
                            </div>
                            <div className="shareComment">
                                <button className="assetButton" type="button">
                                    <img src="/images/share-comment.svg" alt="" />
                                    <span style={{ paddingLeft: "6px" }}>Anyone</span>
                                </button>
                            </div>
                            <button className={!editorText ? "postButtonT" : "postButtonF"} disabled={!editorText ? true : false} onClick={sendPost} type="submit">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostalModal;
