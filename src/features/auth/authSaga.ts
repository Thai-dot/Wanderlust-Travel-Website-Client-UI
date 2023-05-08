import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import { authAction, LoginPayload, RegisterPayload } from './authSlice';
import userApi from '../../api/userApi';
import { Token, User } from '../../models';
import setToken from '../../utils/setToken';

// function* loadUser() {
//     const accessToken = localStorage.getItem('accessToken');
//     const refreshToken = localStorage.getItem('refreshToken');
//     console.log(accessToken, refreshToken);
//     if (accessToken && refreshToken) {
//         yield put(authAction.getUser());
//         setToken({ accessToken, refreshToken });
//         try {
//             const response: User = yield call(userApi.loadUser);

//             if (typeof response !== 'object') {
//                 yield put(authAction.loadUserFailed('Invalid token'));
//                 return;
//             }

//             yield put(authAction.loadUserSuccess(response));
//         } catch (error: any) {
//             yield put(authAction.loadUserFailed(error.message));
//         }
//     } else {
//         yield put(authAction.loadUserFailed('Bạn cần phải đăng nhập lại'));
//     }
// }

// function* handleLogin({
//     type,
//     payload
// }: {
//     payload: LoginPayload;
//     type: string;
// }) {
//     try {
//         const response: Token = yield call(userApi.login, payload);
//         if (response.accessToken) {
//             localStorage.setItem('accessToken', response.accessToken);
//             localStorage.setItem('refreshToken', response.refreshToken);

//             yield call(loadUser);
//         } else {
//             yield put(
//                 authAction.loginFailed('Username or password is incorrect')
//             );
//         }
//     } catch (error: any) {
//         console.log(error.message);
//         yield put(authAction.loginFailed(error.message));
//     }
//     // redirect to home page
// }

// function* handleUpdateUser({
//     type,
//     payload
// }: {
//     type: string;
//     payload: Omit<User, 'role'>;
// }) {
//     try {
//         const response: User = yield call(userApi.update, payload);
//         if (response._id) {
//             yield put(authAction.updateSuccess(response));
//         }
//     } catch (error: any) {
//         yield put(authAction.updateFailed(error.message));
//     }
// }

// function* handleRegister({
//     type,
//     payload
// }: {
//     type: string;
//     payload: RegisterPayload;
// }) {
//     try {
//         const response: Token = yield call(userApi.register, payload);
//         if (response.accessToken) {
//             localStorage.setItem('accessToken', response.accessToken);
//             localStorage.setItem('refreshToken', response.refreshToken);

//             yield call(loadUser);
//         }
//     } catch (error: any) {
//         console.log(error.message);
//         yield put(authAction.registerFailed(error.message));
//     }
// }

// function* handleLogout() {
//     yield take(authAction.logout.type);

//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     yield put(authAction.logout());
// }

// function* watchRegisterFlow() {
//     yield takeEvery(authAction.register.type, handleRegister);
// }

// function* watchLoginFlow() {
//     // while (true) {
//     //   const isLoggedIn = localStorage.getItem("accessToken");
//     //   if (!isLoggedIn) {
//     //     yield fork(handleLogin);
//     //   } else {
//     //     yield take(authAction.logout.type);
//     //     yield fork(handleLogout);
//     //   }
//     // }
//     yield takeEvery(authAction.login.type, handleLogin);
// }

export default function* authSaga() {
    yield all([
        // loadUser(),
        // watchLoginFlow(),
        // watchRegisterFlow(),
        // handleLogout(),
        // takeEvery(authAction.update.type, handleUpdateUser)
    ]);
}
