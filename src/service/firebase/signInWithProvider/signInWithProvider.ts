import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

import firebaseApp from '../firebase';

export const authFirebase = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(authFirebase, provider)
        .then(async (res: any) => {
            console.log(res._tokenResponse);
            await axios
                .post('https://localhost:7210/api/customers/loginByGoogle', {
                    userName: res.user.email,
                    idToken: res._tokenResponse.idToken,
                    firebaseToken: res._tokenResponse.oauthAccessToken
                })
                .then((finalRes) => {
                    console.log(finalRes);
                    window.location.href = '/';
                })
                .catch((err) => console.log(err));
        })
        .catch((error) => {
            console.log(error);
        });
};
