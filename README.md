### LinkedIn-Clone with REACT.JS (with Redux & Firebase).

## About the Project

The <b>LinkedIn-clone</b> web application presents a custom LinkedIn-clone.

The APP is created with the latest industry standards using React.js and Redux Toolkit

Firebase is used for the backend.    

## App functionality

-   Login using Google (Firebase Authentication)
-   Create a new post
-   Share photos (from computer) and videos (youtube links)
-   Like/dislike posts
-   Realtime update likes and posts
-   Auto authenticate user on refresh
-   Delete your posts
-   Dark Mode (work in progress)
-   Sign Out (Check header for *Sign Out* option)  

## Built With

This project was built using these technologies.

- React.js
- Redux Toolkit
- Firebase    

## How to build your own..?

1. Clone this repo
1. Install all the dependencies
    ```bash
    npm i
    ```
1. Setup Firebase

    - Create Firebase account
    - Create a new project
    - Create a web app for that
    - Copy your config from there

        - Select config option
        - Paste those config inside firebase/config.js file

    - Setup authentication using Google

1. Tweak code as you like
1. Let's build the optimized version

    ```bash
    npm run build
    ```

1. **Now for hosting on Firebase lets config Firebase locally**

    - Install Firebase CLI
    - Login to Firebase

        ```bash
        firebase login
        ```

    - Initialize Firebase

        ```bash
        firebase init
        ```

    - Select hosting in the menu
    - Select your respective project from the list
    - Select 'build' as your hosting directory and other options as you want
    - Let's deploy our clone and make it live

        ```bash
        firebase deploy
        ```

**That's it our clone is up and running share it now**

## Author

​**Aryan Bindal**

- Github: [Aryaniiit002](https://github.com/aryaniiit002)
- Linkedin: [Aryan Bindal](https://www.linkedin.com/in/aryan-bindal-3077401ab/)
- E-mail: aryanbindal2015@gmail.com    

## Future Plans

-   Might add comment section on posts
-   Mobile responsiveness
-   Might add some new features.

### Show your support

If you've read this far....give us a ⭐️!


<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
-->