import { getAuth } from 'firebase/auth';

import firebaseApp from '../firebase';

const authFirebase = getAuth(firebaseApp);
export default authFirebase;
