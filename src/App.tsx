import NavBar from './components/Common/NavBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import "swiper/css/bundle";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HotelDescription from './pages/HotelDescription';
import RoomDetail from './pages/RoomDetail';
import 'react-day-picker/dist/style.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FilterPage from './pages/FilterPage';
import BecomeExpert from './components/BecomeExpert';
import { Fragment } from 'react';
import PrivateRoute from './components/Common/PrivateRoute';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import UserPage from './pages/UserPage';
import Footer from './components/Footer/Footer';
import WishListPage from './pages/WishListPage';
import LocationPage from './pages/LocationPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/index.scss';

const App = () => {
    return (
        <Fragment>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hotel/:id" element={<HotelDescription />}></Route>
                <Route path="/room/:hotelId/:id" element={<RoomDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/filter" element={<FilterPage />} />
                <Route path="/become-expert" element={<BecomeExpert />} />

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/checkout/:id" element={<CheckoutPage />} />
                    <Route
                        path="/checkout-success"
                        element={<CheckoutSuccessPage />}
                    />
                    <Route path="/user-setting" element={<UserPage />} />
                    <Route path="/wish-list" element={<WishListPage />} />
                </Route>

                <Route path="/location/:id" element={<LocationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <ToastContainer autoClose={1000} />
            <Footer />
        </Fragment>
    );
};

export default App;
