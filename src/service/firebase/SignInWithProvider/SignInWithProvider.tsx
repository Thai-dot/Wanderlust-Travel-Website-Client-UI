import {
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    inMemoryPersistence,
    setPersistence
} from 'firebase/auth';
import { authAction } from '../../../features/auth/authSlice';
import axios from 'axios';
import Google from '../../../assets/images/Google.svg';
import Facebook from '../../../assets/images/Facebook.svg';
import authFirebase from './getAuth';
import { setCookie } from '../../../utils/cookies';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

const SignInWithProvider = () => {
    const signInWithGoogle = () => {
        signInWithPopup(authFirebase, googleProvider)
            .then(async (res: any) => {
                await axios
                    .post(
                        `${process.env.REACT_APP_BACKEND_HOST}/api/customers/login-by-providers`,
                        {
                            username: res.user.email,
                            idToken: res.user.accessToken
                        }
                    )
                    .then((finalRes) => {
                        setCookie('id', finalRes.data.customer.id, 2);
                        setCookie('accessToken', finalRes.data.token, 2);

                        window.location.href = '/';
                    })
                    .catch((err) => console.log(err));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const signInWithFacebook = () => {
        signInWithPopup(authFirebase, facebookProvider)
            .then(async (res: any) => {
                console.log(res);
                await axios
                    .post(
                        `${process.env.REACT_APP_BACKEND_HOST}/api/customers/login-by-providers`,
                        {
                            username: res.user.email,
                            idToken: res.user.accessToken
                        }
                    )
                    .then((finalRes) => {
                        window.location.href = '/';
                    })
                    .catch((err) => console.log(err));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div
                className="item"
                style={{ cursor: 'pointer' }}
                onClick={() => signInWithFacebook()}
            >
                <img src={Facebook} alt="social" className="social-image" />
                <p>Sign in with facebook</p>
            </div>
            <div
                className="item"
                onClick={() => signInWithGoogle()}
                style={{ cursor: 'pointer' }}
            >
                <img src={Google} alt="social" className="social-image" />
                <p>Sign in with google</p>
            </div>
        </>
    );
};

export default SignInWithProvider;
