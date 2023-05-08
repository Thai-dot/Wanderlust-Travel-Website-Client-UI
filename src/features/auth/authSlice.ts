import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { User } from '../../models';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    email: string;
    fullName: string;
    phoneNumber: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    loading?: boolean;
    id?: any;
    currentUser?: User | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    loading: false,
    id: "no user",
    currentUser: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getUser: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            state.id = action.payload;
        },
        loadUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
        loadUserFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            toast.error(action.payload);
        },
        login(state, action: PayloadAction<LoginPayload>) {
            state.loading = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            toast.error(action.payload);
        },
        register(state, action: PayloadAction<RegisterPayload>) {
            state.loading = true;
        },
        registerSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        registerFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            console.log('Sai tài khoản hoặc mật khẩu');
        },
        update(state, action: PayloadAction<Omit<User, 'role' | 'username'>>) {
            state.loading = true;
        },
        updateSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.currentUser = action.payload;
            toast.success('Successfully updated');
        },
        updateFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            toast.error(action.payload);
        },

        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = null;
        }
    }
});

//export actions
export const authAction = authSlice.actions;
//export selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLoading = (state: any) => state.auth.loading;
//export reducer

const authReducer = authSlice.reducer;
export default authReducer;
